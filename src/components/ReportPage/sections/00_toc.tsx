import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { TableOfContents, type TocHash, type TocHashLink } from '~/components/TableOfContents'

export function SectionTableOfContents() {
  const intl = useIntl()
  const toc = ['introduction', 'About', 'Dataset', 'Results', 'Summary', 'Team']
  const hash = (hashId: string): TocHash => `#${intl.formatMessage({ id: hashId })}`

  const tocHashLinks: TocHashLink = toc.map((tocItem) => [
    hash(`toc.${tocItem}.hash`),
    <FormattedMessage key={tocItem} id={`toc.${tocItem}`} />,
  ])

  return <TableOfContents items={tocHashLinks} />
}
