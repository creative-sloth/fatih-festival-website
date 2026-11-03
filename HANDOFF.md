# PROJECT HANDOFF — FATIH FESTIVAL 3.0 WEBSITE
Version: 1.6.0
Prepared: 3 November 2026
Supersedes: `school_festival_website_handoff_claude_opus.md` (v1.0) and v1.1
Audience: Claude Code (implementer) and any reviewer agent. This file is the single source of truth for scope, design, and rules. If anything here conflicts with chat history, this file wins; if it conflicts with an official committee document, the committee document wins and the conflict must be flagged.

---

## 0. HOW TO USE THIS DOCUMENT

- Read sections 1–4 before any work. Read sections 6–9 before any design or code.
- Never invent event facts. Everything marked **TBA** or **[CONFIRM]** stays a visible placeholder until the user supplies the real value.
- **Placeholder convention (user decision, v1.2):** any missing fact (date, venue, fee, contact, link, etc.) is displayed as `???` on the site. In data files it is stored as `null` and rendered as `???`. Missing logos are rendered as labelled placeholder boxes ("LOGO — Fatih Bilingual School"). Before launch, every remaining `???` must be either filled or deliberately replaced with "Segera diumumkan / To be announced" (Phase 5 check).
- Work in the phase order in section 12. Do not skip the hero prototype gate.
- When you finish a phase, list what changed, what is unverified, and which open questions remain.

---

## 1. PROJECT OVERVIEW

A bilingual (Indonesian / English), mobile-first website for **Fatih Festival 3.0**, a multi-competition festival hosted by Fatih Bilingual School, Banda Aceh. The audience is students from **external schools** (SD, SMP, SMA) and the teachers and parents who help them register.

The site's job, in priority order:
1. Let a visitor find the competitions open to **their school level** in under 10 seconds.
2. Explain each competition's rules, dates, and requirements clearly.
3. Send them to the correct Google Form and the correct juknis.
4. Give them a human contact (WhatsApp) when something is unclear.

It must feel like an art-directed festival experience built from the official poster — energetic for kids and teens, but trustworthy for teachers.

## 2. CONFIRMED FACTS (from the official poster)

| Item | Value | Status |
|---|---|---|
| Festival name | Fatih Festival 3.0 | Confirmed |
| Tagline | "Two Decades of Learning, A Lifetime of Impact" | Confirmed (English only — Indonesian version **[CONFIRM]** or keep English as the official tagline) |
| Host | Fatih Bilingual School, Banda Aceh | Confirmed |
| Other logos on poster | SMA Unggul Garuda Transformasi; Cambridge International Education / Cambridge International School | Role on the website **[CONFIRM]** (co-host? partner?) |
| Edition | 3rd edition ("3.0"); tagline implies the school's 20th anniversary | 20th anniversary framing **[CONFIRM]** before using it in copy |
| Number of competitions | 16 (see section 5) | Confirmed from poster |
| Event dates, venue, fees, prizes | `???` | **TBA** |
| Logos | Placeholder boxes | Official files to be supplied later |
| Post-event winners & photo gallery | Yes | Confirmed by user (v1.2) |
| Registration URL / domain | Poster shows a placeholder (`WWW.SDFSDFDSFDSF.COM`) | **TBA** — domain must be chosen before the poster is reprinted |

## 3. POSTER ISSUES TO RAISE WITH THE COMMITTEE

Do not silently "fix" these in site copy. Use the confirmed wording once supplied.

1. Placeholder registration URL on the poster.
2. ~~"Stean Project"~~ → **"STEAM Project"** (confirmed by user, v1.2). The poster should be corrected before reprint.
3. "Design Grafis" — Indonesian spelling is "Desain Grafis". **[CONFIRM]** preferred official name.
4. No dates, venue, or contact on the poster.
5. Cambridge logo: Cambridge has brand usage rules. Confirm the school is permitted to show it on the web and get the official file.

## 4. AUDIENCE AND LANGUAGE

- Primary visitors: students and teachers from schools in Aceh, mostly on mid-range Android phones over mobile data.
- **Default language: Indonesian.** English is the second language, with equal information.
- Routes: `/id/...` and `/en/...`. The root `/` redirects to `/id/` (via Cloudflare Pages `_redirects`, since static export has no middleware).
- Switching language keeps the visitor on the same page.
- Competition names stay as officially written in both languages unless the committee provides an official English name.
- If a juknis exists only in Indonesian, the English page says so next to the download button.

## 5. COMPETITION LIST (from poster)

The poster groups competitions by school level. The site must too. Where a competition appears at two levels, it is **two separate entries** (own form, juknis, date, contact) unless the committee confirms otherwise.

| # | id (slug) | Name (as on poster) | Level(s) | Category | Notes |
|---|---|---|---|---|---|
| 1 | `sd-bercerita` | Lomba Bercerita | SD | Bahasa / Seni | |
| 2 | `sd-tari-kreasi` | Tari Kreasi Group | SD | Seni | Team |
| 3 | `sd-olimpiade-mipa` | Olimpiade Matematika & IPA | SD | Akademik | One competition or two subjects? **[CONFIRM]** |
| 4 | `sd-vocal-solo` | Vocal Solo | SD | Seni | Individual |
| 5 | `sd-spelling-bee` | Spelling Bee | SD | Bahasa | |
| 6 | `smp-olimpiade-mipa` | Olimpiade Matematika & IPA | SMP | Akademik | Same question as #3 |
| 7 | `smp-vocal-solo` | Vocal Solo | SMP | Seni | Individual |
| 8 | `smp-baca-puisi` | Lomba Baca Puisi | SMP | Bahasa / Seni | |
| 9 | `sma-debate` | Debate | SMA | Bahasa | Language of debate **[CONFIRM]** |
| 10 | `sma-essay` | Essay | SMA | Akademik | |
| 11 | `sma-cerdas-cermat` | Cerdas Cermat (Math, Eng, Sains) | SMA | Akademik | Team |
| 12 | `sma-culture-vlog` | Culture Vlog Competition | SMA | Media | Likely online submission **[CONFIRM]** |
| 13 | `smp-sma-desain-grafis` | Design Grafis | SMP & SMA | Media | One bracket or split by level? **[CONFIRM]** |
| 14 | `smp-sma-steam-project` | STEAM Project (Ide, Karya, Prototype Business) | SMP & SMA | Inovasi | Bracket question as #13 |
| 15 | `smp-basket` | Lomba Basket | SMP | Olahraga | Team |
| 16 | `sd-futsal` | Futsal | SD | Olahraga | Team |

"Category" values are a working proposal for filtering, not committee wording. "Individual/Team" notes are inferred from the competition type and **must be confirmed** before they are displayed.

Sports (#15, #16) appear under their school level in the directory **and** carry an "Olahraga" tag, so both "show me SMP" and "show me sports" work.

## 6. INFORMATION ARCHITECTURE

Navigation: **Beranda · Lomba · Jadwal · Panduan & FAQ · Kontak** + `ID | EN` toggle + primary CTA ("Lihat Lomba" until registration opens, then "Daftar").

1. **Home**
   - Hero (section 9.1).
   - Level picker: SD / SMP / SMA. Picking a level filters the competition list and recolours the page (section 9.2).
   - Competition highlights for the chosen level.
   - "How to register" in 3–4 steps (find competition → read juknis → fill Google Form → join WhatsApp group / wait for confirmation — final steps **[CONFIRM]**).
   - Key dates strip (only confirmed dates).
   - FAQ teaser, contact, footer with school details and social links.
2. **Lomba (Competitions)** — directory grouped by level, filter chips for level and category. With 16 entries, filters are required; search is not.
3. **Competition detail** — one page per entry (`/id/lomba/[slug]`).
4. **Jadwal (Schedule)** — two clearly separate parts: overall festival timeline, and the event-day rundown.
5. **Panduan & FAQ** — general rules, registration steps, juknis downloads, FAQ.
6. **Kontak** — committee contacts and per-competition contacts, primarily WhatsApp.

7. **Pemenang & Galeri (Winners & Gallery)** — confirmed (v1.2). `/id/pemenang` and `/en/winners`.
   - Winners grouped by level, then competition: rank, participant/team name, school.
   - Photo gallery grouped by competition or day, with a lightweight lightbox (keyboard + swipe, closes with Esc/back).
   - The nav item and home section appear **only when results data exists** (data-driven, no "coming soon" page before the event).
   - On competition detail pages, a "Pemenang" block appears once that competition has results.
   - **Consent rule:** participants are minors. Publish names and photos only with the committee's confirmation that school/parent consent covers web publication. Never publish phone numbers, NISN, or class details of winners. **[CONFIRM]** the committee's consent policy before Phase 5.
   - Photos: pre-compressed to WebP (long edge ≤ 1600 px, target ≤ 250 KB each) plus a ≤ 600 px thumbnail; lazy-loaded; every photo has alt text (may be generic, e.g. "Peserta Lomba Vocal Solo SD").

## 7. DATA MODEL

All facts live in `content/` as typed TypeScript files. Components never contain event facts.

```ts
// content/types.ts
export type Level = 'SD' | 'SMP' | 'SMA';
export type Category = 'Akademik' | 'Bahasa' | 'Seni' | 'Media' | 'Inovasi' | 'Olahraga';

export interface Localized { id: string; en: string | null } // en null → show id text + "Indonesian only" note

export interface Competition {
  slug: string;
  name: Localized;
  summary: Localized | null;
  levels: Level[];
  category: Category;
  participation: 'individual' | 'team' | null;   // null = TBA
  teamSize: string | null;                       // e.g. "3 orang"
  eligibility: Localized | null;
  registrationOpens: string | null;              // ISO 8601 with +07:00, e.g. "2026-12-01T00:00:00+07:00"
  registrationCloses: string | null;
  competitionDate: string | null;
  venue: Localized | null;
  format: 'onsite' | 'online' | 'hybrid' | null;
  fee: string | null;                            // exact committee wording
  prizes: Localized | null;
  juknisUrl: string | null;
  juknisLanguage: 'id' | 'en' | 'both' | null;
  formUrl: string | null;
  contact: { name: string; whatsapp: string } | null; // whatsapp in 62… format
  cancelled: boolean;
  results: Winner[] | null;                      // null until the committee publishes results
}

export interface Winner {
  rank: string;            // committee wording, e.g. "Juara 1", "Harapan 1"
  name: string;            // participant or team name, as approved
  school: string;
}

export interface Photo {
  src: string;             // /assets/gallery/<slug>/<file>.webp
  thumb: string;
  alt: Localized;
  competition: string | null; // Competition slug, null = general festival photo
  day: string | null;      // ISO date
}
```

Rules:
- `null` renders as `???` (see section 0). Never fill a `null` with a guess.
- **No `formUrl` → no active register button.** Show "Pendaftaran belum dibuka" instead.
- Every external link (form, juknis, WhatsApp) opens in a new tab and says so.

### Registration status — computed in the browser, not at build time

A static site built on Monday still says "Open" on Saturday. To prevent stale status:
- Status is calculated **client-side** from the dates in the data file and the visitor's clock, using WIB (UTC+7).
- The static HTML always prints the actual dates as text, so the information is correct even if JavaScript fails.
- Status rules: `cancelled` → Dibatalkan; no dates → Segera hadir; before opens → Segera dibuka; open and more than 3 days left → Dibuka; open and 3 days or fewer → Segera ditutup; after closes → Ditutup. (The 3-day threshold is a proposal, **[CONFIRM]**.)
- Hide the register button when status is Ditutup or Dibatalkan.

## 8. PLATFORM

- **Next.js 15, static export (`output: 'export'`), TypeScript**, deployed to **Cloudflare Pages** — the user's standard stack and deploy path.
- **No Supabase, no backend, no database.** Registration is Google Forms.
- Styling: CSS Modules + global design tokens as CSS custom properties. The comic style needs custom shapes and shadows; utility-framework defaults make it look generic.
- Animation: GSAP (core + ScrollTrigger + Flip). Glyph splitting is done in our own markup, so SplitText is not needed. The full GSAP toolset is free for commercial use since the Webflow acquisition — confirm at https://gsap.com/standard-license before launch. Native CSS scroll-driven animations only inside `@supports (animation-timeline: view())`; they became Baseline in October 2026, so older phones will not have them.
- Level switching and card → detail use **GSAP Flip** instead of the View Transitions API (v1.3): it works in every browser the site targets and lets panels enter/leave with comic easing. Reduced motion → instant change.
- One animation library only. Do not add Anime.js, Framer Motion/Motion, or a second engine (see §9.4).
- **Not allowed:** smooth-scroll libraries (Lenis etc.), WebGL/Three.js, video backgrounds, Lottie files for decoration.
- Content updates: the user edits `content/*.ts` and redeploys. A maintenance guide in `docs/` explains this in plain language.

## 9. CREATIVE DIRECTION — "COMIC ISSUE #3"

The festival is presented as issue #3 of a comic. Each school level is a colour-coded chapter. All visual decisions derive from the poster.

### 9.1 Visual system

- **Level colours** (from the poster): SD orange, SMP blue, SMA green, SMP & SMA magenta, Olahraga red. Title gradient yellow → orange → red. Background teal with hexagon pattern. Outlines black.
  Exact hex values: sample from the **original design file** (Canva/Illustrator export), not a compressed JPG. Until then, use clearly named tokens (`--level-sd`, etc.) with approximate values and a `/* APPROXIMATE — replace from source file */` comment.
- Every level colour must meet WCAG AA contrast against the text placed on it. Adjust shade, not hue, if it fails.
- **Shapes:** thick black outlines, solid offset shadows (e.g. `6px 6px 0 #000`), starburst badges, halftone dots, panel frames. No soft blurred shadows. No glass effects.
- **Halftone, starbursts, lightning, stars:** drawn in CSS or inline SVG, not raster images.
- **Typography:** comic display face for headings and numbers only. Ask the poster designer which font was used; confirm its web licence. Body text: a plain, highly readable sans-serif in sentence case. No all-caps paragraphs.
- **Imagery:** do not reuse the poster's stock clip-art (book mascot, astronaut, rocket, lightbulb, microphone). If illustrations are wanted, they must be commissioned or drawn as simple SVG in the same line style.
- Logos: official files only (SVG preferred). Never redraw a logo. Until supplied, use a dashed-outline box with the organisation's name as text (section 0).
- Display font: until the designer names the poster font, use **Bangers** (Google Fonts, OFL) as a stand-in because it is the closest free match to the poster's slanted comic lettering. Body font: **Plus Jakarta Sans** (OFL, by Indonesian foundry Tokotype). Both are swappable via tokens.

### 9.2 Motion spec

**Dials (antislop format):** `ENERGY 3 / RHYTHM 3 / MOTION 3` (user asked for maximum interactivity in v1.3). MOTION 3 is allowed only with the rules in point 5; every effect must either help navigation or belong to the comic world.

1. **Signature moment: "the cover comes alive" (hero)**
   - "FATIH FESTIVAL" letters slam in with a comic overshoot; "3.0" lands with a ~150 ms screen shake and a starburst. Tagline pops in as a speech bubble.
   - Total ≤ 1.2 s, once per session, skippable by any input, and **skipped entirely if scripts are not ready within 1.5 s** (slow phones must never see a hidden title).
2. **Hero play layer**
   - Title letters spring (squash and stretch) when hovered or tapped.
   - Desktop: layered depth parallax (rays, title, bubble, decorations move at different depths) and a halftone lens that follows the pointer. Touch: the lens drifts slowly.
   - Scrolling away tilts and shrinks the cover, like closing the comic's front page.
   - ~~Tap-anywhere sound-effect bursts~~: removed in v1.4 at the user's request (unnecessary). Do not reintroduce.
3. **Functional transitions**
   - **Level select ("Pilih Jenjangmu"):** native radio cards (keyboard arrows work). Choosing one sends a halftone wipe in that level's colour out from the chosen card, retints the section, and re-flows the competition panels with Flip (leaving panels pop out, arriving panels pop in). Choice is stored in `?jenjang=` so it survives refresh and can be shared.
   - ~~**Interest filter ("Minatmu", v1.4)**~~: removed in v1.5 at the user's request (not necessary). Do not reintroduce. Original note: category chips (each with its own icon and live count for the chosen level) combine with the level filter; stored in `?minat=`. Chips with zero matches are disabled. An empty result shows a message and a reset button.
   - **Favourites (v1.4):** a star on every card and in the detail panel saves the competition in this browser only (`localStorage`, never sent anywhere). Saving sprays small stars; a "★ n" badge in the nav jumps to the favourites view; "Favoritku (n)" toggles a favourites-only filter. Purpose: a student can shortlist competitions to show a teacher or parent.
   - **Card → detail:** the panel zooms out of the card it came from into a native `<dialog>` (Esc, backdrop click and close button all work; focus returns to the card). Inside, Previous/Next buttons, ←/→ keys and a horizontal swipe page through the currently filtered competitions ("2 dari 6"). Dedicated detail pages (`/id/lomba/[slug]`) are still required for sharing/SEO in Phase 3.
   - **"Cara Daftar" comic strip (v1.6):** all four panels are always fully on screen; **no sideways scrolling** (the v1.3 sideways strip left panel 4 cut off on some desktops). ≥ 1200 px wide and ≥ 620 px tall: one row of four; the section pins for ~1 screen and scrolling inks the panels in one after another (the first starts before the pin, so it is never blank). 641–1199 px: 2×2 grid, panels ink in on enter. Phones: stacked, ink in on enter.
4. **Micro-interactions**
   - Buttons/cards: solid offset shadow, spring lift on hover (CSS `linear()` spring token `--ease-spring`), squash on press.
   - Each category icon acts out its category on card hover/focus or when its chip is switched on: pencil scribbles, speech bubble talks, note hops, camera snaps, bulb swings, ball bounces.
   - Competition panels ink in (wipe up + settle) the first time they scroll into view. Sticky comic nav springs in after the cover (bottom bar on phones for thumb reach).
5. **Rules**
   - Animate only `transform`, `opacity`, and `clip-path`.
   - All motion lives inside `gsap.matchMedia('(prefers-reduced-motion: no-preference)')` or the CSS reduced-motion override: reduced motion gets a fully static, fully usable page.
   - Everything is interruptible; nothing blocks reading or tapping.
   - Hover is never the only way to reveal information.

### 9.3 Ban list (AI-generated "tells")

Do not ship any of these. If a new generic default appears during the build, add it to this list.

Layout & copy:
- A small label above every heading
- Wide-tracked uppercase labels as decoration
- One coloured word in a headline
- "01 / 02 / 03" section numbering
- Bento-box grids
- A hero taller than the screen it sits on
- An email newsletter signup
- A form or button that shows "thanks" without doing anything
- Fake counts, testimonials, scarcity, or prizes

Visual:
- Purple/blue gradients, cream backgrounds, glassmorphism, soft drop shadows, pill buttons everywhere, generic rounded cards
- Inter / default system font as the brand voice
- Poster clip-art pasted onto the page

Motion:
- Smooth-scroll hijacking
- Custom cursors, magnetic buttons
- Preloaders with percentage counters
- Letter-by-letter reveals on every heading (allowed once, in the hero)
- 3D tilt cards
- Marquee/ticker strips
- Parallax on every section
- WebGL blobs or noise backgrounds

### 9.4 External resources reviewed (v1.3)

Reviewed on 3 Nov 2026 against this direction. "Adopted" means used in this repo; everything else is reference only or rejected.

| Resource | Decision | Reason |
|---|---|---|
| antislop (miqdadbadjuber/anti-slop) | **Adopted as reviewer rules** | 40 rules + ENERGY/RHYTHM/MOTION dials; requires a DESIGN.md (added). Hard-gate rules applied now: no em dashes in copy, honest placeholders, every control does something real, 44 px targets. |
| Superdesign skill (superdesigndev/superdesign-skill) | Not adopted | Needs its CLI plus a superdesign.dev login and works from HTML replicas; adds an account dependency for no defect we have. |
| DESIGN.md format / Refero Styles | **Adopted (format)** | `DESIGN.md` at repo root carries the direction for any agent. Refero's style library itself is reference only; our direction comes from the poster. |
| Kinetics (spring micro-interactions) | Idea adopted, no code copied | Springy hover/press implemented with our own `--ease-spring` token. |
| Component Gallery | Reference | Used for accessible patterns (radio group for level select, dialog). |
| Kage, Jiro Build, Minimal Gallery, Kombai | Reference / not used | Prompt and inspiration libraries built from other products' designs; this site's direction is fixed by the poster. Jiro Build is paid. |
| shadcn/ui, Aceternity UI, Magic UI, Motion Primitives, 21st.dev | Rejected as dependencies | Require Tailwind and/or Framer Motion; their signature effects (spotlights, beams, shimmer, bento, marquee) are the generic "advanced AI" look on our ban list. Two ideas were re-drawn in comic ink instead (pop-burst ≈ confetti, panel zoom ≈ expandable card). |
| Anime.js | Rejected | Second animation engine; GSAP already covers it. |
| UIverse, CSS text effects, gradient buttons, circle loaders | Reference only | Snippet collections; nothing needed (no loaders on a static site, gradient buttons conflict with the flat ink style). |
| 3dicons | Rejected | Glossy 3D renders clash with flat ink comic art; category icons are drawn as inline SVG. |
| Liquid Glass | Rejected | Glassmorphism is on the ban list and contradicts the poster. |
| AppShot, VibePrompt, mapc, MicroKit UI, Kitbitz | Not found | No reliable source found under these names; supply a URL to evaluate. |

## 10. REGISTRATION, DOCUMENTS, AND DATA ACCURACY

- Each competition links to its own verified Google Form. Test every link on a phone and a desktop before launch.
- Label external destinations: "Pendaftaran melalui Google Form (tab baru)".
- Juknis: verify Google Drive sharing is "Anyone with the link"; test while logged out.
- Every competition page shows a WhatsApp contact as the fallback when a form or document fails. Use `https://wa.me/62…?text=` with a pre-filled message naming the competition and level.
- The site collects no personal data. No analytics that require a cookie banner unless the user approves it.
- Dates are shown as "Senin, 1 Desember 2026, 23.59 WIB" / "Monday, 1 December 2026, 11:59 PM WIB".
- Official committee documents are the source of truth. If two sources conflict, flag it; do not pick one.

## 11. ASSETS AND CONTENT STILL NEEDED (ask in this order)

1. **Design sources:** original poster file or exported layers; font names; official logos (Fatih, SMA Unggul Garuda Transformasi, Cambridge) as SVG/PNG; Cambridge usage permission.
2. **Event basics:** dates, venue, onsite/online per competition, domain name, official Instagram/WhatsApp channels.
3. **Per competition:** the fields in section 7.
4. **General:** timeline, event-day rundown, general rules, FAQ answers, contact persons.
5. **Decisions:** Indonesian tagline; consent policy for winners' names and photos; answers to every **[CONFIRM]** above.
6. **After the event:** winners list per competition; photos (originals, any size — they will be compressed).

## 12. WORKFLOW

### Phase 1 — Hero prototype (gate)
1. Build the hero alone (section 9.2 #1) as a single route with real logos (or labelled placeholders), design tokens, and the motion.
2. Screenshot at 1440 px and 390 px. List the three weakest things as an art director would; fix only those. Repeat at least twice.
3. User tests it on a real mid-range Android phone.
4. **Gate:** the user approves the look and feel before any other page is built.

### Phase 2 — Content model and structure
Data files from section 7 with placeholders, routing for `/id` and `/en`, global navigation and footer, language switch.

### Phase 3 — Pages
Competition directory → detail page → schedule → guide/FAQ → contact → home (assembled last, from finished parts).

### Phase 4 — Motion and polish
Functional transitions and micro-interactions (section 9.2 #2–#3), after every page works without them.

### Phase 5 — Review and launch (separate reviewer)
The agent that built a page does not approve it. A reviewer (a fresh-context subagent, running the antislop rules in "after" mode, or Hallmark's `audit` mode if installed) checks:
- Ban list (section 9.3)
- Accessibility: keyboard, focus visible, contrast AA, reduced motion, tap targets ≥ 44 px, semantic headings
- Both languages on every page
- Every form, juknis, and WhatsApp link
- Status logic with dates set before / during / near / after the registration window
- Performance (section 13)
- The committee reviews all factual content.

## 13. ACCEPTANCE CRITERIA

1. A visitor can pick their school level and see their competitions within 10 seconds on a phone.
2. Every published register button opens the correct, verified Google Form; no form → no button.
3. Every juknis link opens for a logged-out visitor.
4. Registration status is correct on the day it is viewed, not the day it was built.
5. All dates, venues, fees, and contacts match committee-approved data. No invented facts.
6. Indonesian and English pages carry equivalent information.
7. Lighthouse mobile (throttled): Performance ≥ 90; LCP < 2.5 s; CLS < 0.1. INP < 200 ms on interactions.
8. Keyboard, touch, and pointer all work; reduced motion is fully honoured.
9. Hero animation never delays access to content.
10. Zero items from the ban list (section 9.3).
11. No console errors; build and Cloudflare Pages deploy succeed.
12. The user can update a competition by editing `content/` and redeploying, following `docs/content-update.md`.

## 14. PROJECT STRUCTURE

```
app/[lang]/...            routes (id, en)
components/               Nav, Footer, LevelPicker, CompetitionCard, StatusChip, Button, Starburst, Halftone
content/                  competitions.ts, schedule.ts, faq.ts, contacts.ts, types.ts
messages/                 id.json, en.json (UI labels)
lib/status.ts             client-side registration status logic (unit-tested)
public/assets/            official logos, optimized images
styles/tokens.css         colours, type, spacing, shadows, motion durations/easings
docs/                     content-update.md, deploy.md
public/_redirects         "/  /id/  302"
```

## 15. KNOWN UNKNOWNS — DO NOT ASSUME

Event dates · venue · fees · prizes · registration windows · form and juknis links · contact persons · domain · display font name and licence · exact brand colours · official logo files · partner logo roles · Cambridge logo permission · "Design Grafis" wording · whether Olimpiade/Desain Grafis/STEAM are split by level · individual vs team for each competition · Indonesian tagline · consent policy for winners and photos.

## 16. NEXT ACTION FOR CLAUDE CODE

1. Confirm you have read this file; summarise the open **[CONFIRM]** items in at most five bullets.
2. Ask the user for the section 11 item 1 assets (design sources and logos) only.
3. Start Phase 1: the hero prototype. Do not build any other page until the Phase 1 gate is passed.

---

## CHANGELOG

**1.6.0 — 3 Nov 2026**
- "Cara Daftar" desktop: replaced the sideways-scrolling strip with a fixed row of four (2×2 on medium screens) and a pinned, scroll-scrubbed ink-in. Verified all panels inside the viewport at 1280×720, 1366×768, 1440×900 and 1920×1080.

**1.5.0 — 3 Nov 2026**
- Removed the "Minatmu" interest filter (user: not necessary).
- Backgrounds: uniform dot patterns replaced (user disliked them). New procedural comic art generated by `scripts/make-comic-backgrounds.py` and `scripts/make-halftones.py`: two-colour tilted panel collage behind "Pilih Jenjangmu" (recolours with the level), manga speed-line burst behind "Cara Daftar", swirl behind the footer, graded (corner-weighted) halftone elsewhere. No stock images.
- Contacts: section renamed "Narahubung" (EN "Contact Person"). WhatsApp only, two contact persons (`festival.contacts`, name + number, `???` until supplied); email and Instagram removed. Links open WhatsApp with a pre-filled greeting.
- Fixed desktop "Cara Daftar" strip: the slide distance is now measured from the last panel, so panel 4 is fully visible; top padding clears the fixed nav.

**1.4.0 — 3 Nov 2026**
- Removed hero tap sound-effect bursts and their hint (user: unnecessary).
- Added interest filter (`?minat=`), local favourites with nav badge and favourites-only view, empty state, per-category icon animations, first-view ink-in for panels, and Previous/Next + arrow keys + swipe in the detail panel.

**1.3.0 — 3 Nov 2026**
- User asked for much more interactivity: motion dial raised to MOTION 3 with explicit rules (§9.2).
- Added hero play layer (tap bursts, springy letters, depth parallax, scroll-out), level select with halftone wipe + Flip filtering + shareable `?jenjang=`, panel-zoom detail dialog, pinned "Cara Daftar" comic strip, sticky comic nav, footer contact block.
- Replaced View Transitions with GSAP Flip (§8). Added §9.4 review of external design resources; adopted antislop rules and the DESIGN.md file.
- Copy rule: no em dashes in visible text.

**1.2.0 — 3 Nov 2026**
- Confirmed "STEAM Project" name.
- Placeholder convention: missing facts render as `???`; missing logos as labelled boxes.
- Confirmed post-event Winners & Gallery page, added `Winner`/`Photo` types, consent rule for minors, photo size budget.
- Named stand-in fonts (Bangers, Plus Jakarta Sans) until the poster font is identified.
- Build continues in this Claude Code session (Phase 1 started).

**1.1.0 — 3 Nov 2026**
- Added confirmed facts from the official poster: name, tagline, host, 16 competitions grouped by school level.
- Listed poster defects to raise with the committee (placeholder URL, "Stean", "Design Grafis", missing dates, Cambridge logo).
- Made school level the primary navigation dimension; split shared competitions into per-level entries.
- Added typed data model and client-side registration status rule (prevents stale status on a static site).
- Changed platform to Next.js 15 static export on Cloudflare Pages, no backend; Indonesian as default language.
- Added creative direction "Comic Issue #3", motion spec (one signature moment, three functional transitions), and the AI-tell ban list.
- Replaced v1.0 reference-site research with the hero-prototype gate and a separate-reviewer QA phase.
- Added measurable performance thresholds.

**1.0.0 — 3 Nov 2026** — Initial handoff from ChatGPT planning (theme not yet supplied).
