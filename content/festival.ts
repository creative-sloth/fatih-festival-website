import type { Festival } from './types';

const ADDRESS =
  'Fatih Bilingual School, Jl. Sultan Malikul Saleh No. 103, Bandaraya, Lamlagang, Banda Raya, Kota Banda Aceh 23122';

// Sources: committee juknis booklet, Data Lomba.xlsx and the chat decisions recorded in HANDOFF.md section 0.1.
// The committee's dates (25-27 Nov, awarding 28 Nov) override the 11-14 Nov dates printed in the old juknis.
// null = not supplied yet.
export const festival: Festival = {
  name: 'Fatih Festival',
  edition: '3.0',
  tagline: {
    id: 'Two Decades of Learning, A Lifetime of Impact', // Indonesian version not supplied; official tagline is English
    en: 'Two Decades of Learning, A Lifetime of Impact',
  },
  host: 'Fatih Bilingual School',
  startDate: '2026-11-25', // dates only; no time of day (committee, 6 Nov 2026)
  endDate: '2026-11-27',
  awardingDate: '2026-11-28',
  venue: { id: ADDRESS, en: ADDRESS },
  venueShort: { id: 'Fatih Bilingual School, Banda Aceh', en: 'Fatih Bilingual School, Banda Aceh' },
  logos: [
    { name: 'Fatih Bilingual School', short: 'Fatih', src: '/logos/fatih.png', width: 474, height: 240 },
    { name: 'SMA Unggul Garuda Transformasi', short: 'Garuda', src: '/logos/garuda.png', width: 654, height: 240 },
    { name: 'Cambridge International School', short: 'Cambridge', src: '/logos/cambridge.png', width: 550, height: 240 },
  ],
  // All juknis live in one shared Drive folder (committee, 6 Nov 2026).
  juknisUrl: 'https://drive.google.com/drive/folders/1dKVKPncjZa9aCuqxclTL1Yn0CaGa-nnD',
  posterUrl: '/assets/poster-fatih-festival-3.0.jpg',
  linktreeUrl: 'https://linktr.ee/fatih.festival',
  instagram: { handle: '@fatihfestival', url: 'https://www.instagram.com/fatihfestival/' },
  // General registration form (committee, 5 Nov 2026). A competition with its own `formUrl` overrides it.
  formUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSc0ZACvGgYvLkD2lDxdqXY-qM3dH2eMaRIJFU6LyWLNUBpOsw/viewform',
  // One deadline for all competitions: 20 Nov 2026, 23:59 WIB (committee, 6 Nov 2026).
  // Pelaksanaan 25-27 Nov 2026 (startDate/endDate); Awarding Ceremony 28 Nov 2026. Dates only, no times.
  registrationCloses: '2026-11-20T23:59:00+07:00',
  registrationClosesText: { id: '20 November 2026, 23.59 WIB', en: '20 November 2026, 11:59 PM WIB' },
  // Narahubung per school level, from Data Lomba.xlsx (rows "Contact Person ..."); TK & SD was later changed to Ms. Nisa by the committee (6 Nov 2026).
  levelContacts: [
    { label: 'TK & SD', levels: ['TK', 'SD'], people: [{ name: 'Ms. Nisa', whatsapp: '0852 7637 7196' }] },
    { label: 'SMP', levels: ['SMP'], people: [{ name: 'Mr. Farisi', whatsapp: '0852 8268 8976' }] },
    {
      label: 'SMA',
      levels: ['SMA'],
      people: [
        { name: 'Mr. Rayhan', whatsapp: '0815 1911 1367' },
        { name: 'Mr. Dhiya', whatsapp: '0823 7056 1457' },
      ],
    },
  ],
};

