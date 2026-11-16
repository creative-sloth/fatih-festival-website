import type { Sponsor } from './types';

// Sponsor logos from the committee's "LOGO SPONSOR" Drive folder and logo/Sponsor (16 Nov 2026). Trimmed, white backgrounds cut out
// and resized to WebP in public/assets/sponsors/. Order and tiers follow the committee's "Sponsor Order" flyer: the list runs from
// the biggest contribution (tier 1: largest logos, top row) to the smallest (tier 4). Each tier is one centred row (wrapping when
// it does not fit). No sponsor has a website link yet (add `url`).
export const sponsors: Sponsor[] = [
  { name: 'Jala Cafe', src: '/assets/sponsors/jala-cafe.webp', width: 388, height: 300, tier: 1 },
  { name: 'Grab', src: '/assets/sponsors/grab.webp', width: 300, height: 300, tier: 1 },
  { name: 'Buttonscarves Aceh', src: '/assets/sponsors/buttonscarves.webp', width: 300, height: 300, tier: 1 },
  { name: 'Kahf', src: '/assets/sponsors/kahf.webp', width: 520, height: 277, tier: 2 },
  { name: 'Dunia Komputer', src: '/assets/sponsors/dunia-komputer.webp', width: 520, height: 105, tier: 2 },
  { name: 'PT Grafis Agung Indonesia', src: '/assets/sponsors/grafis-agung.webp', width: 520, height: 109, tier: 2 },
  { name: 'Emina', src: '/assets/sponsors/emina.webp', width: 477, height: 300, tier: 2 },
  { name: 'Encebe', src: '/assets/sponsors/encebe.webp', width: 300, height: 300, tier: 3 },
  { name: 'PT Arkiatama', src: '/assets/sponsors/arkiatama.webp', width: 520, height: 111, tier: 3 },
  { name: 'PT Berkah Energi Tuah Aceh', src: '/assets/sponsors/berkah-energi.webp', width: 520, height: 103, tier: 3 },
  { name: 'CV Fishenary Indo Makmur', src: '/assets/sponsors/cv-fishenary.webp', width: 481, height: 379, tier: 3 },
  { name: 'Penerbit Erlangga', src: '/assets/sponsors/penerbit-erlangga.webp', width: 560, height: 149, tier: 4 },
  { name: 'Alfa Momong Beach', src: '/assets/sponsors/alfa-momong-beach.webp', width: 479, height: 300, tier: 4 },
  { name: 'Meutuah Baro', src: '/assets/sponsors/meutuah-baro.webp', width: 254, height: 300, tier: 4 },
  { name: 'Cut Manyak', src: '/assets/sponsors/cut-manyak.webp', width: 520, height: 241, tier: 4 },
  { name: 'PLN', src: '/assets/sponsors/pln.webp', width: 206, height: 300, tier: 4 },
  { name: 'Bazla', src: '/assets/sponsors/bazla.webp', width: 560, height: 161, tier: 4 },
  { name: 'Palang Merah Indonesia', src: '/assets/sponsors/palang-merah.webp', width: 548, height: 212, tier: 4 },
];
