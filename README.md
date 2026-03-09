# astro-starseed

<p align="center">
  <img src="docs/images/banner.png" alt="astro-starseed banner" width="100%" />
</p>

A modern Astro starter template by [LUNARITY](https://lunarity.ai) — production-ready, opinionated, and built for speed.

<p align="center">
  <img src="docs/images/preview.png" alt="astro-starseed preview" width="100%" />
</p>

## Stack

| Layer | Technology |
|---|---|
| Framework | [Astro 5](https://astro.build) |
| UI | [React 19](https://react.dev) + [shadcn/ui](https://ui.shadcn.com) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) · OKLch design tokens |
| Animations | [Framer Motion 12](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev) |
| Forms | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| Content | [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) + MDX |
| Testing | [Playwright](https://playwright.dev) (E2E) |
| Language | TypeScript (strict) |
| Package manager | pnpm |
| Node | 22.x |

## Features

- **Hybrid rendering** — Astro static generation + React islands for interactive components
- **Dark / light mode** — system preference detection, localStorage persistence, flash prevention
- **i18n ready** — type-safe translation system with URL-based locale routing and hreflang support
- **SEO optimised** — Open Graph, Twitter Card, JSON-LD structured data, canonical URLs, sitemap
- **16 shadcn/ui components** pre-installed and theme-aware
- **Responsive layout** — mobile-first, safe-area aware, accessible touch targets
- **E2E tests** — Playwright with Desktop + Mobile Chromium, screenshots/videos on failure
- **Strict code quality** — TypeScript strict mode, Prettier, engine-strict Node version

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server (http://localhost:4321)
pnpm dev
```

## Scripts

```bash
pnpm dev               # Development server
pnpm build             # Production build
pnpm preview           # Preview production build

pnpm format            # Format all files with Prettier
pnpm format:check      # Check formatting without writing

pnpm optimize-svgs     # Optimise SVGs in public/icons/

pnpm test:e2e          # Run Playwright E2E tests (headless)
pnpm test:e2e:ui       # Run with Playwright UI
pnpm test:e2e:headed   # Run with visible browser
pnpm test:e2e:debug    # Debug mode
pnpm test:e2e:report   # Open last HTML report
pnpm test:e2e:install  # Install Chromium for Playwright
```

## Project Structure

```
src/
├── components/
│   ├── ui/            # shadcn/ui components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Logo.tsx
│   └── Footer.astro
├── layouts/
│   └── Layout.astro   # Base layout (SEO, theme, scripts)
├── pages/
│   └── index.astro
├── i18n/
│   ├── ui.ts          # getLangFromUrl, useTranslations, getLocalizedPath…
│   └── locales/
│       └── en.json
├── hooks/
│   └── useTheme.ts
├── lib/
│   └── utils.ts       # cn() helper
├── content/
│   └── config.ts      # Content collection schemas
├── styles/
│   └── global.css     # Tailwind + CSS design tokens
└── site.config.ts     # Site-wide metadata
```

## Adding a New Language

1. Create `src/i18n/locales/<lang>.json` (copy `en.json` as a base)
2. Add the locale to `src/i18n/ui.ts`
3. Update `astro.config.mjs` i18n settings

## Theming

Design tokens are defined as CSS variables in `src/styles/global.css` using the OKLch color space. Both `:root` (light) and `.dark` variants are provided. All shadcn/ui components consume these variables automatically.

To customise, edit the `--background`, `--primary`, `--accent` (etc.) values in `global.css`.

## Local MCP overrides

Copy `.mcp.json.local.example` → `.mcp.json.local` and adjust paths for
machine-specific MCP servers (e.g. `filesystem`). The `.local` file is
gitignored.

## License

MIT
