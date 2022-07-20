import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import {
  TableOfContents,
  TocHash,
  TocHashLink,
} from '~/components/TableOfContents'

export const SectionTableOfContents: React.FC = () => {
  const intl = useIntl()
  const toc = ['introduction', 'About', 'Dataset', 'Results', 'Summary', 'Team']
  const hash = (hashId: string): TocHash =>
    `#${intl.formatMessage({ id: hashId })}`

  const tocHashLinks: TocHashLink = toc.map((tocItem) => [
    hash(`toc.${tocItem}.hash`),
    <FormattedMessage id={`toc.${tocItem}`} />,
  ])

  return <TableOfContents items={tocHashLinks} />
}
