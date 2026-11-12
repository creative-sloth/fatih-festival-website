import type { Sponsor } from './types';

// Sponsor logos from the committee's "LOGO SPONSOR" Drive folder (11 Nov 2026). Trimmed, white backgrounds cut out and
// resized to WebP in public/assets/sponsors/. The order here is the order on the site; no sponsor has a website link yet (add `url`).
export const sponsors: Sponsor[] = [
  { name: 'PT Grafis Agung Indonesia', src: '/assets/sponsors/grafis-agung.webp', width: 520, height: 109 },
  { name: 'PT Berkah Energi Tuah Aceh', src: '/assets/sponsors/berkah-energi.webp', width: 520, height: 103 },
  { name: 'Alfa Momong Beach', src: '/assets/sponsors/alfa-momong-beach.webp', width: 479, height: 300 },
  { name: 'Encebe', src: '/assets/sponsors/encebe.webp', width: 300, height: 300 },
  { name: 'Grab', src: '/assets/sponsors/grab.webp', width: 300, height: 300 },
  { name: 'Buttonscarves Aceh', src: '/assets/sponsors/buttonscarves.webp', width: 300, height: 300 },
  { name: 'Emina', src: '/assets/sponsors/emina.webp', width: 477, height: 300 },
  { name: 'Jala Cafe', src: '/assets/sponsors/jala-cafe.webp', width: 388, height: 300 },
  { name: 'Dunia Komputer', src: '/assets/sponsors/dunia-komputer.webp', width: 520, height: 105 },
  { name: 'PLN', src: '/assets/sponsors/pln.webp', width: 206, height: 300 },
  { name: 'Kahf', src: '/assets/sponsors/kahf.webp', width: 520, height: 277 },
  { name: 'PT Arkiatama', src: '/assets/sponsors/arkiatama.webp', width: 520, height: 111 },
  { name: 'Meutuah Baro', src: '/assets/sponsors/meutuah-baro.webp', width: 254, height: 300 },
  { name: 'Cut Manyak', src: '/assets/sponsors/cut-manyak.webp', width: 520, height: 241 },
];
