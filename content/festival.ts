import type { Festival } from './types';

const ADDRESS =
  'Fatih Bilingual School, Jl. Sultan Malikul Saleh No. 103, Bandaraya, Lamlagang, Banda Raya, Kota Banda Aceh 23122';

// Source: Juknis Fatih Festival 3.0 (docs/juknis-extracted.md). The poster lists no dates and
// disagrees with the juknis on competition names (it has Futsal and no TK), so the juknis wins.
// Festival window 11–14 Nov 2026 comes from: SD Olimpiade pelaksanaan 11–14 Nov, Debate
// perlombaan 11–13 Nov, Essay/Cerdas Cermat awarding 13 Nov, hadiah 14 Nov.
// null = not supplied yet.
export const festival: Festival = {
  name: 'Fatih Festival',
  edition: '3.0',
  tagline: {
    id: 'Two Decades of Learning, A Lifetime of Impact', // Indonesian version not supplied; official tagline is English
    en: 'Two Decades of Learning, A Lifetime of Impact',
  },
  host: 'Fatih Bilingual School',
  startDate: '2026-11-11T08:00:00+07:00',
  endDate: '2026-11-14T22:00:00+07:00',
  venue: { id: ADDRESS, en: ADDRESS },
  // src: null → labelled placeholder box until official files arrive
  logos: [
    { name: 'Fatih Bilingual School', short: 'Fatih', src: null },
    { name: 'SMA Unggul Garuda Transformasi', short: 'Garuda', src: null },
    { name: 'Cambridge International School', short: 'Cambridge', src: null },
  ],
  // Narahubung / contact persons: WhatsApp only (v1.5). Two slots.
  // The booklet gives per-competition PICs only; these two are the competition-wide ones
  // it repeats most (TK Mewarnai and SMP/MTs Olimpiade), used as festival-level defaults
  // until the committee names a dedicated pair.
  contacts: [
    { name: 'Ms. Wardah', whatsapp: '0852 6062 6123' },
    { name: 'Mr. Dwiki', whatsapp: '0813 1850 6606' },
  ],
};

