import React from 'react'
import { IntlProvider } from 'react-intl'

import de from '~/components/ReportPage/translations/de.json'

import type { FeelSafeProps } from './IntlWrappedFeelSafe'
import { IntlWrappedFeelSafe } from './IntlWrappedFeelSafe'

type Props = FeelSafeProps & {
  /** @desc Will instanciate a new IntlProvider wrapper with locale=['de] */
  standalone?: boolean
}

export const FeelSafe = ({ standalone = false, value, big, icon = 'bike' }: Props) => {
  if (standalone) {
    return (
      <IntlProvider locale="de" messages={de}>
        <IntlWrappedFeelSafe value={value} big={big} icon={icon} />
      </IntlProvider>
    )
  }

  return <IntlWrappedFeelSafe value={value} big={big} icon={icon} />
}
