import { PageProps } from 'gatsby'
import React from 'react'
import { LayoutArticle, MetaTags } from '~/components/Layout'
import { Link } from '~/components/Link'

const OpenDataPage: React.FC<PageProps> = ({ location }) => {
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
        stehen zum Download unter ODbL Lizenz bereit.
      </p>

      <h2>OpenData: Die aggregierten Daten dieser Website</h2>
      <p>
        Wenn Sie die auf dieser Seite aggregierten Daten für Forschungsprojekte
        verwenden wollen, schreiben Sie uns unter{' '}
        <Link to="info@fixmycity.de">info@fixmycity.de</Link>. Die Daten stehen
        ebenfalls unter ODbL Lizenz.
      </p>

      <h2>Lizenz: Bilder, Grafiken und Texte</h2>
      <p>
        Wenn nicht anders angegeben stehen die auf dieser Website verwendeten
        Fotos, Grafiken und Texte unter{' '}
        <Link external to="https://creativecommons.org/licenses/by-nc/4.0">
          Creative Commons-Lizenz
        </Link>
        .<br />© FixMyCity GmbH, Lizenz CC BY 4.0.
      </p>

      <h2>OpenSource: Diese Website</h2>
      <p>
        Der Qellcode dieser Website ist OpenSource unter AGPL-3.0 Lizenz.
        Weitere Informationen und Dokumentation der Software finden Sie auf{' '}
        <Link external to="https://github.com/FixMyBerlin/fixmy.safetycheck">
          Github FixMyBerlin/fixmy.safetycheck
        </Link>
      </p>
    </LayoutArticle>
  )
}
export default OpenDataPage
