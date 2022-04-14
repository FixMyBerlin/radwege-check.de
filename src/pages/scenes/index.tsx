import classNames from 'classnames';
import { graphql } from 'gatsby';
import itemsjs from 'itemsjs';
import React, { useEffect, useMemo, useState } from 'react';
import { SceneImage } from '~/components/components/SceneImage';
import { HelmetSeo } from '~/components/Helmet/HelmetSeo';
import { FixedLayout } from '~/components/Layout';
import { TextLink } from '~/components/Links/TextLink';
import { aggregationTranslations } from './aggregationTranslations.const';

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
        .filter((scene) => scene.location !== 'secondary_road'),
    [sceneNodes]
  );

  const configuration = useMemo(() => {
    return {
      sortings: {
        vote4desc: {
          field: 'vote4',
          order: 'desc',
        },
      },
      aggregations: {
        location: {
          title: 'location',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: true,
        },
        pointOfView: {
          title: 'pointOfView',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        leftOfBicycleLane: {
          title: 'leftOfBicycleLane',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        divideLeftWidthName: {
          title: 'divideLeftWidthName',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        divideLeftWidth: {
          title: 'divideLeftWidth',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        divideLeftCategory: {
          title: 'divideLeftCategory',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        divideLeftStructural: {
          title: 'divideLeftStructural',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        leftOfBicycleLaneWithStructuralDivide: {
          title: 'leftOfBicycleLaneWithStructuralDivide',
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        bicycleLaneWidthName: {
          title: 'bicycleLaneWidthName',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        bicycleLaneWidth: {
          title: 'bicycleLaneWidth',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        divideRightWidthName: {
          title: 'divideRightWidthName',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        divideRightWidth: {
          title: 'divideRightWidth',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        divideRightCategory: {
          title: 'divideRightCategory',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        pavementWidthName: {
          title: 'pavementWidthName',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        pavementWidth: {
          title: 'pavementWidth',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        pavementHasShops: {
          title: 'pavementHasShops',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        bicycleLaneWidthUsable: {
          title: 'bicycleLaneWidthUsable',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        vehicleLaneUsage: {
          title: 'vehicleLaneUsage',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        vehicleLaneMaxspeed: {
          title: 'vehicleLaneMaxspeed',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        bicycleLaneLanes: {
          title: 'bicycleLaneLanes',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        bicycleLaneSurface: {
          title: 'bicycleLaneSurface',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        divideLeftMarking: {
          title: 'divideLeftMarking',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        divideRightMarking: {
          title: 'divideRightMarking',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        parkingCategory: {
          title: 'parkingCategory',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        rightOfBicycleLane: {
          title: 'rightOfBicycleLane',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        divideIsPhysical: {
          title: 'divideIsPhysical',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        motorVehicleTrafficVolumen: {
          title: 'motorVehicleTrafficVolumen',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
      },
      searchableFields: [],
      native_search_enabled: false,
    };
  }, []);

  // Init itemjs with the set configuration and data (scenes).
  const [items, setItems] = useState(undefined);
  useEffect(() => {
    console.log({ configuration });
    if (!configuration) return;
    setItems(itemsjs(scenes, configuration));
  }, [scenes, configuration]);

  // The filters that we use for setSearchOption.
  // They are manage by handleFilterChange().
  // We do not use this inside the UI, which is based on the results object only.
  const [searchOptionFilters, setSearchOptionFilters] = useState({});

  // Specify the filters, on component mount for now
  // https://github.com/itemsapi/itemsjs#itemsjssearchoptions
  const [searchOption, setSearchOption] = useState(undefined);
  useEffect(
    () =>
      setSearchOption({
        per_page: 200,
        sort: 'vote4desc',
        filters: searchOptionFilters,
      }),
    [searchOptionFilters]
  );

  // Filter the data
  type ResultBucketProps = {
    key: string;
    doc_count: string;
    selected: boolean;
  };
  type ResultProps = {
    data: {
      aggregations: {
        [key: string]: {
          title: string;
          size: number;
          buckets: Array<ResultBucketProps>;
        };
      };
      allFilteredItems: null;
      items: Array<{ [key: string]: number | string }>;
    };
    pagination: {
      page: number;
      per_page: number;
      total: number;
    };
    timings: {
      facets: number;
      search: number;
      sorting: number;
      total: number;
    };
  };
  const [results, setResults] = useState<ResultProps>(null);
  useEffect(() => {
    if (!searchOption) return;
    console.log({ searchOption });
    setResults(items.search(searchOption));
  }, [items, searchOption]);

  const resultItems = results?.data?.items || [];

  // console.table(resultItems);
  // console.table(results?.pagination);
  // console.table(results?.timings);

  const resetFilter = () => {
    setSearchOptionFilters(() => ({}));
  };

  // Add remove filter to the searchOptionFilters state.
  // This will trigger a useEffect to re-search.
  const handleFilterClick = ({
    aggregationKey,
    buckets,
    selectedBucket,
  }: {
    aggregationKey: string;
    buckets: ResultBucketProps[];
    selectedBucket: ResultBucketProps;
  }) => {
    const bucketHasNothingSelected = !buckets.some((b) => b.selected);
    if (bucketHasNothingSelected) {
      // Activate uiFilter (remove Filter)
      // Selecting the first bucket in an aggregation will not return bucket.selected for some reason.
      // To work around this, we handle the first click manually.
      setSearchOptionFilters((prevState) => {
        const allBucketKeys = buckets.map((bucket) => bucket.key);
        const allWithoutClicked = allBucketKeys.filter(
          (k) => k !== selectedBucket.key
        );
        const filter = allWithoutClicked;
        console.log({
          log: 'FIRST',
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
          log: 'IN',
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
          log: 'OUT',
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
      <HelmetSeo title="myData" description="TODO" image="TODO" />
      <div className="">
        <nav className="absolute inset-y-0 left-0 w-80 overflow-scroll bg-gray-100 p-4">
          <p className="mb-6">
            <a href="#reset" onClick={resetFilter} className="underline">
              Reset filter
            </a>
          </p>

          {Object.entries(results?.data?.aggregations || {}).map(
            ([aggregationKey, aggregation]) => {
              const { buckets } = aggregation;

              // For our uiSelected, aggregations with no selected buckets are shows als "all selected".
              const anyOfGroupSelected = buckets.some((b) => b.selected);

              // Filter some buckets
              if (
                [
                  'vehicleLaneUsage',
                  'bicycleLaneWidth',
                  'divideLeftWidth',
                  'divideLeftWidthName',
                  'divideRightWidth',
                  'leftOfBicycleLaneWithStructuralDivide',
                  'pavementWidth',
                ].includes(aggregationKey)
              ) {
                return null;
              }

              return (
                <div key={aggregationKey} className={classNames('mb-5')}>
                  <h5>
                    <strong>
                      {aggregationTranslations[aggregationKey]?.title ||
                        `TODO ${aggregationKey}`}
                    </strong>
                  </h5>

                  <span className="relative z-0 inline-flex rounded-md shadow-sm">
                    {buckets
                      .sort((a, b) =>
                        // eslint-disable-next-line no-nested-ternary
                        a.key > b.key ? 1 : b.key > a.key ? -1 : 0
                      )
                      .map((bucket, index) => {
                        const uiSelected =
                          bucket.selected || !anyOfGroupSelected;
                        const uiCanpress = !!bucket.doc_count;
                        const firstElement = index === 0;
                        const lastElement = index === buckets.length - 1;

                        return (
                          <button
                            key={bucket.key}
                            type="button"
                            className={classNames(
                              'relative inline-flex flex-col items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium',
                              { 'rounded-l-md': firstElement },
                              { '-ml-px': !firstElement },
                              { 'rounded-r-md': lastElement },
                              {
                                'z-10 border-indigo-200 bg-indigo-50 shadow-inner':
                                  uiSelected,
                              },
                              {
                                'shadow-md': !uiSelected,
                              },
                              {
                                'text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500':
                                  uiCanpress,
                              },
                              {
                                'z-10 cursor-default border-neutral-200 bg-neutral-100 text-neutral-500':
                                  !uiCanpress,
                              }
                            )}
                            onClick={() =>
                              uiCanpress &&
                              handleFilterClick({
                                aggregationKey,
                                buckets: aggregation.buckets,
                                selectedBucket: bucket,
                              })
                            }
                          >
                            {aggregationTranslations[aggregationKey].buckets[
                              bucket.key
                            ] ||
                              bucket.key ||
                              '(todo)'}{' '}
                            <small className="text-xs text-neutral-400">
                              {uiSelected
                                ? (results?.pagination?.total || 0) -
                                  parseInt(bucket.doc_count, 10)
                                : '-'}
                            </small>
                          </button>
                        );
                      })}
                  </span>
                </div>
              );
            }
          )}
        </nav>

        <div className="absolute top-0 left-80 right-0 h-8 bg-slate-300 px-4 py-1 ">
          <h2 className="flex justify-between font-bold">
            Results {results?.pagination?.total || '-'}{' '}
            <span className="font-normal text-neutral-500">
              {results?.pagination?.per_page} per page, in{' '}
              {results?.timings?.total} ms
            </span>
          </h2>
        </div>
        <section className="absolute top-8 bottom-0 left-80 right-0 overflow-scroll p-4">
          <div className="flex flex-row gap-4">
            {resultItems.map((scene, index) => (
              <div className="flex h-full w-80 flex-col" key={scene.sceneId}>
                <div className="flex justify-between">
                  <div>{index + 1}</div>
                  <div>
                    {/* todo types */}
                    <TextLink to={scene.path as string}>Details</TextLink>
                  </div>
                </div>
                <div className="p-0 align-middle">
                  {/* todo types */}
                  <SceneImage
                    sceneId={scene.sceneId as string}
                    className="h-40 object-cover"
                  />
                </div>

                <div className="text-xs">
                  <strong>
                    Bewertung Gut+SehrGut:{' '}
                    {parseInt(scene.vote2Save as string, 10) +
                      parseInt(scene.vote3VerySave as string, 10)}
                  </strong>
                  <div className="flex w-full flex-row ">
                    <div
                      style={{
                        width: `${parseInt(scene.vote0Unsafe as string, 10)}%`,
                      }}
                      className="h-6 bg-red-300 "
                    >
                      {' '}
                    </div>
                    <div
                      style={{
                        width: `${parseInt(
                          scene.vote1RatherUnsafe as string,
                          10
                        )}%`,
                      }}
                      className="h-6 bg-orange-300 "
                    >
                      {' '}
                    </div>
                    <div
                      style={{
                        width: `${parseInt(scene.vote2Save as string, 10)}%`,
                      }}
                      className="h-6 bg-blue-300 "
                    >
                      {' '}
                    </div>
                    <div
                      style={{
                        width: `${parseInt(
                          scene.vote3VerySave as string,
                          10
                        )}%`,
                      }}
                      className="h-6 bg-green-300 "
                    >
                      {' '}
                    </div>
                  </div>
                  <div>
                    {scene.vote0Unsafe} – {scene.vote1RatherUnsafe} –{' '}
                    {scene.vote2Save} – {scene.vote3VerySave}
                  </div>
                </div>
                {Object.keys(scene)
                  .filter(
                    (key) =>
                      ![
                        '_id',
                        'path',
                        'vote0Unsafe',
                        'vote1RatherUnsafe',
                        'vote2Save',
                        'vote3VerySave',
                        'voteCount',
                        'voteMeans',
                        'voteSum',
                      ].includes(key)
                  )
                  .map((key) => {
                    const bucketActive = !!searchOptionFilters[key];

                    return (
                      <div
                        title={key}
                        key={key}
                        className={classNames('group hover:bg-neutral-100', {
                          'bg-yellow-50 font-bold': bucketActive,
                        })}
                      >
                        <div className="text-xs text-neutral-300 group-hover:text-pink-700">
                          {aggregationTranslations[key]?.title || key}:
                        </div>
                        <div className="group-hover:text-pink-900">
                          {aggregationTranslations[key]?.buckets[
                            scene[key]
                          ] || <span className="text-neutral-300">(todo)</span>}
                        </div>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </section>
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
          bicycleLaneLanes
          bicycleLaneSurface
          bicycleLaneWidth
          bicycleLaneWidthName
          bicycleLaneWidthUsable
          divideIsPhysical
          divideLeftCategory
          divideLeftMarking
          divideLeftStructural
          divideLeftWidth
          divideLeftWidthName
          divideRightCategory
          divideRightMarking
          divideRightWidth
          divideRightWidthName
          leftOfBicycleLane
          leftOfBicycleLaneWithStructuralDivide
          location
          motorVehicleTrafficVolumen
          parkingCategory
          pavementHasShops
          pavementWidth
          pavementWidthName
          pointOfView
          rightOfBicycleLane
          sceneId
          vehicleLaneMaxspeed
          vehicleLaneUsage
          vote0Unsafe
          vote1RatherUnsafe
          vote2Save
          vote3VerySave
          voteCount
          voteMeans
          voteSum
          path: gatsbyPath(filePath: "/scenes/{scenesPrimaryCsv.sceneId}")
        }
      }
    }
  }
`;
