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
    () => sceneNodes.map((list) => list.node),
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
        location: { title: 'location', size: 10, conjuction: false },
        pointOfView: { title: 'pointOfView', size: 10, conjuction: false },
        leftOfBicycleLane: {
          title: 'leftOfBicycleLane',
          size: 10,
          conjuction: false,
        },
        divideLeftWidth: {
          title: 'divideLeftWidth',
          size: 10,
          conjuction: false,
        },
        divideLeftCategory: {
          title: 'divideLeftCategory',
          size: 10,
          conjuction: false,
        },
        divideLeftStructural: {
          title: 'divideLeftStructural',
          size: 10,
          conjuction: false,
        },
        leftOfBicycleLaneWithStructuralDivide: {
          title: 'leftOfBicycleLaneWithStructuralDivide',
          size: 10,
          conjuction: false,
        },
        bicycleLaneWidth: {
          title: 'bicycleLaneWidth',
          size: 10,
          conjuction: false,
        },
        divideRightWidth: {
          title: 'divideRightWidth',
          size: 10,
          conjuction: false,
        },
        divideRightCategory: {
          title: 'divideRightCategory',
          size: 10,
          conjuction: false,
        },
        pavementWidth: { title: 'pavementWidth', size: 10, conjuction: false },
        pavementHasShows: {
          title: 'pavementHasShows',
          size: 10,
          conjuction: false,
        },
        bicycleLaneWidthUsable: {
          title: 'bicycleLaneWidthUsable',
          size: 10,
          conjuction: false,
        },
        vehicleLaneUsage: {
          title: 'vehicleLaneUsage',
          size: 10,
          conjuction: false,
        },
        vehicleLaneMaxspeed: {
          title: 'vehicleLaneMaxspeed',
          size: 10,
          conjuction: false,
        },
        bicycleLaneLanes: {
          title: 'bicycleLaneLanes',
          size: 10,
          conjuction: false,
        },
        bicycleLaneSurface: {
          title: 'bicycleLaneSurface',
          size: 10,
          conjuction: false,
        },
        divideLeftMarking: {
          title: 'divideLeftMarking',
          size: 10,
          conjuction: false,
        },
        divideRightMarking: {
          title: 'divideRightMarking',
          size: 10,
          conjuction: false,
        },
        parkingCategory: {
          title: 'parkingCategory',
          size: 10,
          conjuction: false,
        },
        rightOfBicycleLane: {
          title: 'rightOfBicycleLane',
          size: 10,
          conjuction: false,
        },
        divideIsPhysical: {
          title: 'divideIsPhysical',
          size: 10,
          conjuction: false,
        },
        todoMotorVehicleDirection: {
          title: 'todoMotorVehicleDirection',
          size: 10,
          conjuction: false,
        },
        bicycleStreetType: {
          title: 'bicycleStreetType',
          size: 10,
          conjuction: false,
        },
        motorVehicleWidth: {
          title: 'motorVehicleWidth',
          size: 10,
          conjuction: false,
        },
        motorVehicleTrafficVolumen: {
          title: 'motorVehicleTrafficVolumen',
          size: 10,
          conjuction: false,
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
        per_page: 1000,
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

  console.table(resultItems);
  console.table(results?.pagination);
  console.table(results?.timings);

  const tableHead = useMemo(
    () => (scenes[0] ? Object.keys(scenes[0]) : []),
    [scenes]
  );

  const resetFilter = () => {
    setSearchOption((prevState) => ({ ...prevState, filters: {} }));
  };

  // Add remove filter to the searchOptionFilters state.
  // This will trigger a useEffect to re-search.
  const handleFilterClick = ({
    event,
    aggregationKey,
    bucket,
  }: {
    event: React.MouseEvent<HTMLAnchorElement>;
    aggregationKey: string;
    bucket: ResultBucketProps;
  }) => {
    event.preventDefault();
    if (bucket.selected) {
      // Remove filter
      setSearchOptionFilters((prevState) => {
        const filter = prevState[aggregationKey].filter(
          (currentKey) => currentKey !== bucket.key
        );
        return {
          ...prevState,
          [aggregationKey]: filter,
        };
      });
    } else {
      // Add filter
      setSearchOptionFilters((prevState) => {
        const filter =
          aggregationKey in prevState
            ? [...prevState[aggregationKey], bucket.key]
            : [bucket.key];
        return {
          ...prevState,
          [aggregationKey]: filter,
        };
      });
    }
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
            ([aggregationKey, value_]) => {
              const value = value_ as ResultProps['data']['aggregations'][0];
              const buckets = value.buckets as ResultBucketProps[];
              const bucketHasSelected = buckets.some((b) => b.selected);
              // console.log({ buckets });

              return (
                <div
                  key={aggregationKey}
                  className={classNames(
                    {
                      'bg-yellow-50': bucketHasSelected,
                    },
                    'mb-5'
                  )}
                >
                  <h5>
                    <strong>{value.title}</strong>
                  </h5>

                  <ul>
                    {buckets.map((bucket) => (
                      <li key={bucket.key}>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a
                          href=""
                          onClick={(event) =>
                            handleFilterClick({
                              event,
                              aggregationKey,
                              bucket,
                            })
                          }
                          className={classNames(
                            { 'bg-yellow-200': bucket.selected },
                            {
                              'block w-full hover:underline': bucket.doc_count,
                            },
                            {
                              'cursor-default text-gray-400': !bucket.doc_count,
                            }
                          )}
                        >
                          {bucket.key || '(null)'} ({bucket.doc_count})
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
          )}
        </nav>

        <section className="absolute inset-y-0 left-64 right-0 overflow-scroll p-4">
          <h2 className="mb-6 flex justify-between font-bold">
            Results {results?.pagination?.total || '-'}{' '}
            <span className="font-normal text-neutral-500">
              {results?.pagination?.per_page} per page, in{' '}
              {results?.timings?.total} ms
            </span>
          </h2>
          <table className="prose">
            <thead>
              <tr>
                <th> </th>
                <th>Image</th>
                {tableHead
                  .filter((key) => !['path', '_id'].includes(key))
                  .map((key) => {
                    const bucketActive = !!searchOptionFilters[key];
                    return (
                      <th
                        key={key}
                        className={classNames({
                          'bg-yellow-200': bucketActive,
                        })}
                      >
                        {key}
                      </th>
                    );
                  })}
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {resultItems.map((scene, index) => (
                <tr key={scene.sceneId}>
                  <td>{index + 1}</td>
                  <td className="p-0 align-middle">
                    {/* todo types */}
                    <SceneImage
                      sceneId={scene.sceneId as string}
                      className="my-0"
                    />
                  </td>
                  {Object.keys(scene)
                    .filter((key) => !['path', '_id'].includes(key))
                    .map((key) => (
                      <td key={key}>{scene[key]}</td>
                    ))}
                  <td>
                    {/* todo types */}
                    <TextLink to={scene.path as string}>Details</TextLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
