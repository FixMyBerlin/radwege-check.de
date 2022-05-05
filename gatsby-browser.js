// https://www.gatsbyjs.com/docs/how-to/styling/using-web-fonts/#self-host-google-fonts-with-fontsource
// Variants: https://www.npmjs.com/package/@fontsource/open-sans
import '@fontsource/open-sans/300.css'; // .font-light
import '@fontsource/open-sans'; // 400; .font-normal
import '@fontsource/open-sans/600.css'; // .font-semibold
import '@fontsource/open-sans/700.css'; // .font-bold

// Variants: https://www.npmjs.com/package/@fontsource/open-sans-condensed
import '@fontsource/open-sans-condensed'; // 400; .font-normal .font-condensed
import '@fontsource/open-sans-condensed/700.css'; // 400; .font-bold .font-condensed

// Variants: https://www.npmjs.com/package/@fontsource/roboto-slab
import '@fontsource/roboto-slab'; // 400; .font-normal .font-slap

import './src/styles/global.css';

export { wrapPageElement } from './src/components/Layout/use-query-params/wrapPageElement';
