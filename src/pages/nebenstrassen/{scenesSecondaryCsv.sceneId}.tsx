import { graphql } from 'gatsby'
import React, { useEffect, useMemo } from 'react'
import { useStore } from 'zustand'
import { Layout } from '~/components/Layout'
import { ScenePage } from '~/components/ScenePage'
import {
  aggregationConfigSecondary,
  itemJsConfigSecondary,
} from '~/components/ScenesPage/constants'
import { useStoreExperimentData } from '~/components/ScenesPage/store'
import { cleanupCsvData } from '~/components/ScenesPage/utils'

const MyData = ({ location, data: { scenesSecondaryCsv: rawScene } }) => {
  const scene = useMemo(() => cleanupCsvData([rawScene || {}])[0], [rawScene])

  const { setItemJsConfig, setAggregationConfig, setExperimentTextKey } =
    useStore(useStoreExperimentData)

  useEffect(() => {
    setItemJsConfig(itemJsConfigSecondary)
    setAggregationConfig(aggregationConfigSecondary)
    setExperimentTextKey('secondary')
  }, [])

  return (
    <Layout location={location}>
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
