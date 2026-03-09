# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev                  # Dev server at http://localhost:4321
pnpm build                # Production build
pnpm preview              # Preview production build

pnpm format               # Prettier (write)
pnpm format:check         # Prettier (check only)

pnpm test:e2e             # Playwright E2E (headless)
pnpm test:e2e:ui          # Playwright with UI
pnpm test:e2e:debug       # Playwright debug mode
pnpm test:e2e:install     # Install Chromium for Playwright
```

Run a single Playwright test file:
```bash
pnpm exec playwright test tests/my-test.spec.ts
```

## Architecture

Hybrid Astro + React: Astro handles static generation and routing; React components are used as islands (`client:load`) for anything interactive.

### Key conventions

- **Layouts** — `src/layouts/Layout.astro` is the single base layout. It handles SEO meta tags, JSON-LD structured data, theme flash prevention, and the `<Navbar>` / `<Footer>` wrappers.
- **Site config** — global metadata (site name, URL, description) lives in `src/site.config.ts`. Import from here instead of hardcoding strings.
- **Styling** — Tailwind CSS 4 via `@tailwindcss/vite`. Design tokens are OKLch CSS variables in `src/styles/global.css` (`:root` + `.dark`). All shadcn/ui components consume these variables automatically. Do not add raw hex colors — extend the token system.
- **Components** — `src/components/ui/` contains shadcn/ui primitives (do not edit manually; use the shadcn CLI to add/update). Custom components live directly in `src/components/`.
- **Utilities** — `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge). Always use `cn()` for conditional class merging.
- **Theming** — `src/hooks/useTheme.ts` manages dark/light mode. State is stored in `localStorage` and applied via the `.dark` class on `<html>`.

### i18n

- Translation files: `src/i18n/locales/<lang>.json`
- Helpers (`getLangFromUrl`, `useTranslations`, `getLocalizedPath`, `getAlternateUrl`) are exported from `src/i18n/ui.ts`
- To add a locale: add a JSON file, register it in `src/i18n/ui.ts`, and update `astro.config.mjs`

### Content Collections

Schemas are defined in `src/content/config.ts` using Zod. MDX is supported via `@astrojs/mdx`.

### Testing

Playwright config (`playwright.config.ts`) targets `http://localhost:4321`. Tests run against Desktop Chromium (1280×720) and Mobile iPhone 12 (375×667). The dev server must be running before executing tests locally, or use `webServer` config to auto-start.

## Package manager

Use **pnpm** exclusively. Node 22.x is enforced via `.npmrc` (`engine-strict=true`).

## Local MCP overrides

Copy `.mcp.json.local.example` → `.mcp.json.local` and adjust paths for
machine-specific MCP servers (e.g. `filesystem`). The `.local` file is
gitignored.
