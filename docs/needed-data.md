# Missing data checklist

> **Update 3 November 2026:** the committee supplied **"Juknis Fatih festival 3.0.pdf"** (33 pages). Every fact it contains is transcribed in **[`juknis-extracted.md`](./juknis-extracted.md)**, with page references and a list of what is still absent. That file supersedes this one for *what the committee has already published*. This file remains the checklist of what the site is still waiting for.

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

Status after the juknis PDF. ✅ = supplied but not yet wired into `content/`.

| # | Fact | Where | Status |
|---|---|---|---|
| 1 | Festival start date | `festival.startDate` | ✅ 11 November 2026 |
| 2 | Festival end date | `festival.endDate` | ❌ **conflict**: Closing/Awarding is 13 Nov (p.26–28) but SD Olimpiade announces winners 14 Nov (p.7) |
| 3 | Venue | `festival.venue` | ✅ Fatih Bilingual School, Jl. Sultan Malikul Saleh No. 103, Bandaraya, Lamlagang, Banda Raya, Kota Banda Aceh 23122 |
| 4 | Two contact persons (name + WhatsApp) | `festival.contacts[0..1]` | ❌ the PDF gives per-competition PICs only, no festival-level contact |
| 5 | Registration window, per competition | `registrationOpens` / `registrationCloses` | ⚠️ 4 of 16 have dates (SD Olimpiade 15 Okt–6 Nov, Debate 19 Sep–7 Nov, Essay 10 Nov, Cerdas Cermat 10 Nov). 12 still missing |
| 6 | Google Form URL, per competition | `formUrl` | ❌ **zero** form URLs in the PDF. Biggest blocker |
| 7 | Juknis URL, per competition | `juknisUrl`, `juknisLanguage` | ⚠️ one 33-page booklet exists, not 16 files. Bercerita and Tari Kreasi say "juknis belum tersedia". Language is `id` |
| 8 | Competition date, per competition | `competitionDate` | ⚠️ 4 of 16 have dates. 12 still missing |
| 9 | Fee, per competition | `fee` | ✅ all 16 published (see `juknis-extracted.md`) |
| 10 | 3 logo files (SVG preferred) | `festival.logos[i].src` | ❌ still missing. Cambridge also needs written permission |
| 11 | **TK level support in code** | `content/types.ts` `Level`, `FILTERS`, CSS tokens | ❌ the PDF adds Lomba Mewarnai (TK), which the site cannot express yet |
| 12 | Bank account per competition | not modelled | ❌ **conflict**: the PDF uses both BSI `2828-0000-63` and `2828-0000-52`, inconsistently |

## 2. Needed for a complete site

| Field | Applies to | Notes |
|---|---|---|
| `summary` | every competition | 1–2 sentences, `id` + `en`. Still to be written from the juknis. |
| `prizes` | every competition | The juknis says "uang pembinaan, sertifikat, piala/trofi/plakat" but **never a nominal amount**. No invented numbers. |
| `participation` (`individual` / `team`) | every competition | ✅ now derivable from the juknis (perorangan / tim 2 / tim 3 / tim 12 pemain) |
| `teamSize` | team competitions | ✅ Basketball "maksimal 12 pemain + official"; Debate "3 pendebat"; Cerdas Cermat "3 orang"; STEM Expo "2 orang"; Tari Kreasi "group" (size not stated) |
| `eligibility` | every competition | ✅ mostly published: TK, kelas IV–VI, kelas 5–6, kelas VII–IX, kelas 10–12, se-Aceh |
| `format` (`onsite` / `online` / `hybrid`) | every competition | ✅ Debate/Essay/Culture Vlog + STEM Expo paper stage are online or partly online; the rest onsite |
| `venue` | every competition | ⚠️ only rooms D11 (IPA) and D12 (Matematika) are named (p.8). Everything else uses the school address |
| `contact` (name + WhatsApp) | every competition | ⚠️ 11 of 16 have a PIC. Olimpiade SD, Spelling Bee, Cerdas Cermat, STEM Expo return "akan diinformasikan"; Debate lists none |
| `cancelled` | every competition | Set `true` only if the committee cancels an entry. Bercerita/Essay/Cerdas Cermat are cancelled only if under 5 entrants, which is a condition, not a cancellation |


## 3. Decisions the site copy is waiting on

- [ ] Indonesian version of the tagline, or keep "Two Decades of Learning, A Lifetime of Impact" as the official tagline in both languages.
- [x] ✅ "Design Grafis" or "Desain Grafis" → **Desain Grafis** (p.31).
- [x] ✅ Is `Olimpiade Matematika & IPA` one competition or two? → **one** competition, exam rooms D11 (IPA) and D12 (Matematika) (p.8).
- [x] ✅ Debate language → **English** (p.23).
- [x] ✅ `Design Grafis` SMP & SMA → one shared bracket, one competition (p.31).
- [x] ✅ `Cerdas Cermat` subjects → Matematika, Biologi, Fisika, Kimia. The repo name "(Math, Eng, Sains)" is **wrong** (p.27).
- [x] ✅ Step 4 of "Cara Daftar" → Form → transfer to BSI → upload proof → join the WhatsApp group → wait for confirmation (p.4, 7, 9). Still needs one agreed sentence.
- [ ] ❌ "STEAM Project" (poster) or **"STEM Expo"** (juknis p.32)? Pick one before the poster is reprinted.
- [ ] ❌ Futsal: dropped after the poster, or missing from the booklet?
- [ ] ❌ Which BSI account is correct per competition: `2828-0000-63` or `2828-0000-52`?
- [ ] ❌ Closing/Awarding date: 13 or 14 November 2026?
- [ ] ❌ Indonesian version of the tagline, or keep "Two Decades of Learning, A Lifetime of Impact" in both languages.
- [ ] ❌ Consent policy for publishing winners' names and photos (participants are minors).
- [ ] ❌ Cambridge logo usage permission.
- [ ] ❌ Registration status "3 days or fewer = closing soon" threshold: keep or change?
- [ ] ❌ Instagram / official channel links, if they should appear in the footer.

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
