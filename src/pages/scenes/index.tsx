import { graphql, PageProps } from 'gatsby';
import itemsjs from 'itemsjs';
import React, { useEffect, useMemo, useState } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import { FixedLayout, MetaTags } from '~/components/Layout';
import { Facets, Results, TitleBar } from '~/components/Scenes';
import { itemJsConfig } from '~/components/Scenes/constants';
import { HandleMultiChoiceProps } from '~/components/Scenes/Facets/ButtonMultiChoice/ButtonMultiChoice';
import { HandleSingleChoiceProps } from '~/components/Scenes/Facets/ButtonSingleChoice/ButtonSingleChoice';
import { ResultProps } from '~/components/Scenes/types';
import { decodeFilter, encodeFilter } from '~/components/Scenes/utils';

const MyDataIndex = ({
  data: {
    allScenesPrimaryCsv: { edges: sceneNodes },
  },
}: PageProps<Queries.Query>) => {
  // Flatten the data by extracting the objects we want from [node: { /* object */ }, node: { /* object */ }, …]
  const scenes = useMemo(
    () =>
      sceneNodes
        .map((list) => list.node)
        .filter((scene) => scene.pointOfView === 'bicycle'),
    [sceneNodes]
  );

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
  const [searchOptionFilters, setSearchOptionFilters] = useQueryParam(
    'filter',
    StringParam
  );

  // ItemsJS Filter the data
  const [results, setResults] = useState<ResultProps>(null);
  useEffect(() => {
    if (!items) return;

    // https://github.com/itemsapi/itemsjs#itemsjssearchoptions
    const searchOption = {
      per_page: 200,
      sort: { field: 'voteScore', order: 'desc' },
      filters: decodeFilter(searchOptionFilters),
    };

    setResults(items.search(searchOption));
  }, [items, searchOptionFilters]);

  const handleResetFilter = () => setSearchOptionFilters(undefined);

  // SingleChoice: Replace the key
  // This will trigger a useEffect to re-search.
  const handleSingleChoice = ({
    aggregationKey,
    selectedBucketKey,
  }: HandleSingleChoiceProps) => {
    setSearchOptionFilters((prevStateString) => {
      const prevState = decodeFilter(prevStateString);
      const filter = selectedBucketKey ? [selectedBucketKey] : [];

      return encodeFilter({ ...prevState, [aggregationKey]: filter });
    });
  };

  // Add remove filter to the searchOptionFilters state.
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
      setSearchOptionFilters((prevStateString) => {
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
      setSearchOptionFilters((prevStateString) => {
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
      setSearchOptionFilters((prevStateString) => {
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

  return (
    <FixedLayout>
      <MetaTags title="Safetycheck Prototyp" description="TODO" image="TODO" />

      <Facets
        results={results}
        handleResetFilter={handleResetFilter}
        handleSingleChoice={handleSingleChoice}
        handleMultiChoice={handleMultiChoice}
      />

      <TitleBar results={results} />

      <Results
        results={results}
        searchOptionFilters={decodeFilter(searchOptionFilters)}
      />
    </FixedLayout>
  );
};

export default MyDataIndex;

export const query = graphql`
  query {
    allScenesPrimaryCsv {
      edges {
        node {
          sceneId
          sceneIdCar
          sceneIdCount
          sceneIdPedestrian

          bicycleLaneSurface
          bicycleLaneUsableWidthNumber
          bicycleLaneWidth
          bicycleLaneWidthNumber
          bufferHasPhysicalProtection
          bufferLeftMarking
          bufferLeftPhysicalProtection
          bufferLeftWidth
          bufferLeftWidthNumber
          bufferRightMarking
          bufferRightWidth
          bufferRightWidthNumber
          leftOfBicycleLane
          location
          parking
          pavementHasShops
          pavementWidth
          pavementWidthNumber
          pointOfView
          vehicleLaneMaxspeed
          vehicleLaneUsage
          vehicleTrafficVolume

          vote0Unsafe
          vote1RatherUnsafe
          vote2Save
          voteCar3VerySave
          vote3VerySave
          voteCount
          voteMeans
          voteScore
          voteCar0Unsafe
          voteCar1RatherUnsafe
          voteCar2Save
          voteCarCount
          voteCarMeans
          voteCarScore
          votePedestrian0Unsafe
          votePedestrian1RatherUnsafe
          votePedestrian2Save
          votePedestrian3VerySave
          votePedestrianCount
          votePedestrianMeans
          votePedestrianScore

          path: gatsbyPath(filePath: "/scenes/{scenesPrimaryCsv.sceneId}")
        }
      }
    }
  }
`;
