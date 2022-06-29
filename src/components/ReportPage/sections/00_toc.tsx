import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Link } from '~/components/Link'

/*
  We could make this more fancy…
  Here are few good articles.
  - https://blog.openreplay.com/creating-a-table-of-content-widget-in-react
    (and the full code https://codesandbox.io/s/infallible-borg-mqh9df?file=/src/App.tsx:877-963)
    This does not represent highrarcy well, it just intend the second level a bit more.
    Which is OK, since ATM we only have one level.
    Gotcha: The getId method does not work. And a renderToString from react-dom/server does not work with Intl well.
    However, we can just set the ids manually, I guess.
  - https://www.emgoto.com/react-table-of-contents/
    Handles the highrarchy better.
  - https://blog.eyas.sh/2022/03/react-toc/#user-content-fn-1
    Looks OK as well.
  - And then there is the version that is usedin fixmy-frontend.
    Which derives the TOC by iterating over children AFAIK. Which IMO is more complexity than we need;
    he solutions above all just use a querySelector.
*/

export const SectionTableOfContents: React.FC = () => {
  const intl = useIntl()
  const hash = (hashId: string) => `#${intl.formatMessage({ id: hashId })}`
  const toc = ['introduction', 'About', 'Dataset', 'Results', 'Summary', 'Team']

  return (
    <nav
      arial-title="Table of contents"
      className="not-prose absolute top-28 hidden w-40 rounded bg-white py-3 px-4 lg:left-0 lg:block lg:rounded-l-none xl:fixed xl:shadow-lg 2xl:left-8"
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
