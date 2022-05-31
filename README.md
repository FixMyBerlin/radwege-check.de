<div align="center">
  <!--<img src="src/images/logo.svg" height="80" />-->
  <h1 align="center"><a href="https://radwege-check.de">radwege-check.de</a></h1>
</div>

## Contributions

If you find any bugs, feel free to open an issue.

## Develop

- Use asdf or nvm to install NodeJS
- Use `npm run` to see a list of commands like `npm run start`
- Use `npm run build && npx serve public` to test the build
- Use `npx eslint --print-config .eslintrc` to check the `.eslintrc` for errors

### Gatsby KnowHow

- About `location`
  https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v1-to-v2/#4-pass-history-location-and-match-props-to-layout
  https://css-tricks.com/how-to-the-get-current-page-url-in-gatsby/

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for more information.
It contains dependencies which have different Licenses, see [`package.json`](./package.json).

## Thanks

- This site is build using [Gatsby](https://www.gatsbyjs.com/) which allows us to manage our data in a convenient way in a spreadsheet, export as CSV and generate static content based on this.
- We used a [Gatsby starter](https://github.com/jpedroschmitz/gatsby-starter-ts) by João Pedro Schmitz.
- The search filtering is provided [ItemsJS](https://github.com/itemsapi/itemsjs) which allows us to provide advanded filtering right in the browser.
- We rely heavily on [Tailwind CSS](https://tailwindcss.com/), [Tailwind UI](https://tailwindui.com/) and [Headless UI](https://headlessui.dev/).
