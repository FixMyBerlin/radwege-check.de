import { PageProps } from 'gatsby'
import React from 'react'
import { Auswertung } from '~/components/Auswertung'
// import de from '~/components/Auswertung/translations/de.json'
import en from '~/components/Auswertung/translations/en.json'
// import es from '~/components/Auswertung/translations/es.json'
import { LayoutArticle, MetaTags } from '~/components/Layout'
import { domain } from '~/components/utils'

const AuswertungPage: React.FC<PageProps> = ({ location }) => {
  const currentLanguage = 'en'

  return (
    <LayoutArticle location={location} showEnglishLanguageTeaser={false}>
      <MetaTags
        article
        title="Report"
        description="TODO"
        lang={currentLanguage}
      >
        <link rel="alternate" hrefLang="de" href={`${domain}/auswertung`} />
        <link rel="alternate" hrefLang="en" href={`${domain}/report`} />
        <link rel="alternate" hrefLang="es" href={`${domain}/evaluacion`} />
      </MetaTags>
      <Auswertung lang={currentLanguage} translationKeys={en} />
    </LayoutArticle>
  )
}

export default AuswertungPage
