import { graphql } from 'gatsby';
import itemsjs from 'itemsjs';
import { parse, stringify } from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';
import { FixedLayout, MetaTags } from '~/components/Layout';
import { Facets, Results, TitleBar } from '~/components/Scenes';
import { itemJsConfig } from '~/components/Scenes/constants';
import { HandleMultiChoiceProps } from '~/components/Scenes/Facets/ButtonMultiChoice/ButtonMultiChoice';
import { HandleSingleChoiceProps } from '~/components/Scenes/Facets/ButtonSingleChoice/ButtonSingleChoice';
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
  // They are update them by handleSingelChoice(), handleMultiChoice().
  // The state is stored and handle by useQueryParam() inside the page URL.
  // We use custom encode/decode to have a nice looking URL.
  //   We tried a custom paramConfig (instead of StringParam) but that caused loops.
  // ~~We do not use this inside the UI, which is based on the results object only.~~
  //   TBD: We do now, but we should maybe remove it again… – TODO
  const [searchOptionFilters, setSearchOptionFilters] = useQueryParam(
    'filter',
    StringParam
  );

  const encodeFilter = (filterObject: SearchOptionProps['filters']): string => {
    // Testing:
    // $ node
    // > const queryString = require('query-string');
    // // Part 1: Use the given function
    // > queryString.stringify({ foo: ['bar', 'baz'], bar: ['baz'], bar2: null }, { arrayFormat: 'comma', skipNull: true, skipEmptyString: true, strict: false });
    // # => ('bar=baz&foo=bar,baz');
    // // Part 1: Cleanup the string by replacing '=' and '&'
    // // We do this since we hold the whole object in one param "filter"
    // // and want a nice looking URL (no escaping) as well.
    // > queryString.stringify({ foo: ['bar', 'baz'], bar: ['baz'], bar2: null }, { arrayFormat: 'comma', skipNull: true, skipEmptyString: true, strict: false }).replace(/=/g, ':').replace(/&/g, '|');
    // # => ('bar:baz|foo:bar,baz');
    const string = stringify(filterObject, {
      arrayFormat: 'separator',
      arrayFormatSeparator: ',',
      skipNull: true,
      skipEmptyString: true,
    })
      .replace(/=/g, ':')
      .replace(/&/g, '|');
    return string;
  };

  const decodeFilter = (filterString: string): SearchOptionProps['filters'] => {
    if (filterString === undefined) return {};

    const preparedString = filterString.replace(/:/g, '=').replace(/\|/g, '&');
    const parsedString = parse(preparedString, {
      arrayFormat: 'separator',
      arrayFormatSeparator: ',',
    });
    // For some reason, with this stringify->parse transformation we loose the array format for singleChoise values
    // which breaks the search. So here we check if the values is a string and wrap it in an array.
    const finalString = Object.fromEntries(
      Object.keys(parsedString).map((key) => [
        key,
        typeof parsedString[key] === 'string'
          ? [parsedString[key]]
          : parsedString[key],
      ])
    );
    return finalString as SearchOptionProps['filters'];
  };

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
    console.warn(searchOption);

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
      console.log({
        log: 'handleSingleChoice',
        aggregationKey,
        prevState,
        prevStateString,
        filter,
        selectedBucketKey,
      });

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
        console.log({
          log: 'handleMultiChoice FIRST',
          selectedBucket,
          aggregationKey,
          prevState,
          filter,
        });

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
        console.log({
          log: 'handleMultiChoice IN',
          selectedBucket,
          aggregationKey,
          prevState,
          filter,
        });

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
        console.log({
          log: 'handleMultiChoice OUT',
          selectedBucket,
          aggregationKey,
          prevState,
          filter,
        });

        return encodeFilter({ ...prevState, [aggregationKey]: filter });
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

        <Results
          results={results}
          searchOptionFilters={decodeFilter(searchOptionFilters)}
        />
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
