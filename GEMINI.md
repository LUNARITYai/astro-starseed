# GEMINI.md - Project Context

## Project Overview
**Astro Starseed** is a high-performance, opinionated Astro 5 starter template developed by [LUNARITY](https://lunarity.ai). It leverages a hybrid rendering architecture (Astro + React 19) to combine static speed with rich interactivity.

- **Framework:** Astro 5 (Hybrid mode)
- **UI Library:** React 19 + shadcn/ui (Radix Primitives)
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/vite`) with OKLch color tokens
- **Animations:** Framer Motion 12
- **i18n:** Custom type-safe translation system with URL-based routing
- **Testing:** Playwright E2E testing
- **Runtime:** Node 22.x (Strictly enforced via `.npmrc`)
- **Package Manager:** `pnpm`

## Building and Running
| Command | Description |
|---|---|
| `pnpm install` | Install all dependencies |
| `pnpm dev` | Start development server at `http://localhost:4321` |
| `pnpm build` | Generate production build in `dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm format` | Format the entire codebase using Prettier |
| `pnpm test:e2e` | Run Playwright E2E tests (headless) |
| `pnpm test:e2e:ui` | Run Playwright tests with the UI runner |

## Development Conventions

### 1. Hybrid Architecture
- Use **Astro components** (`.astro`) for static content, layouts, and top-level pages.
- Use **React components** (`.tsx`) for interactive elements. These must be hydrated using Astro's client directives (e.g., `client:load`, `client:visible`).

### 2. Styling & Theming
- **Tailwind 4:** Configured via Vite plugin.
- **Design Tokens:** Defined as CSS variables in `src/styles/global.css` using the `oklch()` color space.
- **Dark Mode:** Managed via `src/hooks/useTheme.ts`. The `.dark` class is applied to the `<html>` element.
- **shadcn/ui:** Located in `src/components/ui/`. These are primitives; do not modify unless necessary.

### 3. Internationalization (i18n)
- **Locale Data:** JSON files in `src/i18n/locales/`.
- **Helpers:** Use `useTranslations(lang)` and `getLocalizedPath(path, locale)` from `src/i18n/ui.ts`.
- **Routing:** Default locale (`en`) has no prefix; other locales are prefixed (e.g., `/fr/`).

### 4. Configuration
- **Site Metadata:** Always import from `src/site.config.ts` (e.g., `SITE_NAME`, `SITE_TAGLINE`) instead of hardcoding strings in templates.
- **Astro Config:** Managed in `astro.config.mjs`, including i18n routing and integrations.

### 5. Code Quality
- **TypeScript:** Strict mode is enabled. Ensure all components and utilities are properly typed.
- **Prettier:** Run `pnpm format` before committing. Prettier handles Astro, CSS, and TS/TSX files.
- **Testing:** New features should include E2E tests in the `tests/` directory (if applicable).

## Key File Map
- `src/layouts/Layout.astro`: The primary base layout wrapper.
- `src/components/ui/`: shadcn/ui base components.
- `src/i18n/ui.ts`: Core translation and routing logic.
- `src/styles/global.css`: Tailwind imports and CSS variable design tokens.
- `src/site.config.ts`: Global site configuration.
- `astro.config.mjs`: Astro framework and integration settings.
