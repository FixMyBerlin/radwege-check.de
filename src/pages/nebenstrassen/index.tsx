import { graphql } from 'gatsby'
import React, { useEffect } from 'react'
import { useStore } from 'zustand'
import { LayoutScenes } from '~/components/Layout'
import { Scenes } from '~/components/Scenes'
import {
  aggregationConfigSecondary,
  itemJsConfigSecondary,
  presetsScenesSecondary,
} from '~/components/Scenes/constants'
import {
  useStoreBookmarks,
  useStoreExperimentData,
  useStorePreset,
} from '~/components/Scenes/store'
import { isProduction } from '~/components/utils'
import CommingSoon from '../CommingSoon'

const MyDataIndex = ({
  location,
  data: {
    allScenesSecondaryCsv: { edges: sceneNodes },
  },
}) => {
  // TEMP deactivated on production while we finish this up
  if (isProduction) return <CommingSoon />

  const { setItemJsConfig, setAggregationConfig, setExperimentTextKey } =
    useStore(useStoreExperimentData)
  const { setPresets } = useStore(useStorePreset)
  const { setAllowBookmarks } = useStore(useStoreBookmarks)

  useEffect(() => {
    setItemJsConfig(itemJsConfigSecondary)
    setAggregationConfig(aggregationConfigSecondary)
    setExperimentTextKey('secondary')
    setPresets(presetsScenesSecondary)
    setAllowBookmarks(!isProduction) // disabled on production
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
