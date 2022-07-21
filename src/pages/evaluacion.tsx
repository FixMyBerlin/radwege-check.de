import { PageProps } from 'gatsby'
import React from 'react'
import { ReportPage } from '~/components/ReportPage'
// import de from '~/components/Auswertung/translations/de.json'
// import en from '~/components/Auswertung/translations/en.json'
import es from '~/components/ReportPage/translations/es.json'
import { LayoutArticle, MetaTags } from '~/components/Layout'
import { domain } from '~/components/utils'

const AuswertungPage: React.FC<PageProps> = ({ location }) => {
  const currentLanguage = 'es'

  return (
    <LayoutArticle location={location} showEnglishLanguageTeaser={false}>
      <MetaTags
        article
        title="Estudio sobre la seguridad subjetiva en la movilidad ciclista"
        description="Resultados y datos de la encuesta realizada a más de 22.000 participantes"
        lang={currentLanguage}
      >
        <link rel="alternate" hrefLang="de" href={`${domain}/auswertung`} />
        <link rel="alternate" hrefLang="en" href={`${domain}/report`} />
        <link rel="alternate" hrefLang="es" href={`${domain}/evaluacion`} />
      </MetaTags>
      <ReportPage lang={currentLanguage} translationKeys={es} />
    </LayoutArticle>
  )
}

export default AuswertungPage
