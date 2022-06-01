// https://www.gatsbyjs.com/docs/how-to/styling/using-web-fonts/#self-host-google-fonts-with-fontsource
// Variants: https://www.npmjs.com/package/@fontsource/barlow
import '@fontsource/barlow/300.css'; // .font-light
import '@fontsource/barlow'; // 400; .font-normal
import '@fontsource/barlow/600.css'; // .font-semibold
import '@fontsource/barlow/700.css'; // .font-bold
// Variants: https://www.npmjs.com/package/@fontsource/barlow-semi-condensed
import '@fontsource/barlow-semi-condensed'; // 400; .font-normal .font-semi
import '@fontsource/barlow-semi-condensed/600.css'; // 400; .font-semibold .font-semi
import '@fontsource/barlow-semi-condensed/700.css'; // 400; .font-bold .font-semi
// Variants: https://www.npmjs.com/package/@fontsource/barlow-semi-condensed
import '@fontsource/barlow-condensed'; // 400; .font-normal .font-condensed
import '@fontsource/barlow-condensed/600.css'; // 400; .font-semibold .font-condensed
import '@fontsource/barlow-condensed/700.css'; // 400; .font-bold .font-condensed

import './src/styles/global.css';

export { wrapPageElement } from './src/components/Layout/use-query-params/wrapPageElement';
