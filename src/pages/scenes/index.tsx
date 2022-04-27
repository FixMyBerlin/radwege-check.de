import classNames from 'classnames';
import { graphql } from 'gatsby';
import itemsjs from 'itemsjs';
import React, { useEffect, useMemo, useState } from 'react';
import { FixedLayout, MetaTags } from '~/components/Layout';
import { TextLink } from '~/components/Links/TextLink';
import {
  Facets,
  handleFilterClickProps,
  SceneImage,
  TitleBar,
} from '~/components/Scenes';
import {
  aggregationTranslations,
  configuration,
} from '~/components/Scenes/constants';
import { ResultProps } from '~/components/Scenes/types';

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
  }: handleFilterClickProps) => {
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
        <Facets
          results={results}
          handleResetFilter={resetFilter}
          handleFilterClick={handleFilterClick}
        />

        <TitleBar
          pagination={results?.pagination}
          resultScoreAverage={resultScoreAverage}
        />

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
                        'sceneIdCar',
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
                      {!!scene.sceneIdCar && (
                        <>
                          Autofahrer:in
                          <SceneImage
                            sceneId={scene.sceneIdCar}
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
          bicycleLaneSurface
          bicycleLaneWidth
          bicycleLaneWidthName
          bicycleLaneWidthUsable
          bufferLeft
          bufferLeftMarking
          bufferLeftWidth
          bufferProtectedPhysically
          bufferRight
          bufferRightMarking
          bufferRightWidth
          divideLeftStructural
          leftOfBicycleLane
          location
          motorVehicleTrafficVolumen
          parking
          pavementHasShops
          pavementWidth
          pavementWidthName
          pointOfView
          sceneId
          sceneIdCount
          sceneIdPedestrian
          sceneIdCar
          sceneNumber
          surroundings
          vehicleLaneMaxspeed
          vehicleLaneUsage

          vote0Unsafe
          vote1RatherUnsafe
          vote2Save
          vote3VerySave
          voteCount
          voteMeans
          voteScore
          voteScorePedestrian
          voteScoreCar
          voteSum

          path: gatsbyPath(filePath: "/scenes/{scenesPrimaryCsv.sceneId}")
        }
      }
    }
  }
`;
