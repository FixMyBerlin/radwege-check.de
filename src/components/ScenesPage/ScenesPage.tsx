import { PageProps } from 'gatsby'
import itemsjs from 'itemsjs'
import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { StringParam, useQueryParam } from 'use-query-params'
import { useStore } from 'zustand'
import { MetaTags } from '../Layout'
import { trackEvent } from '../utils'
import { BookmarkCollector } from './BookmarkCollector'
import {
  Facets,
  HandleMultiChoiceProps,
  HandleSingleChoiceProps,
} from './Facets'
import { FacetsMobileDropdown } from './Facets/FacetsMobileDropdown'
import { useSetPresetKey } from './hooks'
import { Results } from './Results'
import {
  useStoreBookmarks,
  useStoreExperimentData,
  useStoreSpinner,
} from './store'
import { useStoreResetFilterEnabled } from './store/useStoreResetFilterEnabled'
import { TitleBar } from './TitleBar'
import { ResultProps } from './types'
import { cleanupCsvData, decodeFilter, encodeFilter } from './utils'

type Props = {
  rawScenes: any
  location: PageProps<
    unknown,
    unknown,
    { bookmarksArray: string[] }
  >['location']
}

export const ScenesPage: React.FC<Props> = ({ rawScenes, location }) => {
  const scenes = useMemo(() => {
    // Flatten the data by extracting the objects we want from [node: { /* object */ }, node: { /* object */ }, …]
    const flattened = rawScenes.map((list) => list.node)
    // Clean the data
    return cleanupCsvData(flattened)
  }, [rawScenes])

  const { itemJsConfig, aggregationConfig, experimentTextKey } = useStore(
    useStoreExperimentData
  )
  const { setShowSpinner } = useStore(useStoreSpinner)
  const { setResetFilterEnabled } = useStore(useStoreResetFilterEnabled)

  // Init itemjs with the set configuration and data (scenes).
  const [items, setItems] = useState(null)
  useEffect(() => {
    if (!itemJsConfig) return
    setItems(itemsjs(scenes, itemJsConfig))
  }, [scenes, itemJsConfig])

  // The filters that we use for setSearchOption.
  // They are update them by handleSingelChoice(), handleMultiChoice().
  // The state is stored and handled by useQueryParam() inside the page URL.
  // We use custom encode/decode to have a nice looking URL.
  //   We tried a custom paramConfig (instead of StringParam) but that caused loops.
  // ~~We do not use this inside the UI, which is based on the results object only.~~
  //   TBD: We do now, but we should maybe remove it again… – TODO
  const [searchFilters, setSearchFilters] = useQueryParam('filter', StringParam)

  const [searchOrder, setSearchOrder] = useQueryParam('order', StringParam)

  const decodeFilterWithAggregation = (filterString: string) =>
    decodeFilter(filterString, aggregationConfig)

  // ItemsJS Filter the data
  const [results, setResults] = useState<ResultProps>(null)
  useEffect(() => {
    if (!items) return

    // We don't add a default order to the useQueryParam so the url param is gone by default.
    const order = searchOrder || 'desc'

    // https://github.com/itemsapi/itemsjs#itemsjssearchoptions
    const searchOption = {
      per_page: 100,
      sort: { field: 'voteScore', order },
      filters: decodeFilterWithAggregation(searchFilters),
    }

    if (searchFilters) {
      setResetFilterEnabled(true)
    }
    setResults(items.search(searchOption))
    setShowSpinner(false)
  }, [items, searchFilters])

  const { presets, currentPresetKey } = useSetPresetKey(searchFilters)

  /*
    === DATA: Click handler ===
  */

  // When selecting a preset, we update the search.
  // The currentPresetKey is updated in an useEffect.
  // This way, we also handle the case when the page is loaded with searchFilters that match a preset.searchFilterString.
  const handlePresetClick = (presetKey: string) => {
    setShowSpinner(true)
    setSearchFilters(presets[presetKey].searchFilterString)
  }

  const handleResetFilter = () => {
    setShowSpinner(true)
    setResetFilterEnabled(false)
    setSearchFilters(undefined)
    setSearchOrder(undefined)
    trackEvent({
      category: `[${experimentTextKey}] Facets`,
      action: 'Reset filter',
    })
  }

  // SingleChoice: Replace the key
  // This will trigger a useEffect to re-search.
  const handleSingleChoice = ({
    aggregationKey,
    selectedBucketKey,
  }: HandleSingleChoiceProps) => {
    setShowSpinner(true)
    trackEvent({
      category: `[${experimentTextKey}] Facets`,
      action: `${aggregationKey}: ${selectedBucketKey}`,
    })
    setSearchFilters((prevStateString) => {
      const prevState = decodeFilterWithAggregation(prevStateString)
      const filter = selectedBucketKey ? [selectedBucketKey] : []

      return encodeFilter({ ...prevState, [aggregationKey]: filter })
    })
  }

  // Add remove filter to the searchFilters state.
  // This will trigger a useEffect to re-search.
  const handleMultiChoice = ({
    aggregationKey,
    buckets,
    selectedBucket,
  }: HandleMultiChoiceProps) => {
    setShowSpinner(true)
    trackEvent({
      category: `${experimentTextKey} Facets`,
      action: `${aggregationKey}: ${selectedBucket.key}`,
    })
    const bucketHasNothingSelected = !buckets.some((b) => b.selected)
    if (bucketHasNothingSelected) {
      // Activate uiFilter (remove Filter)
      // Selecting the first bucket in an aggregation will not return bucket.selected for some reason.
      // To work around this, we handle the first  manually.
      setSearchFilters((prevStateString) => {
        const prevState = decodeFilterWithAggregation(prevStateString)
        const allBucketKeys = buckets.map((bucket) => bucket.key)
        const allWithouted = allBucketKeys.filter(
          (k) => k !== selectedBucket.key
        )
        const filter = allWithouted

        return encodeFilter({ ...prevState, [aggregationKey]: filter })
      })
    } else if (selectedBucket.selected) {
      // Activate uiFilter (remove Filter)
      setSearchFilters((prevStateString) => {
        const prevState = decodeFilterWithAggregation(prevStateString)
        const prevFilter =
          aggregationKey in prevState
            ? [...prevState[aggregationKey], selectedBucket.key]
            : [selectedBucket.key]
        const filter = prevFilter.filter((k) => k !== selectedBucket.key)

        return encodeFilter({ ...prevState, [aggregationKey]: filter })
      })
    } else {
      // Deactivate uiFilter (add Filter)
      setSearchFilters((prevStateString) => {
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

  // Bookmarks: The group-headline link in /vergleichen/index set a reach router state.
  // We use this state to re-create the 'zustand' state in case no state exists, yet.
  // UseCase: User opened the vergleichen-Page from an external URL.
  const { bookmarks, setBookmarks } = useStore(useStoreBookmarks)
  useEffect(() => {
    const bookmarksFromLocationStore = location?.state?.bookmarksArray
    if (bookmarks && bookmarksFromLocationStore) {
      setBookmarks(bookmarksFromLocationStore)
    }
  }, [location])

  /*
    === RENDERING ===
  */

  const seoPresetIsActive = Object.keys(presets).includes(currentPresetKey)
  const seoCategoryTranslation =
    experimentTextKey === 'primary' ? 'Hauptstrasse' : 'Nebenstrasse'

  return (
    <>
      {/* This is needed for iOS */}
      <Helmet
        bodyAttributes={{
          class: 'fixed overflow-hidden w-full min-h-full flex',
        }}
      />
      <MetaTags
        noindex={!seoPresetIsActive}
        title={
          seoPresetIsActive
            ? `Radwege-Check: ${presets[currentPresetKey].title} (${seoCategoryTranslation})`
            : `Radwege-Check ${seoCategoryTranslation} – Alle Varianten filtern`
        }
        imagePath={!seoPresetIsActive && '/social-sharing/results.jpg'}
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
        />

        {/* The `w-1 + grow` combo is required to get the with + overflow scroll right. */}
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
              />
            }
          />

          <Results
            results={results}
            searchFilters={decodeFilterWithAggregation(searchFilters)}
          />
        </div>
      </div>
      <BookmarkCollector />
    </>
  )
}
