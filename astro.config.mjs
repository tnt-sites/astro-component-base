import bookshop from "@bookshop/astro-bookshop";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  server: {
    port: 4321,
  },
  integrations: [
    bookshop({
      bookshopConfigPath: path.resolve(__dirname, "src/bookshop/bookshop.config.cjs"),
      components: {
        source: path.resolve(__dirname, "src/components"),
      },
    }),
    icon({
      iconDir: path.resolve(__dirname, "src/icons"),
    }),
  ],
  vite: {
    css: {
      devSourcemap: true,
    },
    resolve: {
      alias: {
        "@skele/components": path.resolve(__dirname, "src/components"),
        "@skele/styles": path.resolve(__dirname, "src/styles"),
        "@skele/plugins": path.resolve(__dirname, "src/plugins"),
      },
    },
  },
});
