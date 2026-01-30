const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

exports.onCreateBabelConfig = ({ actions }) => {
  // Add React Compiler plugin - must run first in the Babel pipeline
  actions.setBabelPlugin({
    name: 'babel-plugin-react-compiler',
    options: {},
  }, {
    prepend: true, // Ensure React Compiler runs first
  })
}

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig()

  // Remove ESLint webpack plugin (not compatible with ESLint 9)
  config.plugins = config.plugins.filter(
    (plugin) => plugin.constructor.name !== 'ESLintWebpackPlugin'
  )

  actions.replaceWebpackConfig(config)

  actions.setWebpackConfig({
    resolve: {
      // @ts-ignore
      plugins: [new TsconfigPathsPlugin()],
    },
  })
}
