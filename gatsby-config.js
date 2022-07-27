module.exports = {
  // Required by 'gatsby-plugin-sitemap' Plugin
  siteMetadata: {
    title: 'TODO siteMeta.title',
    siteUrl: 'https://radwege-check.de',
    description: 'TODO siteMeta.description',
  },

  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)

  plugins: [
    // Docs https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/
    // Test with `npm run build && npm run serve` to validate server side rendering (with rehydration)
    'gatsby-plugin-react-helmet',
    // Docs https://www.gatsbyjs.com/plugins/gatsby-plugin-image/
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    // TailwindCSS needs PostCSS, https://tailwindcss.com/docs/guides/gatsby
    'gatsby-plugin-postcss',
    'gatsby-transformer-csv',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './src/scenes/',
      },
    },
    {
      // Docs https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/
      // https://radwege-check.de/sitemap/sitemap-index.xml // only links
      // https://radwege-check.de/sitemap/sitemap-0.xml // content
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/kontakt/', '/datenschutz/'],
      },
    },
    {
      // Docs https://www.gatsbyjs.com/plugins/gatsby-plugin-react-svg/
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          // include: /\.inline\.svg$/,
          // Remove SVG props that fail conversion to dom
          omitKeys: ['xmlnsSerif', 'serifId'],
        },
      },
    },
    {
      // Docs https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Radwege-Check',
        short_name: 'Radwege-Check',
        start_url: '/',
        background_color: 'white',
        theme_color: '#fff8e8',
        display: 'minimal-ui', // https://developer.mozilla.org/en-US/docs/Web/Manifest/display#values
        icon: 'src/components/assets/radwegecheck-logo-bildmarke-mehrfarbig.svg',
        legacy: false,
        lang: 'de-DE', // https://developer.mozilla.org/en-US/docs/Web/Manifest/lang
      },
    },
    {
      // Docs https://www.gatsbyjs.com/plugins/gatsby-plugin-matomo/
      // Some plugis are auto-enabled:
      //  - enableLinkTracking
      //    Docs: https://developer.matomo.org/guides/spa-tracking#link-tracking
      //    Code: https://github.com/kremalicious/gatsby-plugin-matomo/blob/main/src/gatsby-browser.js#L36
      //  - trackAllContentImpressions
      //    Docs: https://developer.matomo.org/guides/spa-tracking#content-tracking
      //    Code: https://github.com/kremalicious/gatsby-plugin-matomo/blob/main/src/gatsby-browser.js#L37
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '6',
        matomoUrl: 'https://s.radwege-check.de',
        siteUrl: 'https://s.radwege-check.de',
        requireConsent: false,
        requireCookieConsent: false,
        disableCookies: true,
        respectDnt: false,
        // ↓ We filter all hits from non-production urls; so setting `dev:true` is fine.
        //   Settings via https://s.fixmycity.de/index.php?module=SitesManager&action=index&idSite=6&period=day&date=yesterday&showaddsite=false
        //   > Zeichne Besuche und Aktionen nur auf, wenn die Aktions-URL mit einer der oben genannten URLs beginnt.
        // This is active for all but the netlify production build.
        dev: process.env.CONTEXT !== 'production',
      },
    },
  ],
}
