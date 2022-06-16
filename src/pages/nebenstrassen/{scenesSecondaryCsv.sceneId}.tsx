import { graphql } from 'gatsby'
import React, { useMemo } from 'react'
import { Layout } from '~/components/Layout'
import { ScenePage } from '~/components/ScenePage'
import { cleanupCsvData } from '~/components/Scenes/utils'
import CommingSoon from '../CommingSoon'

const MyData = ({ location, data: { scenesSecondaryCsv: rawScene } }) => {
  const scene = useMemo(() => cleanupCsvData([rawScene || {}])[0], [rawScene])

  // TEMP Deactivate page for breta release
  return <CommingSoon />

  return (
    <Layout>
      <ScenePage
        category="secondary"
        scene={scene}
        pagePath={location.pathname}
      />
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
