import { graphql } from 'gatsby'
import React, { useEffect } from 'react'
import { useStore } from 'zustand'
import { LayoutScenes } from '~/components/Layout'
import { Scenes } from '~/components/ScenesPage'
import {
  aggregationConfigPrimary,
  itemJsConfigPrimary,
  presetsScenesPrimary,
} from '~/components/ScenesPage/constants'
import {
  useStoreBookmarks,
  useStoreExperimentData,
  useStorePreset,
} from '~/components/ScenesPage/store'
import { isProduction } from '~/components/utils'

const MyDataIndex = ({
  location,
  data: {
    allScenesPrimaryCsv: { edges: sceneNodes },
  },
}) => {
  const { setItemJsConfig, setAggregationConfig, setExperimentTextKey } =
    useStore(useStoreExperimentData)
  const { setPresets } = useStore(useStorePreset)
  const { setBookmarksFeatureEnabled } = useStore(useStoreBookmarks)

  useEffect(() => {
    setItemJsConfig(itemJsConfigPrimary)
    setAggregationConfig(aggregationConfigPrimary)
    setExperimentTextKey('primary')
    setPresets(presetsScenesPrimary)
    setPresets(presetsScenesPrimary)
    setBookmarksFeatureEnabled(!isProduction) // disabled on production
  }, [])

  return (
    <LayoutScenes>
      {/* <MetaTags> are part of <Scenes> */}
      <Scenes rawScenes={sceneNodes} pagePath={location.pathname} />
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
