import React from 'react'

import { ReportPage } from '~/components/ReportPage'
import de from '~/components/ReportPage/translations/de.json'

export const AuswertungRoute = () => {
  const currentLanguage = 'de'

  return <ReportPage lang={currentLanguage} translationKeys={de} />
}
