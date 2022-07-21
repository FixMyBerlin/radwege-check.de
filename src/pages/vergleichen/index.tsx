import { ArrowLeftIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import { graphql, navigate } from 'gatsby'
import React, { useEffect, useMemo } from 'react'
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
import { fullUrl, trackContentImpression } from '~/components/utils'
import { VergleichenPagePrintResult } from '~/components/VergleichenPagePrintResult'

/*
State handling:
- We store the sceneIds on the <ScenesPage>s in 'zustand'.
- We link to this page from the <ScenesPage>s by url param `sceneIds`.
- The state of this page is handled exclusively by `useQueryParam`.
  Which means we can use this page as an entry page by shared, external URLs.

Hand state back to ScenesPage:
- This is for the entry page usecase, when 'zustand' / the <ScenesPages> do not have any state.
  Which means when I navigate back to the <ScenesPages>s I loose the selection that I just saw.
- We work around this with Reach router <Link> state, which in turn is picked up by <ScenesPage>
  to populate the 'zustand' store if none is present.

Backbutton:
- We added a back-button on this page to the previous page.
- However, this button should only show if the previous Page was a ScenesPage.
  (AKA not an entry page.)
  Which is solved by Reach router <Link> state `showBack` in <BookmarkCollector>
  (This seems to be the only way to handle this special case, unfortunatelly.)
*/

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

  const showBackButton = location?.state?.showBack === true

  useEffect(() => {
    const bothScenes = [...bookmarkScenesPrimary, ...bookmarkScenesSecondary]
    bothScenes.forEach((scene) =>
      trackContentImpression({
        id: scene.sceneId,
        representation: 'result column',
        url: fullUrl(scene.path),
      })
    )
  }, [bookmarkScenesPrimary, bookmarkScenesSecondary])

  return (
    <LayoutArticle
      maxWidthClass="max-w-full lg:mx-5 flex items-center flex-col"
      prose={false}
      printHideHeader
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
        imagePath="/social-sharing/results.jpg"
      />

      <h1 className="mx-3 mb-10 text-center text-3xl font-semibold print:hidden sm:text-4xl">
        {showBackButton && (
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
          </button>
        )}{' '}
        Ausgewählte Radverkehrsanlagen vergleichen
      </h1>

      <div className="relative flex max-w-[inherit] gap-4 overflow-auto print:block print:max-w-full print:overflow-visible">
        {bookmarkScenesPrimary.length ? (
          <div className="rounded border print:inline print:border-0">
            <h2 className="mb-3 bg-brand-light-yellow px-5 py-3 font-semibold uppercase print:hidden">
              <Link to="/hauptstrassen" state={{ boomarksArray }}>
                Hauptstraßen
              </Link>
            </h2>
            <div className="flex pr-3 pl-1 print:hidden print:grid-cols-3">
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
            <div className="hidden print:block">
              {bookmarkScenesPrimary.map((scene) => (
                <VergleichenPagePrintResult
                  key={scene.sceneId}
                  scene={scene}
                  aggregationConfig={aggregationConfigPrimary}
                  experimentTextKey="primary"
                />
              ))}
            </div>
          </div>
        ) : null}
        {bookmarkScenesSecondary.length ? (
          <div className="rounded border print:inline print:border-0">
            <h2 className="mb-3 bg-brand-light-yellow px-5 py-3 font-semibold uppercase print:hidden">
              <Link to="/nebenstrassen" state={{ boomarksArray }}>
                Nebenstraßen
              </Link>
            </h2>
            <div className="flex pr-3 pl-1 print:hidden print:grid-cols-3">
              {bookmarkScenesPrimary.map((scene, index) => (
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
            <div className="hidden print:block">
              {bookmarkScenesSecondary.map((scene) => (
                <VergleichenPagePrintResult
                  key={scene.sceneId}
                  scene={scene}
                  aggregationConfig={aggregationConfigSecondary}
                  experimentTextKey="secondary"
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 print:hidden">
        <TwitterButton
          url={`${location.pathname}?sceneIds=${boomarksArray?.join(',')}`}
          text={`${boomarksArray.length} Radverkehrsanlagen und ihre subjektive Sicherheit im Vergleich`}
          hashtags="RadwegeCheck"
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
