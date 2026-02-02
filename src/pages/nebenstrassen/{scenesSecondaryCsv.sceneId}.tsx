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
  // All hooks must be called before any conditional returns (Rules of Hooks)
  const scene = useMemo(
    () => (rawScene ? cleanupCsvData([rawScene])[0] : null),
    [rawScene],
  )

  const { setItemJsConfig, setAggregationConfig, setExperimentTextKey } =
    useStore(useStoreExperimentData)

  useEffect(() => {
    setItemJsConfig(itemJsConfigSecondary)
    setAggregationConfig(aggregationConfigSecondary)
    setExperimentTextKey('secondary')
  }, [])

  // Handle missing scene data - show 404 content if scene doesn't exist
  if (!rawScene || !scene) {
    return (
      <Layout location={location}>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="mt-2 text-gray-600">Scene not found</p>
          </div>
        </div>
      </Layout>
    )
  }

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
