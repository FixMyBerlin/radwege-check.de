import React from 'react'
import { IntlProvider } from 'react-intl'
import {
  SectionAbout,
  SectionDataset,
  SectionHeader,
  SectionIntroduction,
  SectionResults,
  SectionSummary,
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
      <SectionHeader />
      <SectionIntroduction toc="introduction" />
      <SectionAbout toc="about" />
      <SectionDataset toc="dataset" />
      <SectionResults toc="results" />
      <SectionSummary toc="summary" />
      <SectionTeam toc="team" />
    </IntlProvider>
  )
}
