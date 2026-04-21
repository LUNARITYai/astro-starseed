# GEMINI.md - Project Context

## Project Overview

**Astro Starseed** is a high-performance, opinionated Astro 6 starter template developed by [LUNARITY](https://lunarity.ai). It leverages a hybrid rendering architecture (Astro + React 19) to combine static speed with rich interactivity.

- **Framework:** Astro 6 (Hybrid mode)
- **UI Library:** React 19 + shadcn/ui (Radix Primitives)
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/vite`) with OKLch color tokens
- **Animations:** Framer Motion 12
- **i18n:** Custom type-safe translation system with URL-based routing
- **Testing:** Playwright E2E testing
- **Runtime:** Node 22.x (Strictly enforced via `.npmrc`)
- **Package Manager:** `pnpm`

## Building and Running

| Command                 | Description                                         |
| ----------------------- | --------------------------------------------------- |
| `pnpm install`          | Install all dependencies                            |
| `pnpm dev`              | Start development server at `http://localhost:4321` |
| `pnpm build`            | Generate production build in `dist/`                |
| `pnpm preview`          | Preview the production build locally                |
| `pnpm format`           | Format the entire codebase using Prettier           |
| `pnpm format:check`     | Check formatting without modifying files            |
| `pnpm test:e2e`         | Run Playwright E2E tests (headless)                 |
| `pnpm test:e2e:ui`      | Run Playwright tests with the UI runner             |
| `pnpm test:e2e:install` | Install required browser binaries for Playwright    |

## Development Conventions

### 1. Hybrid Architecture

- Use **Astro components** (`.astro`) for static content, layouts, and top-level pages.
- Use **React components** (`.tsx`) for interactive elements. These must be hydrated using Astro's client directives (e.g., `client:load`, `client:visible`).

### 2. Styling & Theming

- **Tailwind 4:** Configured via Vite plugin.
- **Design Tokens:** Defined as CSS variables in `src/styles/global.css` using the `oklch()` color space.
- **Dark Mode:** Managed via `src/hooks/useTheme.ts`. The `.dark` class is applied to the `<html>` element.
- **shadcn/ui:** Located in `src/components/ui/`. Use `pnpm dlx shadcn add <component>` to add new ones.
- **Utility:** Use the `cn()` helper from `src/lib/utils.ts` for all conditional class merging.

### 3. AI Setup & Workflow

- **Gemini CLI:** Add the shadcn MCP server to `.gemini/settings.json` with `command: "npx"` and `args: ["shadcn@latest", "mcp"]`, or run `gemini mcp add shadcn npx shadcn@latest mcp`.
- **Claude Code:** Uses the project's `.mcp.json`.
- **Skills:** For agents supporting skills, use `pnpm dlx skills add shadcn/ui` to enable specialized UI component management.

### 4. Internationalization (i18n)

- **Locale Data:** JSON files in `src/i18n/locales/`.
- **Helpers:** Use `useTranslations(lang)` and `getLocalizedPath(path, locale)` from `src/i18n/ui.ts`.
- **Routing:** Default locale (`en`) has no prefix; other locales are prefixed (e.g., `/pl/`).

### 5. Configuration

- **Site Metadata:** Always import from `src/site.config.ts` (e.g., `SITE_NAME`, `SITE_TAGLINE`) instead of hardcoding strings in templates.
- **Astro Config:** Managed in `astro.config.mjs`, including i18n routing and integrations.
- **Content Collections:** Defined in `src/content.config.ts` using the Astro 6 Loader API.

### 6. Code Quality

- **TypeScript:** Strict mode is enabled. Ensure all components and utilities are properly typed.
- **Prettier:** Run `pnpm format` before committing. Prettier handles Astro, CSS, and TS/TSX files.
- **Testing:** New features should include E2E tests in the `e2e/tests/` directory.

## Key File Map

- `src/layouts/Layout.astro`: The primary base layout wrapper.
- `src/components/ui/`: shadcn/ui base components.
- `src/lib/utils.ts`: Core utility functions, including `cn()`.
- `src/i18n/ui.ts`: Core translation and routing logic.
- `src/content.config.ts`: Content collection schemas and loaders.
- `src/styles/global.css`: Tailwind imports and CSS variable design tokens.
- `src/site.config.ts`: Global site configuration.
- `astro.config.mjs`: Astro framework and integration settings.
- `e2e/tests/`: Playwright E2E test files.
