import React from 'react'
import { graphql } from 'gatsby'
import { LayoutArticle } from '~/components/Layout'
import { ScenesExportPage } from '~/components/ScenesExportPage'

const ExportPageSecondary = ({
  location,
  data: {
    allScenesSecondaryCsv: { edges: rawScenes },
  },
}) => {
  return (
    <LayoutArticle
      location={location}
      maxWidthClass="max-w-full lg:mx-5"
      prose={false}
    >
      {/* <MetaTags> are part of <ScenesExportPage> */}
      <ScenesExportPage experimentTextKey="secondary" rawScenes={rawScenes} />
    </LayoutArticle>
  )
}

export default ExportPageSecondary

export const query = graphql`
  query {
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
