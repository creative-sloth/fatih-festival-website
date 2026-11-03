// Favourites are a per-visitor convenience: stored only in this browser, never sent anywhere.
// Components stay in sync through a window event, so the nav badge updates when a card is starred.

const KEY = 'ff-favorites';
export const FAVS_EVENT = 'ff-favorites-change';
export const SHOW_FAVS_EVENT = 'ff-show-favorites';

export function loadFavorites(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(raw) ? raw.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

export function saveFavorites(slugs: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(slugs));
  } catch {}
  window.dispatchEvent(new CustomEvent(FAVS_EVENT, { detail: slugs }));
}
