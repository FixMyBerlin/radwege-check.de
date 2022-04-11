import classNames from 'classnames';
import { graphql } from 'gatsby';
import itemsjs from 'itemsjs';
import React, { useEffect, useMemo, useState } from 'react';
import { SceneImage } from '~/components/components/SceneImage';
import { HelmetSeo } from '~/components/Helmet/HelmetSeo';
import { FixedLayout } from '~/components/Layout';
import { TextLink } from '~/components/Links/TextLink';

const MyDataIndex = ({
  data: {
    allScenesCsv: { edges: sceneNodes },
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
        pavementWidth: {
          title: 'pavementWidth',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        pavementHasShows: {
          title: 'pavementHasShows',
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
        todoMotorVehicleDirection: {
          title: 'todoMotorVehicleDirection',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        bicycleStreetType: {
          title: 'bicycleStreetType',
          size: 10,
          sort: 'term',
          order: 'asc',
          conjunction: false,
        },
        motorVehicleWidth: {
          title: 'motorVehicleWidth',
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
    // console.log({ allBucketKeys, prevAndNowSelectedBucketKeys });
    // console.log({
    //   searchOptionFilters,
    //   aggregationKey,
    //   buckets,
    //   selectedBucket,
    // });
    // setSearchOptionFilters((prevState) => {
    // 1. Get allBucketKeys
    // 2. Remove all prevSelectedBucketKeys
    // 3. Remove the currently selected bucketKey
    // The rest is what we want to add as filter
    // const allBucketKeys = buckets.map((bucket) => bucket.key);
    // const allWithoutClicked = allBucketKeys.filter(
    //   (k) => k !== selectedBucket.key
    // );
    // const prevFilter =
    //   aggregationKey in prevState ? prevState[aggregationKey] : [];
    // const allWithoutClickedAndPrev = allWithoutClicked.filter(
    //   (k) => !prevFilter.includes(k)
    // );
    // const prevFilterWithoutClicked = prevFilter.filter(
    //   (k) => k !== selectedBucket.key
    // );
    // const currentlySelectedBucketKeys = buckets
    //   .filter((b) => b.selected)
    //   .map((b) => b.key);
    // const filter = allBucketKeys
    //   .filter((k) => k !== prevFilterWithoutClicked)
    //   .filter((k) => k !== selectedBucket.key);

    // allBucketKeys.filter(k => k!==selectedBucket.key)

    // console.log(
    //   { '1: I clicked': selectedBucket.key },
    //   { '2: Current Filter': prevFilter },
    //   {
    //     '3: Remove clicked from Current': prevFilterWithoutClicked,
    //   },
    //   { '4: Remove clicked from all': allWithoutClicked },
    //   { '5: Remove all prev': allWithoutClickedAndPrev }
    // );

    const bucketHasNothingSelected = !buckets.some((b) => b.selected);
    if (bucketHasNothingSelected) {
      // Activate uiFilter (remove Filter)
      setSearchOptionFilters((prevState) => {
        const allBucketKeys = buckets.map((bucket) => bucket.key);
        const allWithoutClicked = allBucketKeys.filter(
          (k) => k !== selectedBucket.key
        );
        const filter = allWithoutClicked;
        console.log('FIRST', selectedBucket, aggregationKey, prevState, filter);

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
        console.log('IN', selectedBucket, aggregationKey, prevState, filter);

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
        console.log('OUT', selectedBucket, aggregationKey, prevState, filter);

        return { ...prevState, [aggregationKey]: filter };
      });
    }
    // });
    // if (selectedBucket.selected) {
    //   // Remove filter
    //   setSearchOptionFilters((prevState) => {
    //     const filter = prevState[aggregationKey].filter(
    //       (currentKey) => currentKey !== selectedBucket.key
    //     );
    //     return {
    //       ...prevState,
    //       [aggregationKey]: filter,
    //     };
    //   });
    // } else {
    //   // Add filter
    //   setSearchOptionFilters((prevState) => {
    //     const filter =
    //       aggregationKey in prevState
    //         ? [...prevState[aggregationKey], selectedBucket.key]
    //         : [selectedBucket.key];
    //     return {
    //       ...prevState,
    //       [aggregationKey]: filter,
    //     };
    //   });
    // }
  };

  return (
    <FixedLayout>
      <HelmetSeo title="myData" description="TODO" image="TODO" />
      <div className="">
        <nav className="absolute inset-y-0 left-0 w-64 overflow-scroll bg-gray-100 p-4">
          <p className="mb-6">
            <a href="#reset" onClick={resetFilter} className="underline">
              Reset filter
            </a>
          </p>

          {Object.entries(results?.data?.aggregations || {}).map(
            ([aggregationKey, aggregation_]) => {
              const aggregation =
                aggregation_ as ResultProps['data']['aggregations'][0];
              const buckets = aggregation.buckets as ResultBucketProps[];

              // For our uiSelected, aggregations with no selected buckets are shows als "all selected".
              const anyOfGroupSelected = buckets.some((b) => b.selected);

              // Filter some buckets
              if (['vehicleLaneUsage'].includes(aggregationKey)) {
                return null;
              }

              return (
                <div key={aggregationKey} className={classNames('mb-5')}>
                  <h5>
                    <strong>{aggregation.title}</strong>
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
                              'relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium',
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
                            // className={classNames(
                            //   'mb-1 rounded border-neutral-100 px-1 py-0',
                            //   { 'bg-neutral-200 shadow-inner': uiSelected },
                            //   {
                            //     'block w-full hover:bg-neutral-300': uiCanpress,
                            //   },
                            //   {
                            //     'cursor-default text-gray-400': !uiCanpress,
                            //   }
                            // )}
                          >
                            {bucket.key || '(null)'} ({bucket.doc_count})
                            {/* {bucket.selected ? '✓' : '✗'}
                            {uiSelected ? '✓' : '✗'}
                            {anyOfGroupSelected ? '✓' : '✗'} */}
                          </button>
                        );
                      })}
                  </span>
                </div>
              );
            }
          )}
        </nav>

        <div className="absolute top-0 left-64 right-0 h-8 bg-slate-300 px-4 py-1 ">
          <h2 className="flex justify-between font-bold">
            Results {results?.pagination?.total || '-'}{' '}
            <span className="font-normal text-neutral-500">
              {results?.pagination?.per_page} per page, in{' '}
              {results?.timings?.total} ms
            </span>
          </h2>
        </div>
        <section className="absolute top-8 bottom-0 left-64 right-0 overflow-scroll p-4">
          <div className="flex flex-row gap-4">
            {resultItems.map((scene, index) => (
              <div className="flex h-full w-64 flex-col" key={scene.sceneId}>
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
                {Object.keys(scene)
                  .filter(
                    (key) =>
                      ![
                        'path',
                        '_id',
                        'vote0Unsafe',
                        'vote1RatherUnsafe',
                        'vote2Save',
                        'vote3VerySave',
                        'voteSum',
                      ].includes(key)
                  )
                  .map((key) => {
                    const bucketActive = !!searchOptionFilters[key];
                    return (
                      <div
                        key={key}
                        className={classNames('group hover:bg-neutral-100', {
                          'bg-yellow-50 font-bold': bucketActive,
                        })}
                      >
                        <div className="text-xs text-neutral-300 group-hover:text-pink-700">
                          {key}:
                        </div>
                        <div className="group-hover:text-pink-900">
                          {scene[key] || '(null)'}
                        </div>
                      </div>
                    );
                  })}
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
                      {/* {scene.vote0Unsafe} */}
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
                      {/* {scene.vote1RatherUnsafe} */}
                    </div>
                    <div
                      style={{
                        width: `${parseInt(scene.vote2Save as string, 10)}%`,
                      }}
                      className="h-6 bg-blue-300 "
                    >
                      {/* {scene.vote2Save} */}
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
                      {/* {scene.vote3VerySave} */}
                    </div>
                  </div>
                </div>
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
    allScenesCsv {
      edges {
        node {
          location
          pointOfView
          sceneId
          leftOfBicycleLane
          divideLeftWidth
          divideLeftCategory
          divideLeftStructural
          leftOfBicycleLaneWithStructuralDivide
          bicycleLaneWidth
          divideRightWidth
          divideRightCategory
          pavementWidth
          pavementHasShows
          bicycleLaneWidthUsable
          vehicleLaneUsage
          vehicleLaneMaxspeed
          bicycleLaneLanes
          bicycleLaneSurface
          divideLeftMarking
          divideRightMarking
          parkingCategory
          rightOfBicycleLane
          divideIsPhysical
          todoMotorVehicleDirection
          bicycleStreetType
          motorVehicleWidth
          motorVehicleTrafficVolumen
          vote0Unsafe
          vote1RatherUnsafe
          vote2Save
          vote3VerySave
          voteSum
          voteCount
          voteMeans
          path: gatsbyPath(filePath: "/scenes/{scenesCsv.sceneId}")
        }
      }
    }
  }
`;
