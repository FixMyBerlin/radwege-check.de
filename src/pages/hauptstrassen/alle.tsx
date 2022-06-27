import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import { LayoutArticle, MetaTags } from '~/components/Layout'
import { cleanupCsvData, titlePrimaryScene } from '~/components/Scenes/utils'
import { SceneImage } from '~/components/Scenes'
import { Link } from '~/components/Link'
import { BarChart } from '~/components/Scenes/Results/ResultNumbers/BarChartAndHeadline/BarChart'

const AllPagePrimary = ({
  data: {
    allScenesPrimaryCsv: { edges: sceneNodes },
  },
}) => {
  const scenes = useMemo(() => {
    // Flatten the data by extracting the objects we want from [node: { /* object */ }, node: { /* object */ }, …]
    const flattened = sceneNodes.map((list) => list.node)
    // Clean the data
    const clean = cleanupCsvData(flattened)
    return clean.sort((a, b) => a.voteScore - b.voteScore)
  }, [sceneNodes])

  const totalResults = Number(sceneNodes.length).toLocaleString()

  return (
    <LayoutArticle maxWidthClass="max-w-full lg:mx-5">
      <MetaTags
        article
        noindex
        title={`Alle ${totalResults} Hauptstraße-Szenen`}
        description="Eine lange Übersicht aller Szenen"
      />

      <h1 className="mb-5 text-center text-4xl font-semibold ">
        Alle {totalResults} Szenen für Hauptstraßen
      </h1>
      <p className="text-center text-gray-500">
        Aus dem Blickwinkel einer Fahrradfahrer:in. Die Sortierung zeigt die am
        schlechtesten bewerteten Szenen zuerst.
        <br />
        <Link to="/hauptstrassen" button className="mt-2">
          Ergebnisse filtern…
        </Link>
      </p>

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {scenes.map((scene) => (
          <Link
            key={scene.sceneId}
            to={scene.path}
            classNameOverwrite="flex flex-col hover:bg-brand-light-yellow hover:shadow-xl p-3 rounded hover:border-gray-100 border-transparent border transition"
          >
            <SceneImage
              sceneId={scene.sceneId}
              className="mb-2 rounded object-cover object-bottom"
            />

            <div className="flex h-20 justify-between gap-2">
              <h2 className="leading-tight">{titlePrimaryScene(scene)}</h2>
              <div className="w-6 flex-none">
                <BarChart
                  vote0Unsafe={scene.vote0Unsafe}
                  vote1RatherUnsafe={scene.vote1RatherUnsafe}
                  vote2Save={scene.vote2Save}
                  vote3VerySave={scene.vote3VerySave}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </LayoutArticle>
  )
}

export default AllPagePrimary

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
  }
`
