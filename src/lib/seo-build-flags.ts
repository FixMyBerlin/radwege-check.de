/**
 * Netlify deploy previews / branch builds should stay out of search indexes.
 * Evaluated at build time in Astro frontmatter (Node); matches prior react-helmet behaviour.
 */
export function netlifyNonProductionNoindex(): boolean {
  if (import.meta.env.DEV) {
    return true;
  }
  if (typeof process === "undefined" || !process.env) {
    return false;
  }
  const { NETLIFY, CONTEXT } = process.env;
  return NETLIFY === "true" && CONTEXT != null && CONTEXT !== "production";
}
