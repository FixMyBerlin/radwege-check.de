import React from 'react'
import { FormattedDate, FormattedMessage, IntlProvider } from 'react-intl'
import { Headline } from './components'
import {
  SectionAbout,
  SectionDataset,
  SectionIntroduction,
  SectionResults,
  SectionSummary,
  SectionTeam,
} from './sections'
import { AuswertungTranslations } from './translations'

type Props = {
  lang: AuswertungTranslations
  translationKeys: Record<string, string>
}

export const Auswertung: React.FC<Props> = ({ lang, translationKeys }) => {
  return (
    <IntlProvider locale={lang} messages={translationKeys} defaultLocale="de">
      <p>
        <FormattedMessage id="article.kicker" />
      </p>
      <Headline as="h1">
        <FormattedMessage id="article.title" />
      </Headline>
      <div>
        <FormattedDate value={new Date('2020-06-06')} />{' '}
        <FormattedMessage id="article.attribution" />{' '}
        <strong>
          <FormattedMessage id="article.authors" />
        </strong>
      </div>

      <p>
        <strong>
          <FormattedMessage id="article.introduction" />
        </strong>
      </p>

      <SectionIntroduction />
      <SectionAbout />
      <SectionDataset />
      <SectionResults />
      <SectionSummary />
      <SectionTeam />
    </IntlProvider>
  )
}
