import itemsjs from 'itemsjs'
import { parseAsString, useQueryState } from 'nuqs'
import React, { useLayoutEffect } from 'react'

import { DocumentMetaSync } from '~/components/seo/DocumentMetaSync'
import { canonicalOrigin } from '~/components/utils/domain/canonicalOrigin.const'
import { consumeBookmarksHandoff } from '~/lib/navigation-handoff'
import type { SiteLocation } from '~/lib/site-location'

import { trackEvent } from '../utils'
import { BookmarkCollector } from './BookmarkCollector'
import { Facets, HandleMultiChoiceProps, HandleSingleChoiceProps } from './Facets'
import { FacetsMobileDropdown } from './Facets/FacetsMobileDropdown'
import { useSetPresetKey } from './hooks'
import { Results } from './Results'
import {
  useBookmarkActions,
  useExperimentAggregationConfig,
  useExperimentItemJsConfig,
  useExperimentTextKeyState,
  useSpinnerActions,
} from './store'
import { TitleBar } from './TitleBar'
import { ResultProps } from './types'
import { cleanupCsvData, decodeFilter, encodeFilter } from './utils'

type Props = {
  rawScenes: { node: Record<string, unknown> }[] | Record<string, unknown>[]
  location: SiteLocation
}

export const ScenesPage = ({ rawScenes, location: _location }: Props) => {
  useLayoutEffect(() => {
    const prev = document.body.getAttribute('class') ?? ''
    document.body.setAttribute('class', 'fixed overflow-hidden w-full min-h-full flex')
    return () => {
      if (prev) {
        document.body.setAttribute('class', prev)
      } else {
        document.body.removeAttribute('class')
      }
    }
  }, [])

  const flattened = rawScenes.map((row: any) =>
    row && typeof row === 'object' && 'node' in row ? row.node : row,
  )
  const scenes = cleanupCsvData(flattened)

  const itemJsConfig = useExperimentItemJsConfig()
  const aggregationConfig = useExperimentAggregationConfig()
  const experimentTextKey = useExperimentTextKeyState()
  const { setShowSpinner } = useSpinnerActions()

  const items = itemJsConfig ? itemsjs(scenes, itemJsConfig) : null

  const [searchFilters, setSearchFilters] = useQueryState('filter', parseAsString)
  const [searchOrder, setSearchOrder] = useQueryState('order', parseAsString)

  const decodeFilterWithAggregation = (filterString: string | null | undefined) =>
    decodeFilter(filterString ?? '', aggregationConfig)

  const results: ResultProps = items
    ? items.search({
        per_page: 100,
        sort: { field: 'voteScore', order: searchOrder || 'desc' },
        filters: decodeFilterWithAggregation(searchFilters),
      })
    : null

  useLayoutEffect(() => {
    if (results) setShowSpinner(false)
  }, [results, setShowSpinner])

  const { presets, currentPresetKey } = useSetPresetKey(searchFilters)

  const { setBookmarks } = useBookmarkActions()
  useLayoutEffect(() => {
    const handoff = consumeBookmarksHandoff()
    if (handoff?.length) setBookmarks(handoff)
  }, [setBookmarks])

  const handlePresetClick = (presetKey: string) => {
    setShowSpinner(true)
    void setSearchFilters(presets[presetKey].searchFilterString)
  }

  const handleResetFilter = () => {
    setShowSpinner(true)
    void setSearchFilters(null)
    void setSearchOrder(null)
    trackEvent({
      category: `[${experimentTextKey}] Facets`,
      action: 'Reset filter',
    })
  }

  const handleSingleChoice = ({ aggregationKey, selectedBucketKey }: HandleSingleChoiceProps) => {
    setShowSpinner(true)
    trackEvent({
      category: `[${experimentTextKey}] Facets`,
      action: `${aggregationKey}: ${selectedBucketKey}`,
    })
    void setSearchFilters((prevStateString) => {
      const prevState = decodeFilterWithAggregation(prevStateString)
      const filter = selectedBucketKey ? [selectedBucketKey] : []
      return encodeFilter({ ...prevState, [aggregationKey]: filter })
    })
  }

  const handleMultiChoice = ({
    aggregationKey,
    buckets,
    selectedBucket,
  }: HandleMultiChoiceProps) => {
    setShowSpinner(true)
    trackEvent({
      category: `[${experimentTextKey}] Facets`,
      action: `${aggregationKey}: ${selectedBucket.key}`,
    })
    const bucketHasNothingSelected = !buckets.some((b) => b.selected)
    if (bucketHasNothingSelected) {
      void setSearchFilters((prevStateString) => {
        const prevState = decodeFilterWithAggregation(prevStateString)
        const allBucketKeys = buckets.map((bucket) => bucket.key)
        const allWithouted = allBucketKeys.filter((k) => k !== selectedBucket.key)
        const filter = allWithouted
        return encodeFilter({ ...prevState, [aggregationKey]: filter })
      })
    } else if (selectedBucket.selected) {
      void setSearchFilters((prevStateString) => {
        const prevState = decodeFilterWithAggregation(prevStateString)
        const prevFilter =
          aggregationKey in prevState
            ? [...prevState[aggregationKey], selectedBucket.key]
            : [selectedBucket.key]
        const filter = prevFilter.filter((k) => k !== selectedBucket.key)
        return encodeFilter({ ...prevState, [aggregationKey]: filter })
      })
    } else {
      void setSearchFilters((prevStateString) => {
        const prevState = decodeFilterWithAggregation(prevStateString)
        const prevFilter =
          aggregationKey in prevState
            ? [...prevState[aggregationKey], selectedBucket.key]
            : [selectedBucket.key]
        const filter = prevFilter
        return encodeFilter({ ...prevState, [aggregationKey]: filter })
      })
    }
  }

  const resetFilterEnabled = Boolean(searchFilters)
  const seoPresetIsActive = Object.keys(presets).includes(currentPresetKey)
  const seoCategoryTranslation = experimentTextKey === 'primary' ? 'Hauptstrasse' : 'Nebenstrasse'

  return (
    <>
      <DocumentMetaSync
        title={
          seoPresetIsActive
            ? `Radwege-Check: ${presets[currentPresetKey].title} (${seoCategoryTranslation})`
            : `Radwege-Check ${seoCategoryTranslation} – Alle Varianten filtern`
        }
        noindex={!seoPresetIsActive}
        imageUrl={
          seoPresetIsActive
            ? `${canonicalOrigin}/social-sharing/default.jpg`
            : `${canonicalOrigin}/social-sharing/results.jpg`
        }
      />

      <div className="flex h-screen min-h-full w-full flex-row overflow-hidden">
        <Facets
          className="z-20 hidden w-72 flex-none bg-gray-100 shadow-[0_0_10px_0_rgba(0,_0,_0,_0.2)] lg:block"
          results={results}
          handleResetFilter={handleResetFilter}
          handleSingleChoice={handleSingleChoice}
          handleMultiChoice={handleMultiChoice}
          handlePresetClick={handlePresetClick}
          showLogo
          resetFilterEnabled={resetFilterEnabled}
        />

        <div className="flex w-1 grow flex-col">
          <TitleBar
            results={results}
            searchOrder={searchOrder}
            setSearchOrder={setSearchOrder}
            mobileFacets={
              <FacetsMobileDropdown
                results={results}
                handleResetFilter={handleResetFilter}
                handleSingleChoice={handleSingleChoice}
                handleMultiChoice={handleMultiChoice}
                handlePresetClick={handlePresetClick}
                resetFilterEnabled={resetFilterEnabled}
              />
            }
          />

          <Results results={results} searchFilters={decodeFilterWithAggregation(searchFilters)} />
        </div>
      </div>
      <BookmarkCollector />
    </>
  )
}
