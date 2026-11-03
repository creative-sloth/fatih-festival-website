# Missing data checklist

Everything below is `null` in `content/` right now, so the site prints `???` (or a dashed LOGO box) in its place. Nothing here is guessed. Fill a value and the placeholder disappears on the next build.

Two files only:

- `content/festival.ts` — festival-wide facts, logos, contact persons
- `content/competitions.ts` — one entry per competition

Rules (HANDOFF.md §0, §7):

- A missing value stays `null`. Never type a guess or a "likely" date.
- If a fact is deliberately not published, say so with committee wording ("Segera diumumkan") rather than inventing it.
- Dates are ISO 8601 with the WIB offset: `"2026-12-01T23:59:00+07:00"`.
- WhatsApp numbers are stored as the committee writes them; `lib/whatsapp.ts` converts `08…` to `628…`.
- `en` text `null` → the Indonesian text is shown with an "Indonesian only" note.

---

## 1. Blocks the launch (nothing else matters until these exist)

| # | Fact | Where | Notes |
|---|---|---|---|
| 1 | Festival start date | `festival.startDate` | Hero prints `???` today |
| 2 | Festival end date | `festival.endDate` | |
| 3 | Venue | `festival.venue` (`id`, `en`) | e.g. campus name + city |
| 4 | Two contact persons (name + WhatsApp) | `festival.contacts[0..1]` | Footer "Narahubung" is empty |
| 5 | Registration window, per competition | `registrationOpens` / `registrationCloses` | Drives the status chip and the register button |
| 6 | Google Form URL, per competition | `formUrl` | No URL → no register button (by design) |
| 7 | Juknis (guidelines) URL, per competition | `juknisUrl`, `juknisLanguage` | Drive link must be "Anyone with the link" |
| 8 | Competition date, per competition | `competitionDate` | |
| 9 | Fee, per competition | `fee` | Exact committee wording, e.g. `"Rp 75.000 per tim"` |
| 10 | 3 logo files (SVG preferred) | `festival.logos[i].src` | Fatih, SMA Unggul Garuda Transformasi, Cambridge. Cambridge also needs written permission to show the mark (HANDOFF.md §3.5) |

## 2. Needed for a complete site

| Field | Applies to | Notes |
|---|---|---|
| `summary` | every competition | 1–2 sentences, `id` + `en` |
| `prizes` | every competition | Committee wording; no invented prize amounts |
| `participation` (`individual` / `team`) | every competition | Inferred from the format today, so it must be confirmed before it is displayed |
| `teamSize` | team competitions | e.g. `"3 orang + 1 cadangan"` |
| `eligibility` | every competition | Who may enter (grade range, school type) |
| `format` (`onsite` / `online` / `hybrid`) | every competition | Culture Vlog is likely online submission |
| `venue` | every competition | Only if it differs from the festival venue |
| `contact` (name + WhatsApp) | every competition | Per-competition narahubung |
| `cancelled` | every competition | Set `true` only if the committee cancels an entry |

## 3. Decisions the site copy is waiting on

- [ ] Indonesian version of the tagline, or keep "Two Decades of Learning, A Lifetime of Impact" as the official tagline in both languages.
- [ ] "Design Grafis" or "Desain Grafis" on the site (poster says the former).
- [ ] Is `Olimpiade Matematika & IPA` one competition or two separate subjects, per level?
- [ ] `Design Grafis` and `STEAM Project`: one shared SMP & SMA bracket, or split per level (separate forms)?
- [ ] Debate: language of the debate (Indonesian, English, or both).
- [ ] Final wording of step 4 in "Cara Daftar" (currently `???`): join a WhatsApp group, wait for confirmation, or something else.
- [ ] Consent policy for publishing winners' names and photos (participants are minors).
- [ ] Cambridge logo usage permission.
- [ ] Registration status "3 days or fewer = closing soon" threshold: keep or change?
- [ ] Official invitation domain (the poster still shows a placeholder URL).
- [ ] Instagram / official channel links, if they should appear in the footer.

## 4. After the event

- Winners per competition (`results`: `rank`, `name`, `school`) — the nav item and home section only appear once at least one entry has results.
- Photos: originals in any size (they get compressed to WebP, long edge ≤ 1600 px, ≤ 250 KB each, plus a ≤ 600 px thumbnail) with alt text per photo.

## 5. How to fill a competition entry

`content/competitions.ts` builds every entry from the `tba()` helper. To fill one in, replace its `tba(...)` line with an explicit object:

```ts
{
  slug: 'sd-bercerita',
  name: { id: 'Lomba Bercerita', en: null },
  summary: { id: 'Lomba bercerita untuk siswa SD.', en: 'A storytelling competition for primary students.' },
  levels: ['SD'],
  category: 'Bahasa',
  participation: 'individual',
  teamSize: null,
  eligibility: null,
  registrationOpens: '2026-12-01T00:00:00+07:00',
  registrationCloses: '2026-12-10T23:59:00+07:00',
  competitionDate: '2026-12-15T08:00:00+07:00',
  venue: null,
  format: 'onsite',
  fee: 'Rp 50.000',
  prizes: null,
  juknisUrl: 'https://drive.google.com/...',
  juknisLanguage: 'id',
  formUrl: 'https://forms.gle/...',
  contact: { name: 'Nama Narahubung', whatsapp: '081234567890' },
  cancelled: false,
  results: null,
},
```

Then: `npm run typecheck && npm run build`, and the placeholder for that field is gone.
