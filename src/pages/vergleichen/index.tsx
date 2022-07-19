import { ArrowLeftIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { graphql, navigate } from 'gatsby'
import React, { useMemo } from 'react'
import { useQueryParam } from 'use-query-params'
import { LayoutArticle, MetaTags } from '~/components/Layout'
import {
  buttonStyles,
  Link,
  PrintButton,
  TwitterButton,
} from '~/components/Link'
import {
  aggregationConfigPrimary,
  aggregationConfigSecondary,
} from '~/components/ScenesPage/constants'
import { ResultColumn } from '~/components/ScenesPage/Results/ResultColumn'
import { cleanupCsvData, CommaArrayParam } from '~/components/ScenesPage/utils'

const MyDataIndex = ({
  location,
  data: {
    allScenesPrimaryCsv: { edges: rawScenesPrimary },
    allScenesSecondaryCsv: { edges: rawScenesSecondary },
  },
}) => {
  // Cleanup GraphQL
  const scenesPrimary = useMemo(() => {
    const flattened = rawScenesPrimary.map((list) => list.node)
    return cleanupCsvData(flattened)
  }, [rawScenesPrimary])
  const scenesSecondary = useMemo(() => {
    const flattened = rawScenesSecondary.map((list) => list.node)
    return cleanupCsvData(flattened)
  }, [rawScenesSecondary])

  // Read and parse URL param `?sceneIds=<comma-separated-list>`
  const [boomarksArray] = useQueryParam('sceneIds', CommaArrayParam)

  // Filter scenes by URL param
  const bookmarkScenesPrimary = scenesPrimary.filter((s) =>
    boomarksArray?.includes(s.sceneId)
  )
  const bookmarkScenesSecondary = scenesSecondary.filter((s) =>
    boomarksArray?.includes(s.sceneId)
  )

  return (
    <LayoutArticle
      maxWidthClass="max-w-full lg:mx-5 flex items-center flex-col"
      prose={false}
    >
      <MetaTags
        title="Ausgewählte Radverkehrsanlagen vergleichen"
        description={[
          bookmarkScenesPrimary.length &&
            `${bookmarkScenesPrimary.length}✕ Hauptstaße`,
          bookmarkScenesSecondary.length &&
            `${bookmarkScenesSecondary.length}✕ Nebenstraße`,
        ]
          .filter(Boolean)
          .join(' und ')}
        noindex
      />
      <h1 className="mb-10 text-center text-4xl font-semibold print:hidden">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={classNames(
            buttonStyles,
            'mr-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full !p-0 align-text-bottom'
          )}
          title="Zurück zur Suchergebnisseite"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>{' '}
        Ausgewählte Radverkehrsanlagen vergleichen
      </h1>

      <div className="flex gap-4 overflow-scroll overscroll-contain">
        {bookmarkScenesPrimary.length ? (
          <div className="rounded border">
            <h2 className="mb-3 bg-brand-light-yellow px-5 py-3 font-semibold uppercase">
              <Link to="/hauptstrassen">Hauptstraßen</Link>
            </h2>
            <div className="flex pr-3 pl-1">
              {bookmarkScenesPrimary.map((scene, index) => (
                <ResultColumn
                  key={scene.sceneId}
                  scene={scene}
                  index={index}
                  searchFilters={undefined}
                  showTable={false}
                  setShowTable={null}
                  aggregationConfig={aggregationConfigPrimary}
                  allowBookmark={false}
                />
              ))}
            </div>
          </div>
        ) : null}
        {bookmarkScenesSecondary.length ? (
          <div className="rounded border">
            <h2 className="mb-3 bg-brand-light-yellow px-5 py-3 font-semibold uppercase">
              <Link to="/nebenstrassen">Nebenstraßen</Link>
            </h2>
            <div className="flex pr-3 pl-1">
              {bookmarkScenesSecondary.map((scene, index) => (
                <ResultColumn
                  key={scene.sceneId}
                  scene={scene}
                  index={index}
                  searchFilters={undefined}
                  showTable={false}
                  setShowTable={null}
                  aggregationConfig={aggregationConfigSecondary}
                  allowBookmark={false}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 print:hidden">
        <TwitterButton
          url={`${location.pathname}?sceneIds=${boomarksArray?.join(',')}`}
          text={`${
            bookmarkScenesPrimary.length + bookmarkScenesSecondary.length
          } Radverkehrsanlagen und ihre subjektive Sicherheit im Vergleich`}
          hashtags="verkehrswende"
          buttonText="Teilen"
        />
        <PrintButton />
      </div>
    </LayoutArticle>
  )
}

export default MyDataIndex

export const query = graphql`
  query {
    allScenesPrimaryCsv {
      edges {
        node {
          sceneId
          sceneIdCar
          sceneIdPedestrian

          bicycleLaneSurface
          bicycleLaneWidth
          bicycleLaneWidthWithoutBufferNumber
          bicycleLaneWidthWithoutBufferAndDooringZoneNumber
          bufferRightDooringZoneNumber
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

          path: gatsbyPath(
            filePath: "/hauptstrassen/{scenesPrimaryCsv.sceneId}"
          )
        }
      }
    }

    allScenesSecondaryCsv {
      edges {
        node {
          sceneId
          sceneIdCar

          parkingCategory
          carriagewayDirection
          bicycleStreetType
          carriagewayWidth
          carriagewayWidthNumber
          motorVehicleTrafficVolumen

          voteCarScore
          voteCar0Unsafe
          voteCar1RatherUnsafe
          voteCar2Save
          voteCar3VerySave
          voteCarCount
          voteCarMeans

          voteScore
          vote0Unsafe
          vote1RatherUnsafe
          vote2Save
          vote3VerySave
          voteCount
          voteMeans

          path: gatsbyPath(
            filePath: "/nebenstrassen/{scenesSecondaryCsv.sceneId}"
          )
        }
      }
    }
  }
`
