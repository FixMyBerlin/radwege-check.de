<div align="center">
  <img src="src/components/assets/radwegecheck-logo-mehrfarbig.svg" height="80" />
  <h1 align="center"><a href="https://radwege-check.de">radwege-check.de</a> (<a href="https://bikelane-safetycheck.net">English</a>)</h1>
</div>

## Contributions

If you find any bugs, feel free to open an issue.

## Develop

- Use asdf or nvm to install NodeJS
- Use `npm run` to see a list of commands like `npm run start`
- Use `npm run mobile` to test the side with your mobile phone; more at https://github.com/gatsbyjs/gatsby/issues/5801
- Use `npm run profile` to allow using the react dev tools profiling ([more](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html))
- Use `npx eslint --print-config .eslintrc` to check the `.eslintrc` for errors

### Test the translation modal

This page can be accessed via radwege-check.de and bikelane-safetycheck.net. When using bikelane-safetycheck.net, we show a modal that hints at using Google Translate to translate the page. (We have a secondary feature, that shows a translation button whenever the page is used with a none-DE browser locale.)

Whenever the domain includes `bikelane-safetycheck`, the componente `components/Layout/EnglishLanguage/EnglishLanguageModal` is visible.

To test this, you can setup a custom `.test` domain locally:

- `sudo code /etc/hosts`
- add
  ```
  127.0.0.1 radwege-check.test
  127.0.0.1 bikelane-safetycheck.test
  ```
- `open http://bikelane-safetycheck.test:8000/` for testing

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for more information.
It contains dependencies which have different Licenses, see [`package.json`](./package.json).

## Thanks

- This site is build using [Gatsby](https://www.gatsbyjs.com/) which allows us to manage our data in a convenient way in a spreadsheet, export as CSV and generate static content based on this.
- We used a [Gatsby starter](https://github.com/jpedroschmitz/gatsby-starter-ts) by João Pedro Schmitz.
- The search filtering is provided [ItemsJS](https://github.com/itemsapi/itemsjs) which allows us to provide advanded filtering right in the browser.
- We rely heavily on [Tailwind CSS](https://tailwindcss.com/), [Tailwind UI](https://tailwindui.com/) and [Headless UI](https://headlessui.dev/).
