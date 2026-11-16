import type { Tenant } from './types';

// Tenant Bazaar logos from the committee (logo/Bazaar, 16 Nov 2026), trimmed, white backgrounds cut out where the logo sits on one,
// resized to WebP in public/assets/bazaar/. Wide logos first (3 per row), then the square ones (4 per row).
export const tenants: Tenant[] = [
  { name: 'Es Kriting', src: '/assets/bazaar/es-kriting.webp', width: 560, height: 280, kind: 'wide' },
  { name: 'Little Matcha', src: '/assets/bazaar/little-matcha.webp', width: 560, height: 134, kind: 'wide' },
  { name: 'Artistry Studio', src: '/assets/bazaar/artistry-studio.webp', width: 560, height: 339, kind: 'wide' },
  { name: 'Ayang Beib', src: '/assets/bazaar/ayang-beib.webp', width: 356, height: 356, kind: 'square' },
  { name: 'Chichlin Chicken', src: '/assets/bazaar/chichlin-chicken.webp', width: 420, height: 420, kind: 'square' },
  { name: 'Gerai Handmade', src: '/assets/bazaar/gerai-handmade.webp', width: 398, height: 256, kind: 'square' },
  { name: 'Korean Food Noona', src: '/assets/bazaar/korean-food-noona.webp', width: 420, height: 420, kind: 'square' },
  { name: 'Mie Pangsit Chili Oil', src: '/assets/bazaar/mie-pangsit.webp', width: 438, height: 420, kind: 'square' },
  { name: 'Morning People', src: '/assets/bazaar/morning-people.webp', width: 390, height: 392, kind: 'square' },
  { name: 'Mr Key Ice Cream', src: '/assets/bazaar/mr-key.webp', width: 495, height: 420, kind: 'square' },
  { name: 'OPizza', src: '/assets/bazaar/opizza.webp', width: 420, height: 420, kind: 'square' },
];
