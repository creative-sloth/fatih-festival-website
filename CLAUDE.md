# Fatih Festival 3.0 — Website

**Source of truth:** [HANDOFF.md](HANDOFF.md). Read sections 0–4 before any work, 6–9 before design or code. If chat history conflicts with HANDOFF.md, HANDOFF.md wins. Bump its version and changelog when scope or decisions change.

Design direction: [DESIGN.md](DESIGN.md) (dials, palette, type, shape language). Reference poster: `docs/poster-fatih-festival-3.0.jpeg`. Archived v1.0 brief: `docs/archive/` (history only, do not build from it).

## Hard rules
- Never invent event facts. Missing facts are `null` in `content/` and render as `???`.
- Event facts live only in `content/`. UI strings live only in `messages/`.
- No backend, no database. Registration is Google Forms.
- Check the ban list (HANDOFF.md §9.3) before shipping any UI.
- Every animation needs a reduced-motion equivalent; animate transform/opacity/clip-path only.

## Commands
- `npm run dev` — local preview at http://localhost:3000/id/
- `npm run build` — static export to `out/` (deployed to Cloudflare Pages)
