import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import { Link } from '../Link';

export const Logos: React.FC = () => {
  return (
    <section className="flex place-content-center bg-white py-1">
      <Link
        to="https://www.mobilitaetsforum.bund.de/DE/Themen/Wissenspool/Projekte/Projektbeispiele/Projekte/RVA-Safetycheck.html"
        external
        blank
      >
        <StaticImage
          src="./assets/bmdv-gefoerdert.png"
          alt="Gefördert durch: Bundesministerium für Digitales und Verkehr aufgrund eines Beschlusses des Deutschen Bundestages"
          width={200}
          height={200}
        />
      </Link>
    </section>
  );
};
