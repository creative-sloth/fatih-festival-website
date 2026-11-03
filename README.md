# Fatih Festival 3.0 — Website

Bilingual (Indonesian / English) static website for **Fatih Festival 3.0**, hosted by Fatih Bilingual School, Banda Aceh. Comic-book art direction taken from the official poster.

Live: https://fatih-fest.f2005.workers.dev/

## Read first

| File | What it is |
|---|---|
| [HANDOFF.md](HANDOFF.md) | Single source of truth: scope, rules, data model, phases, ban list |
| [DESIGN.md](DESIGN.md) | Art direction: palette, type, shape language, motion dials |
| [CLAUDE.md](CLAUDE.md) | Working rules for an AI agent in this repo |
| [docs/needed-data.md](docs/needed-data.md) | Every fact still missing on the site (`null` fields) |

Read `HANDOFF.md` §0–4 before touching code, §6–9 before design.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript, **static export** (`output: 'export'`) to `out/`
- CSS Modules + CSS custom properties in `app/globals.css` (no Tailwind)
- GSAP (core + ScrollTrigger + Flip) for motion, with a full reduced-motion fallback
- No backend, no database, no analytics. Registration happens in Google Forms.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000/id/
npm run typecheck  # tsc --noEmit
npm run build      # static export to out/
```

Deploy the `out/` folder to Cloudflare Pages (or `wrangler deploy` when the project is configured as a Worker with static assets). `public/_redirects` sends `/` to `/id/`.

## Structure

```
app/(root)/            /  → meta-refresh redirect to /id/
app/(site)/[lang]/     routes for id and en
components/            Nav, Hero, LevelExplorer, HowTo, Footer, shapes, icons
content/               every event fact (competitions.ts, festival.ts, types.ts)
messages/              every UI string (id, en)
lib/                   whatsapp links, favourites (localStorage)
public/assets/         generated comic backgrounds (SVG)
docs/                  poster reference, archive, missing-data checklist
scripts/               Python generators for the background SVGs
```

## Hard rules (short version)

1. **Never invent event facts.** A missing value is `null` in `content/` and renders as `???`. See [docs/needed-data.md](docs/needed-data.md).
2. Event facts live only in `content/`. UI strings live only in `messages/`. Components hold neither.
3. No `formUrl` → no active register button.
4. Every animation needs a reduced-motion equivalent; animate only `transform`, `opacity`, `clip-path`.
5. Check the ban list in `HANDOFF.md` §9.3 before shipping UI. No em dashes in visible copy.

## Status

Phase 1–4 done on the home route: cover/hero, level picker with `?jenjang=` deep links, favourites, detail dialog, "Cara Daftar" strip, contact footer, both languages. Not built yet: `/lomba`, `/lomba/[slug]`, `/jadwal`, `/panduan`, `/pemenang`. See `HANDOFF.md` §12 (Phase 3) and §16.
