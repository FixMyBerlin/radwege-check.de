import { PageProps } from 'gatsby';
import React from 'react';
import { LayoutArticle, MetaTags } from '~/components/Layout';
import { Link } from '~/components/Link';

const KontaktPage: React.FC<PageProps> = ({ location }) => {
  return (
    <LayoutArticle location={location}>
      <MetaTags
        noindex
        title="Kontakt &amp; Impressum"
        description="Kontakt zum Team von FixMyCity."
      />
      <h1>Kontakt</h1>
      <p>
        <Link to="hello@fixmycity.de" button>
          hello@fixmycity.de
        </Link>
      </p>

      <p>
        Du findest uns auch auf{' '}
        <Link external blank to="https://twitter.com/fixmyberlin">
          Twitter
        </Link>{' '}
        und{' '}
        <Link external blank to="https://www.linkedin.com/company/fixmycity">
          LinkedIn
        </Link>
        .
      </p>

      <h1>Impressum</h1>
      <p>
        <strong>FixMyCity GmbH</strong>
        <br />
        Karlsgartenstraße 12
        <br />
        12049 Berlin
        <br />
        E-Mail-Adresse: <Link to="hello@fixmycity.de">hello@fixmycity.de</Link>
        <br />
        Telefon: 030 / 549 08 665
        <br />
      </p>
      <p>Gesellschafter: Boris Hekele und Heiko Rintelen</p>
      <p>
        Registergericht: Amtsgericht Berlin-Charlottenburg
        <br />
        Registernummer: HRB 205031 B
      </p>
      <p>Umsatzsteuer-Identifikationsnummer gem. § 27a UStG: DE323489466</p>
      <p>
        Verantwortlicher i.S.v. § 55 Rundfunkstaatsvertrag (RStV): Boris Hekele
      </p>

      <h1>OpenSource</h1>
      <p>
        Der{' '}
        <Link external to="https://github.com/FixMyBerlin/fixmy.safetycheck">
          Quellcode dieser Website
        </Link>{' '}
        ist OpenSource auf GitHub .
      </p>
      <h1>Urheberrechte Fotos</h1>
      <p>
        Wenn nicht anders angegeben stehen die auf dieser Website verwendeten
        Fotos unter{' '}
        <Link
          external
          to="https://creativecommons.org/licenses/by-nc/4.0/deed.de"
        >
          Creative Commons-Lizenz BY-NC 4.0
        </Link>
        .
      </p>
      <h1>Förderung</h1>
      <p>
        Diese Website wird TODO{' '}
        <Link external to="#todo">
          Projektsteckbrief TODO
        </Link>
      </p>
    </LayoutArticle>
  );
};

export default KontaktPage;
