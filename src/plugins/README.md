# Skele Shared Plugins

This directory contains shared plugins that are used across different workspaces in the Skele project.

## Available Plugins

### CSS Watcher (`css-watcher.js`)

A Vite plugin that solves the hot reloading issue with CSS files imported in Astro components. 

#### Problem

When using separate CSS files with Astro components (especially with `@import` statements), changes to the CSS files don't automatically trigger hot reloading of the components that use them.

#### Solution

This plugin:
- Scans all top-level folders in the components directory (like `elements`, `layouts`, etc.)
- For each top-level folder, scans all component subdirectories to find CSS files
- Watches for changes to CSS files
- When a CSS file changes, it updates the timestamp of the related component file
- Forces Vite to reload the component with the updated styles

#### Usage

In your `astro.config.mjs` file:

```js
import { defineConfig } from 'astro/config';
import { cssWatcher } from '../../packages/shared/plugins/css-watcher.js';

export default defineConfig({
  vite: {
    plugins: [
      cssWatcher()
    ],
  },
});
```

You can also enable verbose logging for debugging:

```js
cssWatcher({ verbose: true })
```

This allows you to maintain a clean separation of concerns with CSS in separate files while still getting the benefits of hot reloading during development.