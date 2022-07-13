# Dev notes about Matomo

- The plugin we use and it's default setup https://github.com/kremalicious/gatsby-plugin-matomo/blob/main/src/gatsby-browser.js#L36-L37
  - Viel los ist nicht beim Plugin https://github.com/kremalicious/gatsby-plugin-matomo/pulls
- Docs about SPA tracking (which is done already via the plugin) https://developer.matomo.org/guides/spa-tracking#content-tracking

## Alternative

We might want to switch to https://www.npmjs.com/package/@datapunt/matomo-tracker-react / https://github.com/jonkoops/matomo-tracker.

## TODO (maybe)

- Content tracking looks interesting:
  We could track sceneIds and their interactions.
  Docs https://developer.matomo.org/guides/tracking-javascript-guide#tracking-content-impressions-and-interactions-manually

  NEXT: Figure out if the reports would help us; otherwise the existing page tracking migth be enough.

- Use "download tracking"
  https://developer.matomo.org/guides/tracking-javascript-guide#recording-a-click-as-a-download
