import React from 'react'
import { IntlProvider } from 'react-intl'
import {
  SectionAbout,
  SectionDataset,
  SectionHeader,
  SectionIntroduction,
  SectionResults,
  SectionSummary,
  SectionTableOfContents,
  SectionTeam,
} from './sections'
import { ReportTranslations } from './translations'

type Props = {
  lang: ReportTranslations
  translationKeys: Record<string, string>
}

export const ReportPage: React.FC<Props> = ({ lang, translationKeys }) => {
  // const intl = useIntl()

  return (
    <IntlProvider locale={lang} messages={translationKeys} defaultLocale="de">
      <SectionTableOfContents />
      <SectionHeader />
      <SectionIntroduction />
      <SectionAbout />
      <SectionDataset />
      <SectionResults />
      <SectionSummary />
      <SectionTeam />
    </IntlProvider>
  )
}
