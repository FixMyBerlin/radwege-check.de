import React, { useEffect, useState } from 'react'
import LogoIcon from '~/components/assets/radwegecheck-logo-bildmarke.svg'
import { Link, TwitterButtonIconCurrentUrl } from '~/components/Link'
import { SpinnerOrText } from '~/components/Spinner'
import { formatPercent } from '~/components/utils'
import { ResultProps } from '../types'
import {
  SearchOrderDropdown,
  SearchOrderDropdownProps,
} from './SearchOrderDropdown'

type Props = {
  results: ResultProps
  mobileFacets?: React.ReactNode
} & SearchOrderDropdownProps

export const TitleBar: React.FC<Props> = ({
  results,
  searchOrder,
  setSearchOrder,
  mobileFacets,
}) => {
  const resultItems = results?.data?.items || []
  const pagination = results?.pagination

  const [resultScoreAverage, setResultScoreAverage] = useState(0)
  useEffect(() => {
    let sum = 0
    resultItems.forEach((scene) => {
      sum += scene.voteScore
    })
    // result.pagination.total wäre die Gesamtanzahl; aber hier würden wir nur die max-100 Ergebnisse für die Berechnung berücksichigen.
    const average = Math.round(sum / resultItems.length)
    setResultScoreAverage(average)
  }, [resultItems])

  const total = pagination?.total || 0
  const perPage = pagination?.per_page || 0

  return (
    <section className="z-10 flex h-14 flex-none flex-row items-center justify-between gap-2 bg-brand-light-yellow px-3 py-1 text-lg shadow-[0_0px_10px_0_rgba(0,_0,_0,_0.2)] lg:px-4 lg:text-xl">
      <Link
        to="/"
        classNameOverwrite="-ml-0.5 h-8 lg:hidden"
        title="Zur Startseite…"
      >
        <LogoIcon className="h-8 w-8" alt="Radwege-Check" />
      </Link>

      {mobileFacets}

      <h1
        className="relative flex justify-center text-center font-bold leading-none lg:justify-start lg:text-left"
        title={
          total > perPage
            ? `Die ersten ${perPage} Ergebnisse werden angezeigt.`
            : ''
        }
      >
        <SpinnerOrText text={`${Number(total).toLocaleString()} Ergebnisse`} />
      </h1>

      <div className="flex items-center gap-2 lg:gap-5">
        {/* TODO: Find a way to show the average for a given filter-set for > 100 results. */}
        {resultScoreAverage && total <= perPage ? (
          <div className="text-center text-sm leading-4 text-neutral-500 lg:ml-3">
            {' '}
            Ø Score
            <br className="lg:hidden" />{' '}
            {formatPercent(resultScoreAverage, { precision: 0 }) || '-'}
          </div>
        ) : null}

        <TwitterButtonIconCurrentUrl className="hidden lg:flex" />

        <SearchOrderDropdown
          searchOrder={searchOrder}
          setSearchOrder={setSearchOrder}
        />
      </div>
    </section>
  )
}
