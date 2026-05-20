import React from 'react'

import { ReportPage } from '~/components/ReportPage'
import es from '~/components/ReportPage/translations/es.json'

export const EvaluacionRoute = () => {
  const currentLanguage = 'es'

  return <ReportPage lang={currentLanguage} translationKeys={es} />
}
