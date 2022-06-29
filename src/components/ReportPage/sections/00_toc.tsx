import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Link } from '~/components/Link'

export const SectionTableOfContents: React.FC = () => {
  const intl = useIntl()
  const hash = (hashId: string) => `#${intl.formatMessage({ id: hashId })}`
  const toc = ['introduction', 'About', 'Dataset', 'Results', 'Summary', 'Team']

  return (
    <nav
      arial-title="Table of contents"
      className="not-prose fixed left-8 top-32 w-40 rounded bg-white py-3 px-4 shadow-lg"
    >
      <ul>
        {toc.map((tocItem) => (
          <li>
            <Link
              to={hash(`toc.${tocItem}.hash`)}
              className="block w-full py-1.5 leading-5"
            >
              <FormattedMessage id={`toc.${tocItem}`} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
