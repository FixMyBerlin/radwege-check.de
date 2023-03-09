import React from 'react'
import { graphql } from 'gatsby'
import { LayoutArticle } from '~/components/Layout'
import { ScenesExportPage } from '~/components/ScenesExportPage'

const ExportPagePrimary = ({
  location,
  data: {
    allScenesPrimaryCsv: { edges: rawScenes },
  },
}) => {
  return (
    <LayoutArticle
      location={location}
      maxWidthClass="max-w-full lg:mx-5"
      prose={false}
    >
      {/* <MetaTags> are part of <ScenesExportPage> */}
      <ScenesExportPage experimentTextKey="primary" rawScenes={rawScenes} />
    </LayoutArticle>
  )
}

export default ExportPagePrimary

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
