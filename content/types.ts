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
  /** Levels this person covers; shown as "(TK)" in the footer and used to pick the right person as a fallback. */
  levels?: Level[];
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
  /** Members per team as printed in the juknis, e.g. "3" or "maks. 12". Rendered as "Tim (3 orang)". */
  teamSize: string | null;
  /** School entry limit, e.g. 2 teams or 5 participants. Rendered as "maks. 2 tim per sekolah". */
  maxPerSchool: { count: number; unit: 'tim' | 'peserta' } | null;
  /** Short grade range for the panel, e.g. "Kelas 5–6". Only where the juknis states one. */
  grades: Localized | null;
  eligibility: Localized | null;
  registrationOpens: string | null; // ISO 8601 with +07:00
  registrationCloses: string | null;
  /** Time slots from the official rundown (Rundown Fatih Festival 3.0.pdf), WIB. null = not scheduled yet. */
  schedule: ScheduleSlot[] | null;
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

export interface ScheduleSlot {
  date: string; // YYYY-MM-DD
  start: string; // HH:MM, 24 h, WIB
  end: string;
}

export interface Sponsor {
  name: string;
  src: string;
  width: number;
  height: number;
  /** Optional website; when set the logo becomes a link. */
  url?: string;
}

export interface Festival {
  name: string;
  edition: string;
  tagline: Localized;
  host: string;
  startDate: string | null;
  endDate: string | null;
  /** Awarding Ceremony slot from the official rundown. */
  awarding: ScheduleSlot | null;
  venue: Localized | null;
  /** Short place line for the hero (the full address in `venue` goes in the footer). */
  venueShort: Localized | null;
  logos: { name: string; short: string; src: string | null; width: number; height: number }[];
  /** One shared Google Drive folder with every juknis. Replaces the per-competition juknis files. */
  juknisUrl: string | null;
  /** Official poster image for the download button (public/assets). */
  posterUrl: string | null;
  /** Linktree and Instagram for more information about the competitions. */
  linktreeUrl: string | null;
  instagram: { handle: string; url: string } | null;
  /** General Google Form for registration. Used when a competition has no `formUrl` of its own. */
  formUrl: string | null;
  /** Registration deadline (ISO, +07:00), the same for every competition. null = not announced: the hero
   *  shows `registrationClosesText` and a placeholder countdown. */
  registrationCloses: string | null;
  registrationClosesText: Localized;
  /** Narahubung grouped by school level (from the committee's Data Lomba sheet). A competition without
   *  its own contact falls back to the groups that cover its levels. */
  levelContacts: { label: string; levels: Level[]; people: Contact[] }[];
}
