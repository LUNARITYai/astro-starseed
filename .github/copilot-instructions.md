# GitHub Copilot Instructions — Astro Starseed

## Project

Astro 5 starter template (hybrid rendering: Astro + React 19 islands).
Package manager: **pnpm only**. Runtime: **Node 22.x**.

## Key paths

| Path                       | Purpose                                         |
| -------------------------- | ----------------------------------------------- |
| `src/layouts/Layout.astro` | Base layout (SEO, JSON-LD, Navbar, Footer)      |
| `src/site.config.ts`       | Global metadata — always import from here       |
| `src/styles/global.css`    | Tailwind + OKLch CSS variable tokens            |
| `src/components/ui/`       | shadcn/ui primitives (CLI-managed, do not edit) |
| `src/components/`          | Custom components                               |
| `src/lib/utils.ts`         | `cn()` — use for all class merging              |
| `src/hooks/useTheme.ts`    | Dark/light mode                                 |
| `src/i18n/ui.ts`           | i18n helpers                                    |
| `src/i18n/locales/`        | Translation JSON files                          |
| `src/content/config.ts`    | Content collection schemas (Zod)                |

## Coding rules

1. **TypeScript strict** — no `any`, all code fully typed.
2. **Styling** — use `cn()` from `src/lib/utils.ts`. No raw hex colors — use OKLch CSS variables from `src/styles/global.css`.
3. **Components** — `.astro` for static, `.tsx` for interactive. React islands need client directives (`client:load`, `client:visible`).
4. **shadcn/ui** — add components via `pnpm dlx shadcn add <name>`. Never edit `src/components/ui/` manually.
5. **i18n** — use `useTranslations()` and `getLangFromUrl()` from `src/i18n/ui.ts`. Never hardcode strings.
6. **Config** — import site metadata from `src/site.config.ts`. Never hardcode site name/URL.
7. **Testing** — Playwright E2E in `tests/`. Run `pnpm test:e2e`. Server must be at `http://localhost:4321`.

## Commands

```bash
pnpm dev            # http://localhost:4321
pnpm build          # production build
pnpm format         # Prettier
pnpm test:e2e       # Playwright headless
```
