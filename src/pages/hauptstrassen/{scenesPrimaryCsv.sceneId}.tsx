import { graphql } from 'gatsby'
import React, { useEffect, useMemo } from 'react'
import { useStore } from 'zustand'
import { Layout } from '~/components/Layout'
import { ScenePage } from '~/components/ScenePage'
import {
  aggregationConfigPrimary,
  itemJsConfigPrimary,
} from '~/components/ScenesPage/constants'
import { useStoreExperimentData } from '~/components/ScenesPage/store'
import { cleanupCsvData } from '~/components/ScenesPage/utils'

const MyData = ({ location, data: { scenesPrimaryCsv: rawScene } }) => {
  // All hooks must be called before any conditional returns (Rules of Hooks)
  const scene = useMemo(
    () => (rawScene ? cleanupCsvData([rawScene])[0] : null),
    [rawScene],
  )

  const { setItemJsConfig, setAggregationConfig, setExperimentTextKey } =
    useStore(useStoreExperimentData)

  useEffect(() => {
    setItemJsConfig(itemJsConfigPrimary)
    setAggregationConfig(aggregationConfigPrimary)
    setExperimentTextKey('primary')
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
    scenesPrimaryCsv(sceneId: { eq: $sceneId }) {
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

      path: gatsbyPath(filePath: "/hauptstrassen/{scenesPrimaryCsv.sceneId}")
    }
  }
`
