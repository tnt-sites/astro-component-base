import fs from "node:fs";
import path from "node:path";

/**
 * A Vite plugin that watches CSS files for components and triggers
 * a reload of the associated Astro component when they change.
 * This ensures that CSS imports in Astro components are properly reloaded.
 */
export function cssWatcher(options = {}) {
  // Plugin options with defaults
  const config = {
    verbose: false,
    ...options,
  };

  return {
    name: "astro-css-watcher",

    configureServer(server) {
      const rootDir = server.config.root;
      const componentsDir = path.resolve(rootDir, "../shared/components");

      console.log("[CSS Watcher] Starting to watch components directory...");

      // Watch the components directory for changes
      server.watcher.add(componentsDir);

      // Register CSS files as modules
      server.middlewares.use((req, res, next) => {
        if (req.url?.endsWith(".pcss") || req.url?.endsWith(".css")) {
          const filePath = path.resolve(rootDir, req.url.slice(1));

          if (fs.existsSync(filePath)) {
            const cssModule = server.moduleGraph.getModuleById(filePath);

            if (!cssModule) {
              server.moduleGraph.ensureEntryFromUrl(req.url);
            }
          }
        }
        next();
      });

      server.watcher.on("change", async (file) => {
        if (file.endsWith(".pcss") || file.endsWith(".css")) {
          console.log(`[CSS Watcher] CSS file changed: ${file}`);

          // Get the CSS module
          const cssModule = server.moduleGraph.getModuleById(file);

          if (cssModule) {
            // Invalidate the CSS module
            server.moduleGraph.invalidateModule(cssModule);

            // Send HMR update for the CSS file
            server.ws.send({
              type: "update",
              updates: [
                {
                  type: "css-update",
                  path: file,
                  acceptedPath: file,
                  timestamp: Date.now(),
                },
              ],
            });
          } else {
            console.log(`[CSS Watcher] No CSS module found for: ${file}`);

            // Force a full page reload as fallback
            server.ws.send({
              type: "full-reload",
              path: "*",
            });
          }
        }
      });
    },
  };
}
