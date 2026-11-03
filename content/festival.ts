import type { Festival } from './types';

// Source: official poster (docs/poster-fatih-festival-3.0.jpeg). null = not supplied yet.
export const festival: Festival = {
  name: 'Fatih Festival',
  edition: '3.0',
  tagline: {
    id: 'Two Decades of Learning, A Lifetime of Impact', // Indonesian version not supplied; official tagline is English
    en: 'Two Decades of Learning, A Lifetime of Impact',
  },
  host: 'Fatih Bilingual School',
  startDate: null,
  endDate: null,
  venue: null,
  // src: null → labelled placeholder box until official files arrive
  logos: [
    { name: 'Fatih Bilingual School', short: 'Fatih', src: null },
    { name: 'SMA Unggul Garuda Transformasi', short: 'Garuda', src: null },
    { name: 'Cambridge International School', short: 'Cambridge', src: null },
  ],
  contacts: [
    { name: null, whatsapp: null },
    { name: null, whatsapp: null },
  ],
};
