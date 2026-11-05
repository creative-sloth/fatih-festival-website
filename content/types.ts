// Data model, see HANDOFF.md §7. `null` means "not supplied yet" and renders as ???.

export type Lang = 'id' | 'en';
// TK was added after the juknis booklet listed Lomba Mewarnai as a TK competition.
export type Level = 'TK' | 'SD' | 'SMP' | 'SMA';
export type Category = 'Akademik' | 'Bahasa' | 'Seni' | 'Media' | 'Inovasi' | 'Olahraga';

export interface Localized {
  id: string;
  en: string | null; // null → show Indonesian text with an "Indonesian only" note
}

export interface Winner {
  rank: string;
  name: string;
  school: string;
}

/** Narahubung. The juknis prints two per competition for several lomba. */
export interface Contact {
  name: string;
  whatsapp: string;
}

export interface Photo {
  src: string;
  thumb: string;
  alt: Localized;
  competition: string | null;
  day: string | null;
}

export interface Competition {
  slug: string;
  name: Localized;
  summary: Localized | null;
  levels: Level[];
  category: Category;
  participation: 'individual' | 'team' | null;
  teamSize: string | null;
  eligibility: Localized | null;
  registrationOpens: string | null; // ISO 8601 with +07:00
  registrationCloses: string | null;
  competitionDate: string | null;
  venue: Localized | null;
  format: 'onsite' | 'online' | 'hybrid' | null;
  fee: string | null;
  prizes: Localized | null;
  juknisUrl: string | null;
  juknisLanguage: 'id' | 'en' | 'both' | null;
  formUrl: string | null;
  contact: Contact[] | null;
  cancelled: boolean;
  results: Winner[] | null;
}

export interface Festival {
  name: string;
  edition: string;
  tagline: Localized;
  host: string;
  startDate: string | null;
  endDate: string | null;
  venue: Localized | null;
  /** Short place line for the hero (the full address in `venue` goes in the footer). */
  venueShort: Localized | null;
  logos: { name: string; short: string; src: string | null }[];
  /** General Google Form for registration. Used when a competition has no `formUrl` of its own. */
  formUrl: string | null;
  /** Narahubung grouped by school level (from the committee's Data Lomba sheet). A competition without
   *  its own contact falls back to the groups that cover its levels. */
  levelContacts: { label: string; levels: Level[]; people: Contact[] }[];
}
