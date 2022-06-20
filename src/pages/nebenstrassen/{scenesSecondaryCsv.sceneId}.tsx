import { graphql } from 'gatsby'
import React, { useMemo } from 'react'
import { useStore } from 'zustand'
import { Layout } from '~/components/Layout'
import { ScenePage } from '~/components/ScenePage'
import {
  aggregationConfigSecondary,
  itemJsConfigSecondary,
} from '~/components/Scenes/constants'
import { useStoreExperimentData } from '~/components/Scenes/store'
import { cleanupCsvData } from '~/components/Scenes/utils'
import { isProduction } from '~/components/utils'
import CommingSoon from '../CommingSoon'

const MyData = ({ location, data: { scenesSecondaryCsv: rawScene } }) => {
  const scene = useMemo(() => cleanupCsvData([rawScene || {}])[0], [rawScene])

  // TEMP deactivated on production while we finish this up
  if (isProduction) return <CommingSoon />

  const { setItemJsConfig, setAggregationConfig, setExperimentTextKey } =
    useStore(useStoreExperimentData)

  setItemJsConfig(itemJsConfigSecondary)
  setAggregationConfig(aggregationConfigSecondary)
  setExperimentTextKey('secondary')

  return (
    <Layout>
      <ScenePage scene={scene} pagePath={location.pathname} />
    </Layout>
  )
}

export default MyData

export const query = graphql`
  query ($sceneId: String!) {
    scenesSecondaryCsv(sceneId: { eq: $sceneId }) {
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

      path: gatsbyPath(filePath: "/nebenstrassen/{scenesSecondaryCsv.sceneId}")
    }
  }
`
