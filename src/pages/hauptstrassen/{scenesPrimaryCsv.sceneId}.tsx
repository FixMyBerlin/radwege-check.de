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
  const scene = useMemo(() => cleanupCsvData([rawScene || {}])[0], [rawScene])

  const { setItemJsConfig, setAggregationConfig, setExperimentTextKey } =
    useStore(useStoreExperimentData)

  useEffect(() => {
    setItemJsConfig(itemJsConfigPrimary)
    setAggregationConfig(aggregationConfigPrimary)
    setExperimentTextKey('primary')
  }, [])

  return (
    <Layout>
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
