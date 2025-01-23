import { PageProps } from 'gatsby'
import React from 'react'
import { LogoBmdv } from '~/components/Homepage/LogoBmdv'
import { LayoutArticle, MetaTags } from '~/components/Layout'
import { Link } from '~/components/Link'

const KontaktPage: React.FC<PageProps> = ({ location }) => {
  return (
    <LayoutArticle location={location}>
      <MetaTags noindex title="Radwege-Check | Kontakt &amp; Impressum" />

      <h1>Kontakt</h1>
      <p>
        <Link to="hello@fixmycity.de" button>
          hello@fixmycity.de
        </Link>
      </p>
      <p>
        Sie finden uns auch auf{' '}
        <Link external blank to="https://www.linkedin.com/company/fixmycity">
          LinkedIn
        </Link>
        .
      </p>

      <h1 className="mt-12 border-t border-gray-300 pt-12">Impressum</h1>
      <p>
        <strong>FixMyCity GmbH</strong>
        <br />
        Oberlandstraße 26-35
        <br />
        12099 Berlin
        <br />
        <Link to="hello@fixmycity.de">hello@fixmycity.de</Link>
        <br />
        Telefon: 030 / 549 08 665
        <br />
        <Link blank to="https://www.fixmycity.de">
          www.fixmycity.de
        </Link>
        ,{' '}
        <Link blank to="https://www.fixmyberlin.de">
          www.fixmyberlin.de
        </Link>
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

      <h1 className="mt-12 border-t border-gray-300 pt-12">Förderung</h1>
      <p>
        <Link
          external
          blank
          to="https://www.mobilitaetsforum.bund.de/DE/Themen/Wissenspool/Projekte/Projektbeispiele/Projekte/RVA-Safetycheck.html"
        >
          <LogoBmdv />
        </Link>
      </p>
    </LayoutArticle>
  )
}

export default KontaktPage
