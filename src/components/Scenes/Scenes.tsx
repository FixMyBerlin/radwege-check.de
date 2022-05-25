import itemsjs from 'itemsjs';
import React, { useEffect, useMemo, useState } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import { MetaTags } from '../Layout';
import { itemJsConfig } from './constants';
import { Presets } from './constants/presets.const';
import { Results } from './Results';
import {
  Facets,
  HandleMultiChoiceProps,
  HandleSingleChoiceProps,
} from './Facets';
import { FacetsMobileDropdown } from './Facets/FacetsMobileDropdown';
import { TitleBar } from './TitleBar';
import { ResultProps } from './types';
import { cleanupCsvData, decodeFilter, encodeFilter } from './utils';

type Props = {
  rawScenes: any;
  presets: Presets;
  /** @desc https://<domain>/pathname without searchParams */
  pageUrl: string;
};

export const Scenes: React.FC<Props> = ({ rawScenes, presets, pageUrl }) => {
  const scenes = useMemo(() => {
    // Flatten the data by extracting the objects we want from [node: { /* object */ }, node: { /* object */ }, …]
    const flattened = rawScenes.map((list) => list.node);
    // Clean the data
    return cleanupCsvData(flattened);
  }, [rawScenes]);

  // Init itemjs with the set configuration and data (scenes).
  const [items, setItems] = useState(undefined);
  useEffect(() => {
    if (!itemJsConfig) return;
    setItems(itemsjs(scenes, itemJsConfig));
  }, [scenes, itemJsConfig]);

  // The filters that we use for setSearchOption.
  // They are update them by handleSingelChoice(), handleMultiChoice().
  // The state is stored and handled by useQueryParam() inside the page URL.
  // We use custom encode/decode to have a nice looking URL.
  //   We tried a custom paramConfig (instead of StringParam) but that caused loops.
  // ~~We do not use this inside the UI, which is based on the results object only.~~
  //   TBD: We do now, but we should maybe remove it again… – TODO
  const [searchFilters, setSearchFilters] = useQueryParam(
    'filter',
    StringParam
  );

  const [searchOrder, setSearchOrder] = useQueryParam('order', StringParam);

  // ItemsJS Filter the data
  const [results, setResults] = useState<ResultProps>(null);
  useEffect(() => {
    if (!items) return;

    // We don't add a default order to the useQueryParam so the url param is gone by default.
    const order = searchOrder || 'desc';

    // https://github.com/itemsapi/itemsjs#itemsjssearchoptions
    const searchOption = {
      per_page: 200,
      sort: { field: 'voteScore', order },
      filters: decodeFilter(searchFilters),
    };

    setResults(items.search(searchOption));
  }, [items, searchFilters]);

  const [currentPresetKey, setCurrentPresetKey] = useState(null);

  // When selecting a preset, we update the search.
  // The currentPresetKey is updated in an useEffect.
  // This way, we also handle the case when the page is loaded with searchFilters that match a preset.searchFilterString.
  const handlePresetClick = (presetKey: string) => {
    console.log({
      presets,
      a: presetKey,
      string: presets[presetKey].searchFilterString,
    });
    setSearchFilters(presets[presetKey].searchFilterString);
  };

  useEffect(() => {
    if (!searchFilters) {
      setCurrentPresetKey(null);
      return;
    }

    const presetKeyMatchingUrlFilters = Object.entries(presets)
      .map(([key, values]) =>
        values.searchFilterString === searchFilters ? key : undefined
      )
      .filter((v) => v !== undefined);

    if (presetKeyMatchingUrlFilters.length) {
      setCurrentPresetKey(presetKeyMatchingUrlFilters[0]);
    } else {
      setCurrentPresetKey('custom');
    }
  }, [presets, searchFilters]);

  const handleResetFilter = () => {
    setSearchFilters(undefined);
    setSearchOrder(undefined);
  };

  // SingleChoice: Replace the key
  // This will trigger a useEffect to re-search.
  const handleSingleChoice = ({
    aggregationKey,
    selectedBucketKey,
  }: HandleSingleChoiceProps) => {
    setSearchFilters((prevStateString) => {
      const prevState = decodeFilter(prevStateString);
      const filter = selectedBucketKey ? [selectedBucketKey] : [];

      return encodeFilter({ ...prevState, [aggregationKey]: filter });
    });
  };

  // Add remove filter to the searchFilters state.
  // This will trigger a useEffect to re-search.
  const handleMultiChoice = ({
    aggregationKey,
    buckets,
    selectedBucket,
  }: HandleMultiChoiceProps) => {
    const bucketHasNothingSelected = !buckets.some((b) => b.selected);
    if (bucketHasNothingSelected) {
      // Activate uiFilter (remove Filter)
      // Selecting the first bucket in an aggregation will not return bucket.selected for some reason.
      // To work around this, we handle the first  manually.
      setSearchFilters((prevStateString) => {
        const prevState = decodeFilter(prevStateString);
        const allBucketKeys = buckets.map((bucket) => bucket.key);
        const allWithouted = allBucketKeys.filter(
          (k) => k !== selectedBucket.key
        );
        const filter = allWithouted;

        return encodeFilter({ ...prevState, [aggregationKey]: filter });
      });
    } else if (selectedBucket.selected) {
      // Activate uiFilter (remove Filter)
      setSearchFilters((prevStateString) => {
        const prevState = decodeFilter(prevStateString);
        const prevFilter =
          aggregationKey in prevState
            ? [...prevState[aggregationKey], selectedBucket.key]
            : [selectedBucket.key];
        const filter = prevFilter.filter((k) => k !== selectedBucket.key);

        return encodeFilter({ ...prevState, [aggregationKey]: filter });
      });
    } else {
      // Deactivate uiFilter (add Filter)
      setSearchFilters((prevStateString) => {
        const prevState = decodeFilter(prevStateString);
        const prevFilter =
          aggregationKey in prevState
            ? [...prevState[aggregationKey], selectedBucket.key]
            : [selectedBucket.key];
        const filter = prevFilter;

        return encodeFilter({ ...prevState, [aggregationKey]: filter });
      });
    }
  };

  const seoNoindex = currentPresetKey === 'custom';
  const seoCanonicalUrl = seoNoindex ? pageUrl : null;

  return (
    <>
      <MetaTags
        noindex={seoNoindex}
        canonicalUrl={seoCanonicalUrl}
        title="Safetycheck Prototyp"
        description="TODO"
        image="TODO"
      />
      <div className="flex h-screen flex-row">
        <Facets
          className="z-20 hidden w-72 flex-none overflow-scroll overscroll-contain bg-gray-100 shadow-[0_0_10px_0_rgba(0,_0,_0,_0.2)] lg:block"
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
            results={results}
            searchFilters={decodeFilter(searchFilters)}
          />
        </div>
      </div>
    </>
  );
};
