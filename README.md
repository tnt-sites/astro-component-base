# Skele Design System

A modern design system built with Astro, featuring design tokens, components, and comprehensive documentation.

## What is Skele?

Skele is a design system that provides:

- **Design Tokens**: CSS custom properties for consistent spacing, colors, typography, and more
- **Component Library**: Reusable UI components with documentation and examples
- **Utility Classes**: Tailwind-like utility classes for rapid development
- **Documentation Site**: Interactive component documentation with live examples

## Project Structure

```
skele-astro/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── elements/        # Basic elements (Button, Icon, etc.)
│   │   ├── layouts/         # Layout components (Section, etc.)
│   │   └── navigation/      # Navigation components
│   ├── content/skele/       # Component library documentation
│   ├── layouts/             # Page layouts
│   ├── pages/               # Astro pages
│   │   └── skele/           # Component library routes (/skele/*)
│   ├── styles/              # Design system styles
│   │   └── skele/           # Skele framework
│   ├── icons/               # Icon assets
│   └── plugins/             # Build plugins
├── public/                  # Static assets
└── astro.config.mjs         # Astro configuration
```

## Quick Start

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Start development server:**

   ```bash
   pnpm dev
   ```

3. **Open your browser:**
   - Main site: http://localhost:4321/
   - Component library: http://localhost:4321/skele/

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run linting
- `pnpm format` - Format code with Prettier

## Using Skele Components

### Basic Usage

```astro
---
import Button from "@skele/components/elements/Button/index.astro";
---

<Button label="Click me!" type="primary" />
```

### With Icons

```astro
---
import Button from "@skele/components/elements/Button/index.astro";
---

<Button label="Save" type="primary" iconName="hero/check" />
```

### Using Utility Classes

```astro
<div class="max-width-2xl margin-auto padding-md">
  <h1 class="text-size-2xl font-weight-bold">Hello World</h1>
</div>
```

## Design Tokens

Skele uses CSS custom properties for consistent design tokens:

- **Colors**: `--color-primary-500`, `--color-gray-100`, etc.
- **Spacing**: `--spacing-xs`, `--spacing-sm`, `--spacing-md`, etc.
- **Typography**: `--font-size-sm`, `--font-weight-bold`, etc.
- **Content Widths**: `--content-width-sm`, `--content-width-2xl`, etc.

## Component Library

The component library is available at `/skele/` and includes:

- Interactive component examples
- Property documentation
- Code snippets
- Design guidelines

## Customization

### Adding New Components

1. Create your component in `src/components/`
2. Add documentation in `src/content/skele/components/`
3. Include examples in the component's `examples/` folder

### Modifying Design Tokens

Edit the CSS variables in `src/styles/skele/variables/` to customize:

- Colors in `_colors.pcss`
- Spacing in `_spacing.pcss`
- Typography in `_fonts.pcss`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
