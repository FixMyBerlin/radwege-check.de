import { PageProps } from 'gatsby'
import React from 'react'
import { LayoutArticle, MetaTags } from '~/components/Layout'
import { Link } from '~/components/Link'

const OpenDataPage: React.FC<PageProps> = ({ location }) => {
  const odblLicencePart = (
    <>
      <br />
      Lizenz:{' '}
      <Link
        to="https://www.opendatacommons.org/licenses/odbl/summary/index.html"
        external
      >
        ODbL
      </Link>
    </>
  )
  const attributionPart = (
    <>
      <br />
      Attribution:{' '}
      <code>
        ©{' '}
        <a className="underline" href="https://www.fixmycity.de/">
          FixMyCity
        </a>
        ,{' '}
        <a className="underline" href="https://radwege-check.de/">
          radwege-check.de
        </a>
      </code>
    </>
  )

  return (
    <LayoutArticle location={location}>
      <MetaTags
        noindex
        title="OpenData, OpenSource"
        description="Die Rohdaten dieses Projektes sind OpenData. Der Quellcode ist OpenSource."
      />
      <h1>OpenData, OpenSource und Lizenzen</h1>
      <p>
        Die aufbereiteten Inhalte und dahinter liegenden Daten sind unter
        offenen Lizenzen veröffentlicht.
      </p>

      <h2>OpenData: Die Rohdaten der Umfrage</h2>
      <p>
        Die{' '}
        <Link to="/auswertung/#datensatz-der-ergebnisse">
          Rohdaten aus der Umfrage Straßencheck
        </Link>{' '}
        stehen zum Download bereit.
        {odblLicencePart}
        {attributionPart}
      </p>

      <h2>OpenData: Die aggregierten Daten dieser Website</h2>
      <p>
        Wenn Sie die auf dieser Seite aggregierten Daten für Forschungsprojekte
        verwenden wollen, schreiben Sie uns unter{' '}
        <Link to="info@fixmycity.de">info@fixmycity.de</Link>.{odblLicencePart}
        {attributionPart}
      </p>

      <h2>Lizenz: Bilder, Grafiken und Texte</h2>
      <p>
        Wenn nicht anders angegeben stehen die auf dieser Website verwendeten
        Fotos, Grafiken und Texte unter Creative Commons-Lizenz.
        <br />
        Lizenz:{' '}
        <Link external to="https://creativecommons.org/licenses/by-nc/4.0">
          CC BY-NC 4.0
        </Link>
        {attributionPart}
      </p>

      <h2>OpenSource: Diese Website</h2>
      <p>
        Der Qellcode dieser Website ist OpenSource unter{' '}
        <Link external to="https://github.com/FixMyBerlin/fixmy.safetycheck">
          github.com/FixMyBerlin/fixmy.safetycheck
        </Link>
        <br />
        Lizenz:{' '}
        <Link
          external
          to="https://github.com/FixMyBerlin/fixmy.safetycheck/blob/main/LICENSE.md"
        >
          AGPL-3.0
        </Link>
      </p>
    </LayoutArticle>
  )
}
export default OpenDataPage
