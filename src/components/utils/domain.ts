// Docs:
// Using Environment Variables https://www.netlify.com/blog/2021/07/05/easy-access-environment-variables/#using-environment-variables
// CONTEXT https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
// URL vs. DEPLOY_PRIME_URL https://docs.netlify.com/configure-builds/environment-variables/#deploy-urls-and-metadata
// NETLIFY https://docs.netlify.com/configure-builds/environment-variables/#build-metadata

export const domain =
  (process.env.CONTEXT === 'production'
    ? process.env.URL
    : process.env.DEPLOY_PRIME_URL) || 'https://radwege-check.de';

// Let's see what the Netlify build log tells us…
console.log({
  context: process.env.CONTEXT,
  url: process.env.URL,
  prime_url: process.env.DEPLOY_PRIME_URL,
  domain,
});
