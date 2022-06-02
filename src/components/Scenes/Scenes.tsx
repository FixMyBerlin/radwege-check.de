import itemsjs from 'itemsjs'
import React, { useEffect, useMemo, useState } from 'react'
import { StringParam, useQueryParam } from 'use-query-params'
import { MetaTags } from '../Layout'
import {
  itemJsConfigPrimary,
  itemJsConfigSecondary,
  PresetsScenes,
} from './constants'
import {
  Facets,
  HandleMultiChoiceProps,
  HandleSingleChoiceProps,
} from './Facets'
import { FacetsMobileDropdown } from './Facets/FacetsMobileDropdown'
import { useAggregationConfig } from './hooks'
import { Results } from './Results'
import { sceneImageUrl } from './SceneImage'
import { TitleBar } from './TitleBar'
import { ResultProps, SceneCategory } from './types'
import { cleanupCsvData, decodeFilter, encodeFilter } from './utils'

type Props = {
  category: SceneCategory
  rawScenes: any
  presets: PresetsScenes
  /** @desc https://<domain>/pathname without searchParams */
  pagePath: string
}

export const Scenes: React.FC<Props> = ({
  category,
  rawScenes,
  presets,
  pagePath,
}) => {
  const scenes = useMemo(() => {
    // Flatten the data by extracting the objects we want from [node: { /* object */ }, node: { /* object */ }, …]
    const flattened = rawScenes.map((list) => list.node)
    // Clean the data
    return cleanupCsvData(flattened)
  }, [rawScenes])

  const itemJsConfig =
    category === 'primary' ? itemJsConfigPrimary : itemJsConfigSecondary
  const aggregationConfig = useAggregationConfig(category)

  // Init itemjs with the set configuration and data (scenes).
  const [items, setItems] = useState(undefined)
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
      per_page: 200,
      sort: { field: 'voteScore', order },
      filters: decodeFilterWithAggregation(searchFilters),
    }

    setResults(items.search(searchOption))
  }, [items, searchFilters])

  const [currentPresetKey, setCurrentPresetKey] = useState(null)

  // When selecting a preset, we update the search.
  // The currentPresetKey is updated in an useEffect.
  // This way, we also handle the case when the page is loaded with searchFilters that match a preset.searchFilterString.
  const handlePresetClick = (presetKey: string) => {
    console.log({
      presets,
      a: presetKey,
      string: presets[presetKey].searchFilterString,
    })
    setSearchFilters(presets[presetKey].searchFilterString)
  }

  useEffect(() => {
    if (!searchFilters) {
      setCurrentPresetKey(null)
      return
    }

    const presetKeyMatchingUrlFilters = Object.entries(presets)
      .map(([key, values]) =>
        values.searchFilterString === searchFilters ? key : undefined
      )
      .filter((v) => v !== undefined)

    if (presetKeyMatchingUrlFilters.length) {
      setCurrentPresetKey(presetKeyMatchingUrlFilters[0])
    } else {
      setCurrentPresetKey('custom')
    }
  }, [presets, searchFilters])

  const handleResetFilter = () => {
    setSearchFilters(undefined)
    setSearchOrder(undefined)
  }

  // SingleChoice: Replace the key
  // This will trigger a useEffect to re-search.
  const handleSingleChoice = ({
    aggregationKey,
    selectedBucketKey,
  }: HandleSingleChoiceProps) => {
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

  const seoPresetIsActive = Object.keys(presets).includes(currentPresetKey)
  const seoCategoryTranslation =
    category === 'primary' ? 'Hauptstrasse' : 'Nebenstrasse'

  return (
    <>
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

      <div className="flex h-screen flex-row">
        <Facets
          category={category}
          className="z-20 hidden w-72 flex-none bg-gray-100 shadow-[0_0_10px_0_rgba(0,_0,_0,_0.2)] lg:block"
          results={results}
          handleResetFilter={searchFilters && handleResetFilter}
          handleSingleChoice={handleSingleChoice}
          handleMultiChoice={handleMultiChoice}
          presets={presets}
          currentPresetKey={currentPresetKey}
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
                category={category}
                results={results}
                handleResetFilter={searchFilters && handleResetFilter}
                handleSingleChoice={handleSingleChoice}
                handleMultiChoice={handleMultiChoice}
                presets={presets}
                currentPresetKey={currentPresetKey}
                handlePresetClick={handlePresetClick}
              />
            }
          />

          <Results
            category={category}
            results={results}
            searchFilters={decodeFilterWithAggregation(searchFilters)}
          />
        </div>
      </div>
    </>
  )
}
