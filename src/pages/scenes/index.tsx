import classNames from 'classnames';
import { graphql } from 'gatsby';
import itemsjs from 'itemsjs';
import React, { useEffect, useMemo, useState } from 'react';
import { FixedLayout, MetaTags } from '~/components/Layout';
import { TextLink } from '~/components/Links/TextLink';
import { SceneImage } from '~/components/Scenes';
import { aggregationTranslations } from '../../translations/aggregationTranslations.const';

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

  const configuration = useMemo(() => {
    return {
      sortings: {
        voteScoreDesc: {
          field: 'voteScore',
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
        // pointOfView: {
        //   title: 'pointOfView',
        //   size: 10,
        //   sort: 'term',
        //   order: 'asc',
        //   conjunction: false,
        // },
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
        sort: 'voteScoreDesc',
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

  const [resultItems, setResultItems] = useState([]);
  useEffect(() => setResultItems(results?.data?.items || []), [results]);

  const [resultScoreAverage, setResultScoreAverage] = useState(0);
  useEffect(() => {
    let sum = 0;
    resultItems.forEach((scene) => {
      sum += parseInt(scene.voteScore as string, 10);
    });
    // result.pagination.total wäre die Gesamtanzahl; aber hier würden wir nur die max-200 Ergebnisse für die Berechnung berücksichigen.
    const average = parseInt(`${sum / resultItems.length}`, 10);
    setResultScoreAverage(average);
  }, [resultItems]);

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

  let prevBucketValues = {};

  return (
    <FixedLayout>
      <MetaTags title="Safetycheck Prototyp" description="TODO" image="TODO" />
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
                  <h5 title={aggregationKey} className="font-bold">
                    {aggregationTranslations[aggregationKey]?.title ||
                      `TODO ${aggregationKey}`}
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
          <h2 className="flex justify-between">
            <span>
              <span className=" font-bold">
                Ergebnisse {results?.pagination?.total || '-'}
              </span>
              <span
                className="text-sm text-neutral-500"
                title="Durchschnitt für die sichtbaren Ergebnisse (nicht für die Gesamt-Ergebnismenge)."
              >
                {' '}
                – Durchschnitt Score: {resultScoreAverage || '-'}
              </span>
            </span>

            {results?.pagination?.total > 0 && (
              <span className="text-sm font-normal text-neutral-500">
                Die ersten {results?.pagination?.per_page} Ergebnisse werden
                angezeigt.
              </span>
            )}
          </h2>
        </div>
        <section className="absolute top-8 bottom-0 left-80 right-0 overflow-scroll p-4">
          <div className="flex flex-row gap-4">
            {resultItems.map((scene, index) => (
              <div
                className="flex h-full w-80 flex-col space-y-3"
                key={scene.sceneId}
              >
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
                  <div className="flex h-40 w-full flex-col">
                    <div
                      title={scene.vote0Unsafe}
                      style={{
                        height: `${parseInt(scene.vote0Unsafe as string, 10)}%`,
                        backgroundColor: '#c01d1d',
                      }}
                      className="w-full"
                    >
                      {' '}
                    </div>
                    <div
                      style={{
                        height: `${parseInt(
                          scene.vote1RatherUnsafe as string,
                          10
                        )}%`,
                        backgroundColor: '#f08141',
                      }}
                      className="w-full bg-orange-300"
                    >
                      {' '}
                    </div>
                    <div
                      title={scene.vote2Save}
                      style={{
                        height: `${parseInt(scene.vote2Save as string, 10)}%`,
                        backgroundColor: '#abc759',
                      }}
                      className="w-full"
                    >
                      {' '}
                    </div>
                    <div
                      title={scene.vote3VerySave}
                      style={{
                        height: `${parseInt(
                          scene.vote3VerySave as string,
                          10
                        )}%`,
                        backgroundColor: '#45b834',
                      }}
                      className="w-full"
                    >
                      {' '}
                    </div>
                  </div>
                  <div
                    className="text-center text-2xl font-thin"
                    title="Summe der Bewertungen für Gut und Sehr gut."
                  >
                    <strong>{parseInt(scene.voteScore as string, 10)} %</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>{scene.vote0Unsafe}</span>{' '}
                    <span className="text-neutral-300">–</span>{' '}
                    <span>{scene.vote1RatherUnsafe}</span>{' '}
                    <span className="text-neutral-300">–</span>
                    <span>{scene.vote2Save}</span>{' '}
                    <span className="text-neutral-300">–</span>{' '}
                    <span>{scene.vote3VerySave}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mittelwert: {scene.voteMeans || '–'}</span>
                    <span>Anzahl: {scene.voteCount || '–'}</span>
                  </div>
                </div>
                {Object.keys(scene)
                  .filter(
                    (key) =>
                      ![
                        '_id',
                        'bicycleLaneLanes',
                        'bicycleLaneWidth',
                        'divideLeftWidth',
                        'divideRightWidth',
                        'path',
                        'pavementWidth',
                        'sceneId',
                        'sceneIdCount',
                        'sceneIdPedestrian',
                        'sceneIdVehicle',
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

                    // This allows to indicate which cell changed from the prev Scene
                    const prevBuckeValueChange =
                      key in prevBucketValues
                        ? prevBucketValues[key] !== scene[key]
                        : false;
                    prevBucketValues = {
                      ...prevBucketValues,
                      [key]: scene[key],
                    };

                    return (
                      <div
                        title={key}
                        key={key}
                        className="group relative hover:bg-neutral-100"
                      >
                        <div
                          title={bucketActive ? 'Filter-Gruppe aktiv' : ''}
                          className={classNames(
                            'text-xs group-hover:text-pink-700',
                            { 'text-neutral-300': !bucketActive },
                            { 'font-bold text-neutral-400': bucketActive }
                          )}
                        >
                          {aggregationTranslations[key]?.title || key}:
                        </div>

                        {prevBuckeValueChange && (
                          <div className="absolute -left-3 text-blue-300">
                            〉
                          </div>
                        )}
                        <div className="group-hover:text-pink-900">
                          {aggregationTranslations[key]?.buckets[scene[key]] ||
                            scene[key] || (
                              <span className="text-neutral-300">(todo)</span>
                            )}

                          {key.includes('Name') && (
                            <span className="text-neutral-500">
                              {/* TODO cleanup formatting of number */}{' '}
                              {scene[`${key.replace('Name', '')}`].replace(
                                '.',
                                ','
                              )}{' '}
                              m
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                <div>
                  <div className="text-xs text-neutral-300 group-hover:text-pink-700">
                    Blickwinkel:
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <div>
                      {!!scene.sceneIdPedestrian && (
                        <>
                          Fußgänger:in
                          <SceneImage
                            sceneId={scene.sceneIdPedestrian}
                            alt="Illustration der bewerteten Szene aus Blickwinkel einer Fußgänger:in"
                            className="w-full rounded"
                          />
                        </>
                      )}
                    </div>
                    <div>
                      {!!scene.sceneIdVehicle && (
                        <>
                          Autofahrer:in
                          <SceneImage
                            sceneId={scene.sceneIdVehicle}
                            alt="Illustration der bewerteten Szene aus Blickwinkel einer Autofahrer:in"
                            className="w-full rounded"
                          />
                        </>
                      )}
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
          sceneIdBicycle
          sceneIdCount
          sceneIdPedestrian
          sceneIdVehicle
          vehicleLaneMaxspeed
          vehicleLaneUsage
          vote0Unsafe
          vote1RatherUnsafe
          vote2Save
          vote3VerySave
          voteCount
          voteMeans
          voteScore
          voteSum
          path: gatsbyPath(filePath: "/scenes/{scenesPrimaryCsv.sceneId}")
        }
      }
    }
  }
`;
