import { PageProps } from 'gatsby'
import React from 'react'
import { LayoutArticle, MetaTags } from '~/components/Layout'
import { Link } from '~/components/Link'

const PressPage: React.FC<PageProps> = ({ location }) => {
  return (
    <LayoutArticle location={location}>
      <MetaTags
        noindex
        title="Presse und Medien Download"
        description="Der radwege-check erlaubt es die Umfragedaten von 1.700 Varianten an Radweg-Führungsformen zu vergleichen."
      />
      <h1>Presseinformationen</h1>
      <p>
        Ansprechpartner für die Presse und weitere Pressinformationen zu
        FixMyCity finden Sie unter{' '}
        <Link to="https://www.fixmycity.de/presse">fixmycity.de/presse</Link>.
      </p>
      <p>
        Alles Bildmaterial auf dieser Seite kann für journalistische
        Veröffentlichungen kostenfrei unter der Lizenz CC 4.0 verwendet werden.
        <br />
        Attribution: <code>© FixMyCity GmbH, Lizenz CC BY 4.0</code>
      </p>

      <p>
        Bei weiteren Fragen wenden Sie sich gerne an{' '}
        <Link to="presse@fixmycity.de">presse@fixmycity.de</Link>.
      </p>
    </LayoutArticle>
  )
}
export default PressPage
