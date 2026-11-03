import type { Category, Competition, Level } from './types';

// Names and levels from the official poster. Every other field is unconfirmed → null (renders ???).
// See HANDOFF.md §5 for open questions per competition.
const tba = (slug: string, name: string, levels: Level[], category: Category): Competition => ({
  slug,
  name: { id: name, en: null },
  summary: null,
  levels,
  category,
  participation: null,
  teamSize: null,
  eligibility: null,
  registrationOpens: null,
  registrationCloses: null,
  competitionDate: null,
  venue: null,
  format: null,
  fee: null,
  prizes: null,
  juknisUrl: null,
  juknisLanguage: null,
  formUrl: null,
  contact: null,
  cancelled: false,
  results: null,
});

export const competitions: Competition[] = [
  tba('sd-bercerita', 'Lomba Bercerita', ['SD'], 'Bahasa'),
  tba('sd-tari-kreasi', 'Tari Kreasi Group', ['SD'], 'Seni'),
  tba('sd-olimpiade-mipa', 'Olimpiade Matematika & IPA', ['SD'], 'Akademik'),
  tba('sd-vocal-solo', 'Vocal Solo', ['SD'], 'Seni'),
  tba('sd-spelling-bee', 'Spelling Bee', ['SD'], 'Bahasa'),
  tba('smp-olimpiade-mipa', 'Olimpiade Matematika & IPA', ['SMP'], 'Akademik'),
  tba('smp-vocal-solo', 'Vocal Solo', ['SMP'], 'Seni'),
  tba('smp-baca-puisi', 'Lomba Baca Puisi', ['SMP'], 'Bahasa'),
  tba('sma-debate', 'Debate', ['SMA'], 'Bahasa'),
  tba('sma-essay', 'Essay', ['SMA'], 'Akademik'),
  tba('sma-cerdas-cermat', 'Cerdas Cermat (Math, Eng, Sains)', ['SMA'], 'Akademik'),
  tba('sma-culture-vlog', 'Culture Vlog Competition', ['SMA'], 'Media'),
  tba('smp-sma-desain-grafis', 'Design Grafis', ['SMP', 'SMA'], 'Media'),
  tba('smp-sma-steam-project', 'STEAM Project (Ide, Karya, Prototype Business)', ['SMP', 'SMA'], 'Inovasi'),
  tba('smp-basket', 'Lomba Basket', ['SMP'], 'Olahraga'),
  tba('sd-futsal', 'Futsal', ['SD'], 'Olahraga'),
];
