const { defineConfig } = require('taze')

module.exports = defineConfig({
  // Ignore packages that cause compatibility issues or need manual updates
  exclude: ['query-string', 'use-query-params'],
})
