import { graphql } from 'gatsby'
import React, { useEffect } from 'react'
import { useStore } from 'zustand'
import { LayoutScenes } from '~/components/Layout'
import { ScenesPage } from '~/components/ScenesPage'
import {
  aggregationConfigPrimary,
  itemJsConfigPrimary,
  presetsScenesPrimary,
} from '~/components/ScenesPage/constants'
import {
  useStoreExperimentData,
  useStorePreset,
} from '~/components/ScenesPage/store'

const MyDataIndex = ({
  location,
  data: {
    allScenesPrimaryCsv: { edges: rawScenes },
  },
}) => {
  const { setItemJsConfig, setAggregationConfig, setExperimentTextKey } =
    useStore(useStoreExperimentData)
  const { setPresets } = useStore(useStorePreset)

  useEffect(() => {
    setItemJsConfig(itemJsConfigPrimary)
    setAggregationConfig(aggregationConfigPrimary)
    setExperimentTextKey('primary')
    setPresets(presetsScenesPrimary)
    setPresets(presetsScenesPrimary)
  }, [])

  return (
    <LayoutScenes location={location}>
      {/* <MetaTags> are part of <Scenes> */}
      <ScenesPage rawScenes={rawScenes} location={location} />
    </LayoutScenes>
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
