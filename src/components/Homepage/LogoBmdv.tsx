import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

export const LogoBmdv: React.FC = () => {
  return (
    <StaticImage
      src="./assets/bmdv-gefoerdert.png"
      alt="Gefördert durch: Bundesministerium für Digitales und Verkehr aufgrund eines Beschlusses des Deutschen Bundestages"
      width={200}
      height={200}
    />
  );
};
