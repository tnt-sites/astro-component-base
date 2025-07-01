import bookshop from "@bookshop/astro-bookshop";
import icon from "astro-icon";
import path from "node:path";
import { fileURLToPath } from "node:url";
// @ts-check
import { defineConfig } from "astro/config";

import { cssWatcher } from "../../packages/shared/plugins/css-watcher.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  server: {
    port: 4322,
  },
  integrations: [
    bookshop({
      bookshopConfigPath: path.resolve(__dirname, "../shared/bookshop/bookshop.config.cjs"),
    }),
    icon({
      iconDir: path.resolve(__dirname, "../shared/icons"),
    }),
  ],
  vite: {
    css: {
      devSourcemap: true,
    },
    resolve: {
      alias: {
        "@skele/components": path.resolve(__dirname, "../shared/components"),
        "@skele/styles": path.resolve(__dirname, "../shared/styles"),
        "@skele/plugins": path.resolve(__dirname, "../shared/plugins"),
        "@skele/shared": path.resolve(__dirname, "../shared"),
      },
    },
    plugins: [cssWatcher()],
  },
});
