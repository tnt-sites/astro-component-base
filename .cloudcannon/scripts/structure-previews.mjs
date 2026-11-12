// Screenshots every landing header/footer for CloudCannon's header/footer
// picker (the `picker_preview.gallery` thumbnails in each
// src/components/navigation/landing/*/…structure-value.yml).
//
// Usage:
//   1. npm run dev                      (leave it running)
//   2. npm run previews:structures     (optionally: -- --port 4321 --only landing-footer-tmj)
//
// Each component is rendered by the dev-only page src/pages/structure-preview/[component].astro
// using its structure-value defaults. Images go to public/images/structure-previews/<component>.png
// (1440px desktop layout captured at half scale, 720px wide). No npm dependencies: it drives
// Google Chrome over the DevTools protocol with Node's built-in WebSocket (Node 22+).

import { spawn } from "node:child_process";
import { mkdirSync, readdirSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};

const PORT = arg("port", "4321");
const ONLY = arg("only", "");
const CHROME =
  process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const WIDTH = 1440;
const MAX_HEIGHT = 1400;
const OUT_DIR = "public/images/structure-previews";
const COMPONENT_DIR = "src/components/navigation/landing";

const components = readdirSync(COMPONENT_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^landing-(header|footer)/.test(d.name))
  .map((d) => d.name)
  .filter((name) => !ONLY || name === ONLY);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const profile = mkdtempSync(join(tmpdir(), "structure-previews-"));
const chrome = spawn(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--remote-debugging-port=9333",
  `--user-data-dir=${profile}`,
  `--window-size=${WIDTH},1000`,
  "about:blank",
]);

let wsUrl;
for (let i = 0; i < 50 && !wsUrl; i++) {
  await sleep(200);
  try {
    const targets = await (await fetch("http://127.0.0.1:9333/json/list")).json();
    wsUrl = targets.find((t) => t.type === "page")?.webSocketDebuggerUrl;
  } catch {}
}
if (!wsUrl) throw new Error(`Chrome did not start. Is it installed at ${CHROME}? Set CHROME_PATH.`);

const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let nextId = 0;
const pending = new Map();
const listeners = new Set();
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
  } else {
    listeners.forEach((fn) => fn(msg));
  }
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
const waitFor = (method) =>
  new Promise((resolve) => {
    const fn = (msg) => {
      if (msg.method === method) {
        listeners.delete(fn);
        resolve(msg.params);
      }
    };
    listeners.add(fn);
  });

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: WIDTH,
  height: 1000,
  deviceScaleFactor: 1,
  mobile: false,
});

mkdirSync(OUT_DIR, { recursive: true });
let failed = 0;

for (const name of components) {
  const url = `http://localhost:${PORT}/structure-preview/${name}`;
  const loaded = waitFor("Page.loadEventFired");
  const nav = await send("Page.navigate", { url });
  if (nav.errorText) {
    console.error(`✗ ${name}: ${nav.errorText} (is \`npm run dev\` running on port ${PORT}?)`);
    failed++;
    continue;
  }
  await loaded;
  await sleep(1500); // fonts, lazy images, carousels

  const { result } = await send("Runtime.evaluate", {
    // body has min-height: 100vh, so measure the lowest visible element instead.
    expression: `Math.ceil(Math.max(0, ...[...document.body.querySelectorAll("*")]
      .filter((el) => {
        const s = getComputedStyle(el);
        return s.position !== "fixed" && s.visibility !== "hidden" && el.getClientRects().length;
      })
      .map((el) => el.getBoundingClientRect().bottom + window.scrollY)))`,
    returnByValue: true,
  });
  const height = Math.min(result.value || 600, MAX_HEIGHT);

  const shot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: WIDTH, height, scale: 0.5 },
  });
  writeFileSync(join(OUT_DIR, `${name}.png`), Buffer.from(shot.data, "base64"));
  console.log(`✓ ${name} (${WIDTH}×${height})`);
}

ws.close();
chrome.kill();
await sleep(300);
rmSync(profile, { recursive: true, force: true });
process.exit(failed ? 1 : 0);
