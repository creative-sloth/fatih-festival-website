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
  logos: [
    { name: 'Fatih Bilingual School', short: 'Fatih', src: '/logos/fatih.png' },
    { name: 'SMA Unggul Garuda Transformasi', short: 'Garuda', src: '/logos/garuda.png' },
    { name: 'Cambridge International School', short: 'Cambridge', src: '/logos/cambridge.png' },
  ],
  // Narahubung / Contact Person. Two festival-wide CPs supplied by the committee 3 Nov 2026.
  // Where a competition's own juknis prints no CP, the card falls back to these.
  contacts: [
    { name: 'Ms Nabila', whatsapp: '0823 6418 0206' },
    { name: 'Mr Saddam', whatsapp: '0821 6506 9163' },
  ],
};

