import React from 'react'

import logoBildmarkeMarkup from '~/components/assets/radwegecheck-logo-bildmarke.svg?raw'
import { Link } from '~/components/Link'
import { SpinnerOrText } from '~/components/Spinner'
import { SvgInline } from '~/components/Svg/SvgInline'
import { formatPercent } from '~/components/utils'

import { ResultProps } from '../types'
import { SearchOrderDropdown, SearchOrderDropdownProps } from './SearchOrderDropdown'

type Props = {
  results: ResultProps
  mobileFacets?: React.ReactNode
} & SearchOrderDropdownProps

export const TitleBar = ({ results, searchOrder, setSearchOrder, mobileFacets }: Props) => {
  const resultItems = results?.data?.items || []
  const pagination = results?.pagination

  let resultScoreAverage = 0
  if (resultItems.length) {
    const sum = resultItems.reduce((acc, scene) => acc + scene.voteScore, 0)
    resultScoreAverage = Math.round(sum / resultItems.length)
  }

  const total = pagination?.total || 0
  const perPage = pagination?.per_page || 0

  return (
    <section className="z-10 flex h-14 flex-none flex-row items-center justify-between gap-2 bg-brand-light-yellow px-3 py-1 text-lg shadow-[0_0px_10px_0_rgba(0,_0,_0,_0.2)] lg:px-4 lg:text-xl">
      <Link to="/" classNameOverwrite="-ml-0.5 h-8 lg:hidden" title="Zur Startseite…">
        <SvgInline src={logoBildmarkeMarkup} className="h-8 w-8" alt="Radwege-Check" />
      </Link>
      {mobileFacets}
      <h1
        className="relative flex justify-center text-center font-bold leading-none lg:mr-3 lg:justify-start lg:text-left"
        title={total > perPage ? `Die ersten ${perPage} Ergebnisse werden angezeigt.` : ''}
      >
        <SpinnerOrText text={`${Number(total).toLocaleString()} Ergebnisse`} />
      </h1>

      <div className="flex items-center gap-2 lg:gap-3">
        {/* TODO: Find a way to show the average for a given filter-set for > 100 results. */}
        {resultScoreAverage && total <= perPage ? (
          <div className="text-center text-sm leading-4 text-neutral-500 lg:ml-3">
            {' '}
            Ø Score
            <br className="lg:hidden" />{' '}
            {formatPercent(resultScoreAverage, { precision: 0 }) || '-'}
          </div>
        ) : null}

        <SearchOrderDropdown searchOrder={searchOrder} setSearchOrder={setSearchOrder} />
      </div>
    </section>
  )
}
