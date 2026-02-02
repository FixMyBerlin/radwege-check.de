const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

exports.onCreateBabelConfig = ({ actions }) => {
  // Add React Compiler plugin - must run first in the Babel pipeline
  actions.setBabelPlugin(
    {
      name: 'babel-plugin-react-compiler',
      options: {},
    },
    {
      prepend: true, // Ensure React Compiler runs first
    },
  )
}

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig()

  // Remove ESLint webpack plugin (not compatible with ESLint 9)
  config.plugins = config.plugins.filter(
    (plugin) => plugin.constructor.name !== 'ESLintWebpackPlugin',
  )

  actions.replaceWebpackConfig(config)

  actions.setWebpackConfig({
    resolve: {
      // @ts-expect-error
      plugins: [new TsconfigPathsPlugin()],
    },
  })
}

// Ensure pages don't have trailing slashes to match file-based routing
// This prevents the "Couldn't find temp query result" error when there's a mismatch
exports.onCreatePage = ({ page, actions }) => {
  const { deletePage } = actions

  // If a page was created with a trailing slash but shouldn't have one,
  // delete it and let Gatsby create it without the trailing slash
  // (This should be handled by trailingSlash: 'never' config, but adding as safeguard)
  if (
    page.path &&
    page.path !== '/' &&
    page.path.endsWith('/') &&
    (page.path.match(/^\/hauptstrassen\/[^/]+\/$/) ||
      page.path.match(/^\/nebenstrassen\/[^/]+\/$/))
  ) {
    // This is a file-based route page that shouldn't have a trailing slash
    // Delete it - Gatsby will create the correct version without trailing slash
    deletePage(page)
  }
}
