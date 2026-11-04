import type { Category, Competition, Level } from './types';

// Source: Juknis Fatih Festival 3.0 (docs/juknis-extracted.txt). Only facts printed in the juknis
// are filled. Everything the committee has not published stays null and renders as ???.
// See docs/needed-data.md for the outstanding list.
const VENUE = {
  id: 'Fatih Bilingual School, Jl. Sultan Malikul Saleh No. 103, Bandaraya, Lamlagang, Banda Raya, Kota Banda Aceh 23122',
  en: null,
};

/** Per-competition juknis, split out of the 33-page booklet into public/juknis/<slug>.pdf. */
const juknis = (slug: string) => `/juknis/${slug}.pdf`;

const base = (slug: string, name: string, levels: Level[], category: Category): Competition => ({
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
  venue: VENUE,
  format: 'onsite',
  fee: null,
  prizes: null,
  juknisUrl: juknis(slug),
  juknisLanguage: 'id',
  formUrl: null,
  contact: null,
  cancelled: false,
  results: null,
});

export const competitions: Competition[] = [
  // ---------- TK ----------
  {
    ...base('tk-mewarnai', 'Lomba Mewarnai', ['TK'], 'Seni'),
    participation: 'individual',
    eligibility: { id: 'Siswa/i TK sederajat, perwakilan sekolah (surat keterangan)', en: null },
    format: 'onsite',
    fee: 'Rp 30.000 / peserta',
    contact: [{ name: 'Ms. Wardah', whatsapp: '0852 6062 6123' }, { name: 'Ms. Maula', whatsapp: '0822 4691 6727' }],
  },

  // ---------- SD/MI ----------
  {
    ...base('sd-bercerita', 'Lomba Bercerita', ['SD'], 'Bahasa'),
    participation: 'individual',
    fee: 'Rp 40.000 / peserta',
  },
  {
    ...base('sd-tari-kreasi', 'Tari Kreasi Group', ['SD'], 'Seni'),
    participation: 'team',
    fee: 'Rp 120.000 / peserta',
  },
  {
    ...base('sd-olimpiade-mipa', 'Olimpiade Matematika & IPA', ['SD'], 'Akademik'),
    participation: 'individual',
    eligibility: { id: 'Siswa kelas IV, V, dan VI SD/MI — perorangan; maksimal 5 siswa per sekolah per kategori', en: null },
    registrationOpens: '2026-10-15T00:00:00+07:00',
    registrationCloses: '2026-11-06T23:59:00+07:00',
    competitionDate: '2026-11-11T09:30:00+07:00',
    fee: 'Rp 50.000 / peserta',
  },
  {
    ...base('sd-vocal-solo', 'Vokal Solo', ['SD'], 'Seni'),
    participation: 'individual',
    teamSize: 'Maksimal 2 peserta per sekolah',
    eligibility: { id: 'Siswa SD/MI kelas 5 / 6, perwakilan sekolah (surat keterangan atau KTS)', en: null },
    fee: 'Rp 50.000 / peserta',
    contact: [{ name: 'Ms. Desi', whatsapp: '0823 1039 9310' }, { name: 'Ms. Ratu', whatsapp: '0823 2677 8902' }],
  },
  {
    ...base('sd-spelling-bee', 'Spelling Bee', ['SD'], 'Bahasa'),
    participation: 'individual',
    eligibility: { id: 'Siswa SD/MI sederajat kelas 5 – 6, perwakilan sekolah (surat keterangan atau KTS)', en: null },
    fee: 'Rp 40.000 / peserta',
  },
  // ---------- SMP/MTs ----------
  {
    ...base('smp-olimpiade-mipa', 'Olimpiade Matematika & IPA', ['SMP'], 'Akademik'),
    participation: 'individual',
    eligibility: { id: 'Siswa kelas VII, VIII, atau IX SMP/MTs — perorangan, tanpa batasan jumlah per sekolah', en: null },
    fee: 'Rp 50.000 / peserta',
    contact: [{ name: 'Mr. Dwiki', whatsapp: '0813 1850 6606' }, { name: 'Mr. Farisi', whatsapp: '0852 8268 8976' }],
  },
  {
    ...base('smp-vocal-solo', 'Vokal Solo', ['SMP'], 'Seni'),
    participation: 'individual',
    teamSize: 'Maksimal 2 peserta per sekolah',
    eligibility: { id: 'Siswa SMP/MTs sederajat, perwakilan sekolah (surat keterangan aktif atau KTS)', en: null },
    fee: 'Rp 65.000 / peserta',
    contact: [{ name: 'Mr. Eko', whatsapp: '0852 7710 0192' }],
  },
  {
    ...base('smp-baca-puisi', 'Lomba Baca Puisi', ['SMP'], 'Bahasa'),
    participation: 'individual',
    teamSize: 'Maksimal 2 peserta per sekolah',
    eligibility: { id: 'Siswa/siswi aktif SMP/MTs dan sederajat', en: null },
    fee: 'Rp 40.000 / peserta',
    contact: [{ name: 'Ms. Afrileni', whatsapp: '0813 6040 4988' }],
  },
  {
    ...base('smp-basket', 'Lomba Basket', ['SMP'], 'Olahraga'),
    participation: 'team',
    teamSize: 'Maksimal 12 pemain + official',
    fee: 'Rp 300.000 / tim',
    contact: [{ name: 'Mr. Anis', whatsapp: '0813 9684 2987' }],
  },

  // ---------- SMA/MA ----------
  {
    ...base('sma-debate', 'English Debate', ['SMA'], 'Bahasa'),
    name: { id: 'English Debate', en: 'English Debate' },
    participation: 'team',
    teamSize: '3 pendebat per tim; maksimal 2 tim per sekolah',
    eligibility: { id: 'Siswa/i aktif SMA/MA/sederajat (KTS atau surat keterangan aktif)', en: null },
    registrationOpens: '2026-09-19T00:00:00+07:00',
    registrationCloses: '2026-11-07T23:59:00+07:00',
    competitionDate: '2026-11-11T08:00:00+07:00',
    fee: 'Rp 300.000 / tim',
    juknisLanguage: 'both',
  },
  {
    ...base('sma-essay', 'Lomba Essay', ['SMA'], 'Akademik'),
    participation: 'individual',
    eligibility: { id: 'Pelajar aktif SMA/MA/SMK/sederajat; individu, satu karya per peserta', en: null },
    registrationCloses: '2026-11-10T23:59:00+07:00',
    format: 'online',
    fee: 'Rp 40.000 / peserta',
    contact: [{ name: 'Ms. Nabila', whatsapp: '0823 6418 0206' }],
  },
  {
    ...base('sma-cerdas-cermat', 'Cerdas Cermat', ['SMA'], 'Akademik'),
    participation: 'team',
    teamSize: '3 orang per tim; maksimal 2 tim per sekolah',
    eligibility: { id: 'Siswa/i aktif SMA/MA/sederajat (kelas 10 – 12), perwakilan resmi sekolah', en: null },
    registrationCloses: '2026-11-10T23:59:00+07:00',
    competitionDate: '2026-11-13T08:00:00+07:00',
    fee: 'Rp 200.000 / tim',
  },
  {
    ...base('sma-culture-vlog', 'Culture Vlog Competition', ['SMA'], 'Media'),
    participation: 'individual',
    fee: 'Rp 50.000 / peserta',
    juknisLanguage: 'both',
    contact: [{ name: 'Mr. Surya', whatsapp: '0853 7192 8827' }],
  },

  // ---------- SMP & SMA ----------
  {
    ...base('smp-sma-desain-grafis', 'Desain Grafis – Komik', ['SMP', 'SMA'], 'Media'),
    participation: 'individual',
    fee: 'Rp 40.000 / peserta',
    contact: [{ name: 'Arief Al', whatsapp: '0812 6545 4182' }],
  },
  {
    ...base('smp-sma-stem-expo', 'STEM Expo', ['SMP', 'SMA'], 'Inovasi'),
    participation: 'team',
    teamSize: '2 orang per tim; maksimal 1 tim per sekolah',
    eligibility: { id: 'Siswa SMP/MTs kelas 7 – 9 dan SMA/MA sederajat kelas 10 – 12', en: null },
    fee: 'Rp 150.000 / tim', // juknis: transfer to BSI 2828-0000-52
    juknisLanguage: 'both',
    // Its own juknis prints no narahubung, so it falls back to the general CPs.
  },

  // Futsal is not in the 33-page juknis booklet but the committee supplied a separate
  // PETUNJUK TEKNIS - LOMBA FUTSAL SD/MI, so it is a confirmed competition.
  {
    ...base('sd-futsal', 'Futsal', ['SD'], 'Olahraga'),
    participation: 'team',
    teamSize: 'Maksimal 12 orang per tim: 10 pemain + 2 official',
    eligibility: { id: 'Siswa tingkat SD/MI sederajat, perwakilan sekolah (surat tugas)', en: null },
    fee: 'Rp 350.000 / tim',
    contact: [{ name: 'Mr. Surya', whatsapp: '0853 7192 8827' }],
  },
];
