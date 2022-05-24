module.exports = {
  siteMetadata: {
    title: 'TODO siteMeta.title',
    siteUrl: 'https://todo.url#siteMeta.siteUrl',
    description: 'TODO siteMeta.description',
  },

  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)

  // TailwindCSS needs PostCSS, https://tailwindcss.com/docs/guides/gatsby
  plugins: [
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
      // https://todo.info/sitemap/sitemap-index.xml // only links
      // https://todo.info/sitemap/sitemap-0.xml // content
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
      // Docs https://www.gatsbyjs.com/plugins/gatsby-plugin-matomo/
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '6',
        matomoUrl: 'https://s.radwege-check.de',
        siteUrl: 'https://s.radwege-check.de',
        requireConsent: false,
        requireCookieConsent: true,
        disableCookies: true,
        respectDnt: true,
        // ↓ We filter all hits from non-production urls; so setting `dev:true` is fine.
        //   Settings via https://s.fixmycity.de/index.php?module=SitesManager&action=index&idSite=6&period=day&date=yesterday&showaddsite=false
        //   > Zeichne Besuche und Aktionen nur auf, wenn die Aktions-URL mit einer der oben genannten URLs beginnt.
        dev: true,
      },
    },
  ],
};
