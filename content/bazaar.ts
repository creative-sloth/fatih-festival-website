import type { Tenant } from './types';

// Tenant Bazaar logos from the committee (logo/Bazaar, 16 Nov 2026), trimmed, white backgrounds cut out where the logo sits on one,
// resized to WebP in public/assets/bazaar/. `layout` scatters them across the section on purpose (lively, not a neat grid).
export const tenants: Tenant[] = [
  { name: 'Es Kriting', src: '/assets/bazaar/es-kriting.webp', width: 560, height: 280, layout: { x: 2, y: 8, w: 21, r: -7 } },
  { name: 'Chichlin Chicken', src: '/assets/bazaar/chichlin-chicken.webp', width: 420, height: 420, layout: { x: 30, y: 0, w: 15, r: -5 } },
  { name: 'Little Matcha', src: '/assets/bazaar/little-matcha.webp', width: 560, height: 134, layout: { x: 52, y: 8, w: 24, r: -3 } },
  { name: 'Morning People', src: '/assets/bazaar/morning-people.webp', width: 390, height: 392, layout: { x: 81, y: 8, w: 14, r: 8 } },
  { name: 'Ayang Beib', src: '/assets/bazaar/ayang-beib.webp', width: 356, height: 356, layout: { x: 5, y: 41, w: 15, r: 5 } },
  { name: 'Mie Pangsit Chili Oil', src: '/assets/bazaar/mie-pangsit.webp', width: 438, height: 420, layout: { x: 25, y: 32, w: 16, r: 6 } },
  { name: 'Artistry Studio', src: '/assets/bazaar/artistry-studio.webp', width: 560, height: 339, layout: { x: 47, y: 40, w: 19, r: 4 } },
  { name: 'OPizza', src: '/assets/bazaar/opizza.webp', width: 420, height: 420, layout: { x: 83, y: 52, w: 14, r: -8 } },
  { name: 'Gerai Handmade', src: '/assets/bazaar/gerai-handmade.webp', width: 398, height: 256, layout: { x: 17, y: 74, w: 20, r: -4 } },
  { name: 'Mr Key Ice Cream', src: '/assets/bazaar/mr-key.webp', width: 495, height: 420, layout: { x: 40, y: 68, w: 17, r: 6 } },
  { name: 'Korean Food Noona', src: '/assets/bazaar/korean-food-noona.webp', width: 420, height: 420, layout: { x: 66, y: 66, w: 14, r: 7 } },
];
