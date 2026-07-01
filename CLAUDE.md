# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing/brochure site (no e-commerce) for ООО «МД Сапплай» (MD Supply), a Minsk-based wholesale/distribution company. It presents the company, its assortment and cooperation terms, and collects leads via forms. Content is bilingual (RU default, EN).

## Commands

```bash
pnpm install
pnpm dev      # http://localhost:3000 (Turbopack)
pnpm build    # production build (output: standalone)
pnpm start    # run the built app
pnpm lint     # eslint (eslint-config-next, flat config)
```

No test suite exists. `pnpm build` is the primary correctness gate — run it before considering a change done.

## Stack

Next.js 16 (App Router, React 19.2) · TypeScript · Tailwind CSS v4 (CSS-token theme, no config file) · next-intl (i18n) · next-themes (dark/light) · react-hook-form + zod (forms) · framer-motion (animation) · lucide-react (icons). Package manager is **pnpm** (see `packageManager` field) — do not use npm/yarn.

## Architecture

### i18n is the backbone — everything routes through `[locale]`
- Locales live in `src/i18n/routing.ts` (`ru` default, `en`; `localePrefix: "always"`, so every URL is `/{locale}/...`). Adding a language = add it here, add `messages/{locale}.json`, and add its OG mapping in `src/i18n/metadata.ts`.
- `src/middleware.ts` handles locale routing; its matcher skips `/api`, `_next`, and any file with an extension.
- **All user-facing copy is in `messages/ru.json` and `messages/en.json`** (namespaced: `Meta`, `Common`, `Home`, `About`, …). Never hardcode display strings in components — add a key to both message files and read it with `getTranslations` (server) / `useTranslations` (client).
- Use the wrapped navigation from `src/i18n/navigation.ts` (`Link`, `useRouter`, `usePathname`, `redirect`) — **not** `next/link` / `next/navigation` — so locale prefixes are handled automatically.
- Pages are async server components that `await params` for `{ locale }`, call `setRequestLocale(locale)`, and export `generateMetadata`. Canonical + hreflang come from `localizedAlternates()` in `src/i18n/metadata.ts` (derived from `routing.locales` — no per-page edits when adding a language).

### Content vs. copy — two distinct sources
- **`src/lib/site.ts`** — single source of truth for company facts: contacts, phone, address, legal requisites (УНП, bank, account), socials, geo. Change contacts/requisites here only.
- **`src/lib/content.ts`** — structural/enumerable content bound to translations: service slugs (`serviceSlugs`), and icon arrays (`advantageIcons`, `trustFactIcons`, etc.). **Icon arrays are positional** — their order must match the order of items in the corresponding `messages/*.json` arrays.
- **`src/lib/nav.ts`** — nav structure (`mainNav`, footer columns, service links) as `NavKey`s; labels resolved via translations.

Dynamic service pages live at `src/app/[locale]/services/[slug]/page.tsx`, driven by `serviceSlugs`.

### Lead intake
All forms (`callback` / `quote` / `contact` / `vacancy`) POST to `src/app/api/lead/route.ts`. It validates with zod, requires `consent: true`, and uses a `website` honeypot field (silently accepts if filled). **The route currently only `console.info`s the lead** — real delivery (SMTP / Telegram Bot API) is an unimplemented integration point marked in that file.

### Theming
Tailwind v4 with the theme defined as CSS tokens in `src/app/globals.css` (no `tailwind.config`). Brand colors: black `#1A1A1A` + red accent `#DE1720`. Dark/light via `next-themes` in `src/components/providers.tsx`. Reusable primitives live in `src/components/ui/` (`Container`, `Section`, `Button`, `Reveal`); use `cn()` from `src/lib/utils.ts` for class merging.

## Deploy

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) builds a Docker image (Next.js standalone), ships it as a tarball over SSH to a VPS, and runs `docker compose up` behind Caddy (auto-SSL). No image registry, no Node on the server. Full details in `DEPLOY.md`. Because `next.config.ts` sets `output: "standalone"`, keep the build self-contained.

## Conventions

- `@/*` path alias maps to `src/*`.
- When adding a page: create `src/app/[locale]/<route>/page.tsx` as an async server component, add its nav entry in `src/lib/nav.ts`, add translation keys to both message files, and wire metadata via `localizedAlternates`.
- Strings the user sees are always translation keys; company data is always from `site`. If you're about to type a Russian phrase or a phone number into a component, it belongs in `messages/*` or `site.ts` instead.
