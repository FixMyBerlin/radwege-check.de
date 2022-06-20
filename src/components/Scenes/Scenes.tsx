import itemsjs from 'itemsjs'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { StringParam, useQueryParam } from 'use-query-params'
import { useStore } from 'zustand'
import { MetaTags } from '../Layout'
import {
  Facets,
  HandleMultiChoiceProps,
  HandleSingleChoiceProps,
} from './Facets'
import { FacetsMobileDropdown } from './Facets/FacetsMobileDropdown'
import { useSetPresetKey } from './hooks'
import { Results } from './Results'
import { sceneImageUrl } from './SceneImage'
import { useStoreExperimentData, useStoreSpinner } from './store'
import { TitleBar } from './TitleBar'
import { ResultProps } from './types'
import {
  cleanupCsvData,
  CommaArrayParam,
  decodeFilter,
  encodeFilter,
} from './utils'

type Props = {
  rawScenes: any
  /** @desc https://<domain>/pathname without searchParams */
  pagePath: string
}

export const Scenes: React.FC<Props> = ({ rawScenes, pagePath }) => {
  const scenes = useMemo(() => {
    // Flatten the data by extracting the objects we want from [node: { /* object */ }, node: { /* object */ }, …]
    const flattened = rawScenes.map((list) => list.node)
    // Clean the data
    return cleanupCsvData(flattened)
  }, [rawScenes])

  const { itemJsConfig, aggregationConfig, experimentTextKey } = useStore(
    useStoreExperimentData
  )
  const { showSpinner, setShowSpinner } = useStore(useStoreSpinner)

  // Init itemjs with the set configuration and data (scenes).
  const [items, setItems] = useState(undefined)
  useEffect(() => {
    if (!itemJsConfig) return
    setItems(itemsjs(scenes, itemJsConfig))
    console.log('this rerenders when I select/deselect a bookmark; why?')
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
      per_page: 200,
      sort: { field: 'voteScore', order },
      filters: decodeFilterWithAggregation(searchFilters),
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
    setSearchFilters(undefined)
    setSearchOrder(undefined)
  }

  // SingleChoice: Replace the key
  // This will trigger a useEffect to re-search.
  const handleSingleChoice = ({
    aggregationKey,
    selectedBucketKey,
  }: HandleSingleChoiceProps) => {
    setShowSpinner(true)
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

  /*
    === BOOKMARKS ===
  */

  const [bookmarkArray, setBookmarkArray] = useQueryParam(
    'bookmarks',
    CommaArrayParam
  )
  // const [showBookmarks, setShowBookmarks] = useState(false)

  const handleBookmark = useCallback(
    (sceneId: string) => {
      const bookmarks = bookmarkArray || []
      const isBookmarked = bookmarkArray?.includes(sceneId)
      if (isBookmarked) {
        // remove
        const bookmarksWithoutPassedSceneId = bookmarks
          ?.filter((b) => b !== sceneId)
          .sort((a, b) => a.localeCompare(b))
        if (bookmarksWithoutPassedSceneId.length === 0) {
          // remove key from url
          setBookmarkArray(undefined, 'replaceIn')
        } else {
          // remove value from list in url
          setBookmarkArray(bookmarksWithoutPassedSceneId, 'replaceIn')
        }
        // setShowBookmarks(false)
      } else {
        // add
        setBookmarkArray(
          [...bookmarks, sceneId].sort((a, b) => a.localeCompare(b)),
          'replaceIn'
        )
      }
    },
    [bookmarkArray, setBookmarkArray]
  )

  const bookmarkResults = useMemo(
    () =>
      (bookmarkArray || [])
        .map((sceneId) => scenes.find((s) => s.sceneId === sceneId))
        .filter(Boolean),
    [bookmarkArray, scenes]
  )

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
        canonicalPath={seoPresetIsActive ? pagePath : null}
        title={
          seoPresetIsActive
            ? `Radwege-Check: ${presets[currentPresetKey].title} (${seoCategoryTranslation})`
            : `Radwege-Check ${seoCategoryTranslation} – Alle Varianten filtern`
        }
        imageUrl={
          !seoPresetIsActive &&
          sceneImageUrl(results?.data?.items?.[0]?.sceneId)
        }
      />

      <div className="flex h-screen min-h-full w-full flex-row overflow-hidden">
        <Facets
          className="z-20 hidden w-72 flex-none bg-gray-100 shadow-[0_0_10px_0_rgba(0,_0,_0,_0.2)] lg:block"
          results={results}
          handleResetFilter={searchFilters && handleResetFilter}
          handleSingleChoice={handleSingleChoice}
          handleMultiChoice={handleMultiChoice}
          handlePresetClick={handlePresetClick}
          showLogo
          showSpinner={showSpinner}
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
                handleResetFilter={searchFilters && handleResetFilter}
                handleSingleChoice={handleSingleChoice}
                handleMultiChoice={handleMultiChoice}
                handlePresetClick={handlePresetClick}
                showSpinner={showSpinner}
              />
            }
          />

          <Results
            results={results}
            bookmarkResults={bookmarkResults}
            searchFilters={decodeFilterWithAggregation(searchFilters)}
            handleBookmark={handleBookmark}
            bookmarks={bookmarkArray}
          />
        </div>
      </div>
    </>
  )
}
