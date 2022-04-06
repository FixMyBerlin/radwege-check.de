import classNames from 'classnames';
import { graphql } from 'gatsby';
import itemsjs from 'itemsjs';
import React, { useEffect, useMemo, useState } from 'react';
import { HelmetSeo } from '~/components/Helmet/HelmetSeo';
import { Layout } from '~/components/Layout';
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
        divideLeftWidth: {
          title: 'my divideLeftWidth',
          size: 3,
          conjunction: false,
        },
        pavementWidth: {
          title: 'my pavementWidth',
          size: 3,
          conjunction: false,
        },
        pavementHasShops: {
          title: 'my pavementHasShops',
          size: 3,
          conjunction: false,
        },
        bicycleLaneWidthUsable: {
          title: 'my bicycleLaneWidthUsable',
          size: 3,
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
        per_page: 10,
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
    event: React.React.MouseEvent<HTMLAnchorElement>;
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
    <Layout padding={false}>
      <HelmetSeo title="myData" description="TODO" image="TODO" />
      <div className="mt-32 flex gap-5 bg-white">
        <nav className="bg-gray-100 p-4">
          <p className="mb-6">
            <a href="#reset" onClick={resetFilter} className="underline">
              Reset filter
            </a>
          </p>

          {results?.data?.aggregations &&
            Object.entries(results?.data?.aggregations).map(
              ([aggregationKey, value_]) => {
                const value = value_ as ResultProps['data']['aggregations'][0];
                const buckets = value.buckets as ResultBucketProps[];
                const bucketHasSelected = buckets.some((b) => b.selected);
                console.log({ buckets });

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
                              'block w-full hover:underline '
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

        <section className="p-4">
          <h2 className="mb-6 flex justify-between font-bold">
            Results {results?.pagination?.total || '-'}{' '}
            <span className="font-normal text-neutral-500">
              {results?.pagination?.per_page} per page, in{' '}
              {results?.timings?.total} ms
            </span>
          </h2>
          <table>
            <thead>
              <tr>
                {tableHead.map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resultItems.map((scene) => (
                <tr key={scene.sceneId}>
                  {Object.keys(scene).map((key) => (
                    <td key={key}>{scene[key]}</td>
                  ))}
                  <td>
                    <TextLink to={scene.path}>Details</TextLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </Layout>
  );
};

export default MyDataIndex;

export const query = graphql`
  query {
    allScenesCsv {
      edges {
        node {
          title
          divideLeftWidth
          pavementWidth
          pavementHasShops
          bicycleLaneWidthUsable
          vote1
          vote2
          vote3
          vote4
          voteTotal
          sceneId
          path: gatsbyPath(filePath: "/scenes/{scenesCsv.sceneId}")
        }
      }
    }
  }
`;
