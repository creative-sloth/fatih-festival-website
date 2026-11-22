import type { Tenant } from './types';

// Tenant Bazaar logos from the committee (logo/Bazaar, 16-22 Nov 2026), trimmed, white backgrounds cut out where the logo sits on one,
// resized to WebP in public/assets/bazaar/. `layout` scatters them across the section on purpose (lively, not a neat grid).
export const tenants: Tenant[] = [
  { name: 'Es Kriting', src: '/assets/bazaar/es-kriting.webp', width: 560, height: 280, layout: { x: 1.5, y: 8.4, w: 22, r: -6 } },
  { name: 'Chichlin Chicken', src: '/assets/bazaar/chichlin-chicken.webp', width: 420, height: 420, layout: { x: 31.0, y: 2.0, w: 15, r: -5 } },
  { name: 'Pitatocis', src: '/assets/bazaar/pitatocis.webp', width: 560, height: 173, layout: { x: 51.5, y: 11.9, w: 22, r: 3 } },
  { name: 'Morning People', src: '/assets/bazaar/morning-people.webp', width: 390, height: 392, layout: { x: 79.0, y: 3.0, w: 15, r: 7 } },
  { name: 'Ayang Beib', src: '/assets/bazaar/ayang-beib.webp', width: 356, height: 356, layout: { x: 3.5, y: 27.7, w: 13, r: 5 } },
  { name: 'Nai Takoyaki', src: '/assets/bazaar/nai-takoyaki.webp', width: 440, height: 376, layout: { x: 23.5, y: 32.8, w: 15, r: -4 } },
  { name: 'Gen Z Dimsum', src: '/assets/bazaar/genz-dimsum.webp', width: 417, height: 420, layout: { x: 42.0, y: 28.0, w: 14, r: 6 } },
  { name: 'Mie Pangsit Chili Oil', src: '/assets/bazaar/mie-pangsit.webp', width: 438, height: 420, layout: { x: 64.0, y: 32.4, w: 14, r: -6 } },
  { name: 'OPizza', src: '/assets/bazaar/opizza.webp', width: 420, height: 420, layout: { x: 83.5, y: 27.7, w: 13, r: 7 } },
  { name: 'Orenjie', src: '/assets/bazaar/orenjie.webp', width: 560, height: 229, layout: { x: 1.5, y: 58.1, w: 22, r: -4 } },
  { name: 'Mr Key Ice Cream', src: '/assets/bazaar/mr-key.webp', width: 495, height: 420, layout: { x: 30.5, y: 51.4, w: 16, r: 6 } },
  { name: 'Artistry Studio', src: '/assets/bazaar/artistry-studio.webp', width: 560, height: 339, layout: { x: 51.5, y: 58.2, w: 20, r: 4 } },
  { name: 'Es Teh Solo Blang Padang', src: '/assets/bazaar/es-teh-solo.webp', width: 235, height: 279, layout: { x: 81.5, y: 52.0, w: 12, r: -5 } },
  { name: 'Bestya Kitchen', src: '/assets/bazaar/bestya-kitchen.webp', width: 420, height: 420, layout: { x: 3.5, y: 77.2, w: 13, r: -6 } },
  { name: 'Little Matcha', src: '/assets/bazaar/little-matcha.webp', width: 560, height: 134, layout: { x: 20.5, y: 86.3, w: 19, r: -3 } },
  { name: 'Korean Food Noona', src: '/assets/bazaar/korean-food-noona.webp', width: 420, height: 420, layout: { x: 44.5, y: 76.2, w: 13, r: 7 } },
  { name: 'Gerai Handmade', src: '/assets/bazaar/gerai-handmade.webp', width: 398, height: 256, layout: { x: 60.0, y: 81.1, w: 18, r: -4 } },
  { name: 'Dapur Mamasya', src: '/assets/bazaar/dapur-mamasya.webp', width: 420, height: 420, layout: { x: 83.5, y: 77.2, w: 13, r: 5 } },
];
