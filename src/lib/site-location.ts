/**
 * Minimal location shape used across layouts (replaces Gatsby PageProps['location']).
 */
export type SiteLocation = {
  pathname: string;
  search: string;
  hash: string;
  host: string;
  href: string;
  /** @deprecated Prefer sessionStorage handoff; kept for gradual migration */
  state?: { bookmarksArray?: string[]; showBack?: boolean };
};

export function siteLocationFromUrl(url: URL): SiteLocation {
  return {
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
    host: url.host,
    href: url.href,
  };
}
