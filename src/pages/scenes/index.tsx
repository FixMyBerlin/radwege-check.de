import { graphql } from 'gatsby';
import itemsjs from 'itemsjs';
import React, { useEffect, useMemo, useState } from 'react';
import { FixedLayout, MetaTags } from '~/components/Layout';
import { Facets, Results, TitleBar } from '~/components/Scenes';
import { itemJsConfig } from '~/components/Scenes/constants';
import { HandleMultiChoiceProps } from '~/components/Scenes/Facets/ButtonMultiChoice';
import { HandleSingleChoiceProps } from '~/components/Scenes/Facets/ButtonSingleChoice';
import { ResultProps, SearchOptionProps } from '~/components/Scenes/types';

const MyDataIndex = ({
  data: {
    allScenesPrimaryCsv: { edges: sceneNodes },
  },
}) => {
  // Flatten the data by extracting the objects we want from [node: { /* object */ }, node: { /* object */ }, …]
  const scenes = useMemo(
    () =>
      sceneNodes
        .map((list) => list.node)
        .filter((scene) => scene.location !== 'secondary_road')
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
  // They are manage by handleFilterChange().
  // ~~We do not use this inside the UI, which is based on the results object only.~~
  //  We do now, but we should maybe remove it again… – TODO
  const [searchOptionFilters, setSearchOptionFilters] =
    useState<SearchOptionProps>({});

  // Specify the filters, on component mount for now
  // https://github.com/itemsapi/itemsjs#itemsjssearchoptions
  const [searchOption, setSearchOption] = useState(undefined);
  useEffect(
    () =>
      setSearchOption({
        per_page: 200,
        sort: {
          field: 'voteScore',
          order: 'desc',
        },
        filters: searchOptionFilters,
      }),
    [searchOptionFilters]
  );

  // Filter the data
  const [results, setResults] = useState<ResultProps>(null);
  useEffect(() => {
    if (!searchOption) return;
    setResults(items.search(searchOption));
  }, [items, searchOption]);

  const handleResetFilter = () => {
    setSearchOptionFilters(() => ({}));
  };

  // SingleChoice: Replace the key
  // This will trigger a useEffect to re-search.
  const handleSingleChoice = ({
    aggregationKey,
    selectedBucketKey,
  }: HandleSingleChoiceProps) => {
    setSearchOptionFilters((prevState) => {
      const filter = selectedBucketKey ? [selectedBucketKey] : [];
      console.log({
        log: 'handleSingleChoice',
        aggregationKey,
        prevState,
        filter,
        selectedBucketKey,
      });

      return {
        ...prevState,
        [aggregationKey]: filter,
      };
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
      setSearchOptionFilters((prevState) => {
        const allBucketKeys = buckets.map((bucket) => bucket.key);
        const allWithouted = allBucketKeys.filter(
          (k) => k !== selectedBucket.key
        );
        const filter = allWithouted;
        console.log({
          log: 'handleMultiChoice FIRST',
          selectedBucket,
          aggregationKey,
          prevState,
          filter,
        });

        return { ...prevState, [aggregationKey]: filter };
      });
    } else if (selectedBucket.selected) {
      // Activate uiFilter (remove Filter)
      setSearchOptionFilters((prevState) => {
        const prevFilter =
          aggregationKey in prevState
            ? [...prevState[aggregationKey], selectedBucket.key]
            : [selectedBucket.key];
        const filter = prevFilter.filter((k) => k !== selectedBucket.key);
        console.log({
          log: 'handleMultiChoice IN',
          selectedBucket,
          aggregationKey,
          prevState,
          filter,
        });

        return { ...prevState, [aggregationKey]: filter };
      });
    } else {
      // Deactivate uiFilter (add Filter)
      setSearchOptionFilters((prevState) => {
        const prevFilter =
          aggregationKey in prevState
            ? [...prevState[aggregationKey], selectedBucket.key]
            : [selectedBucket.key];
        const filter = prevFilter;
        console.log({
          log: 'handleMultiChoice OUT',
          selectedBucket,
          aggregationKey,
          prevState,
          filter,
        });

        return { ...prevState, [aggregationKey]: filter };
      });
    }
  };

  return (
    <FixedLayout>
      <MetaTags title="Safetycheck Prototyp" description="TODO" image="TODO" />
      <div className="">
        <Facets
          results={results}
          handleResetFilter={handleResetFilter}
          handleSingleChoice={handleSingleChoice}
          handleMultiChoice={handleMultiChoice}
        />

        <TitleBar results={results} />

        <Results results={results} searchOptionFilters={searchOptionFilters} />
      </div>
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
          surroundings
          vehicleLaneMaxspeed
          vehicleLaneUsage
          vehicleTrafficVolume

          vote0Unsafe
          vote1RatherUnsafe
          vote2Save
          vote3VerySave
          voteCount
          voteMeans
          voteScore
          voteScoreCar
          voteScorePedestrian

          path: gatsbyPath(filePath: "/scenes/{scenesPrimaryCsv.sceneId}")
        }
      }
    }
  }
`;
