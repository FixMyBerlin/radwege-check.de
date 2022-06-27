import { PageProps } from 'gatsby'
import React from 'react'
import { LayoutArticle, MetaTags } from '~/components/Layout'
import { Link } from '~/components/Link'
import { isProduction } from '~/components/utils'
import CommingSoon from './CommingSoon'

const KontaktPage: React.FC<PageProps> = ({ location }) => {
  // TEMP Deactivate page for breta release
  if (isProduction) return <CommingSoon />

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
      <p>TODO</p>

      <h2>OpenData: Die aggregierten Daten dieser Website</h2>
      <p>TODO</p>

      <h2>Lizenz: Bilder, Grafiken und Texte</h2>
      <p>
        Wenn nicht anders angegeben stehen die auf dieser Website verwendeten
        Fotos, Grafiken und Texte unter{' '}
        <Link external to="https://creativecommons.org/licenses/by-nc/4.0">
          Creative Commons-Lizenz BY-NC 4.0
        </Link>
        .
      </p>

      <h2>OpenSource: Diese Website</h2>
      <p>
        Der{' '}
        <Link external to="https://github.com/FixMyBerlin/fixmy.safetycheck">
          Quellcode dieser Website
        </Link>{' '}
        ist OpenSource auf GitHub .
      </p>
    </LayoutArticle>
  )
}

export default KontaktPage
