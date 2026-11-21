# How to update the website content

You only edit files in `content/` (event facts) and `messages/` (button and label text). Then rebuild and redeploy.
Never type event facts into components.

## Where each fact lives

| What | File | Field |
|---|---|---|
| Competition days, awarding day, venue, short venue | `content/festival.ts` | `startDate`, `endDate` (dates as `'2026-11-25'`, no time), `awarding` (`{ date, start, end }`), `venue`, `venueShort` |
| Registration deadline (drives the countdown and hides the register buttons) | `content/festival.ts` | `registrationCloses` (ISO with +07:00, e.g. `'2026-11-23T12:00:00+07:00'`) and `registrationClosesText` (the label shown next to the countdown) |
| General Google Form | `content/festival.ts` | `formUrl` |
| Shared juknis folder | `content/festival.ts` | `juknisUrl` |
| Linktree, Instagram, poster file | `content/festival.ts` | `linktreeUrl`, `instagram`, `posterUrl` |
| Contacts per level (footer and fallback) | `content/festival.ts` | `levelContacts` |
| One competition (name, fee, team size, contact, schedule) | `content/competitions.ts` | the entry's fields |

## Common changes

- **A competition's contact person:** in `content/competitions.ts` set `contact: [{ name: 'Ms. Nama', whatsapp: '0812 3456 7890' }]`. Without it the level contact from `festival.levelContacts` is shown.
- **A competition's schedule:** `schedule: [{ date: '2026-11-26', start: '08:00', end: '12:00' }]` (one entry per time slot, WIB; optional `note: { id: 'Final Debate', en: 'Final Debate' }`). Source: the official rundown PDF in the shared Drive folder. Without a schedule the card shows "To Be Announced".
- **A competition's own form:** set `formUrl` on that entry; it overrides the general form for that competition only.
- **A fee:** `fee: 'Rp 50.000 / peserta'` (exact committee wording).
- **Team size and school limit:** `teamSize: '3'` shows as "Tim (3 orang)"; `maxPerSchool: { count: 2, unit: 'tim' }` shows as "maks. 2 tim per sekolah".
- **Unknown fact:** leave it `null`. Never guess.

## Rebuild and deploy

```bash
npm run build
```

This writes the static site to `out/`, which is what Cloudflare Pages / Workers serves. Check locally first with `npm run dev` (http://localhost:3000/id/).

## After the registration deadline

Nothing to do: the countdown switches to "Pendaftaran sudah ditutup" and the register buttons disappear on their own, based on the visitor's clock.
