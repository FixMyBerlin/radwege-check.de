// https://www.gatsbyjs.com/docs/how-to/styling/using-web-fonts/#self-host-google-fonts-with-fontsource
// Variants: https://www.npmjs.com/package/@fontsource/open-sans
import '@fontsource/open-sans/300.css'; // .font-light
import '@fontsource/open-sans'; // 400; .font-normal
import '@fontsource/open-sans/700.css'; // .font-bold
// Variants: https://www.npmjs.com/package/@fontsource/roboto-slab
import '@fontsource/roboto-slab';

import './src/styles/global.css';

export { wrapPageElement } from './src/components/Layout/use-query-params/wrapPageElement';
