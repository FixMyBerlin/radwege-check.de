import React from 'react'
import { IntlProvider } from 'react-intl'
import { LanguageSwitcher } from './components'
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
  return (
    <IntlProvider locale={lang} messages={translationKeys} defaultLocale="de">
      <LanguageSwitcher />
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
