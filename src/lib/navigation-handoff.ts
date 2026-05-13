/** Session keys for navigation state that Gatsby previously passed via history state. */
const BOOKMARKS_HANDOFF_KEY = "radwege-check-bookmarks-handoff";
const SHOW_BACK_HANDOFF_KEY = "radwege-check-show-back-handoff";

export function stashBookmarksForNavigation(ids: string[]) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(BOOKMARKS_HANDOFF_KEY, JSON.stringify(ids));
}

export function stashShowBackForNavigation() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SHOW_BACK_HANDOFF_KEY, "1");
}

export function consumeBookmarksHandoff(): string[] | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(BOOKMARKS_HANDOFF_KEY);
  if (!raw) return null;
  sessionStorage.removeItem(BOOKMARKS_HANDOFF_KEY);
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as string[]) : null;
  } catch {
    return null;
  }
}

export function consumeShowBackHandoff(): boolean {
  if (typeof window === "undefined") return false;
  const v = sessionStorage.getItem(SHOW_BACK_HANDOFF_KEY);
  sessionStorage.removeItem(SHOW_BACK_HANDOFF_KEY);
  return v === "1";
}
