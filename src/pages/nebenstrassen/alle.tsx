import { graphql } from 'gatsby'
import React, { useEffect } from 'react'
import { useStore } from 'zustand'
import { LayoutArticle } from '~/components/Layout'
import { useStoreExperimentData } from '~/components/ScenesPage/store'
import { ScenesAllPage } from '~/components/ScenesAllPage'
import { isProduction } from '~/components/utils'
import CommingSoon from '../CommingSoon'

const AllPageSecondary = ({
  data: {
    allScenesSecondaryCsv: { edges: sceneNodes },
  },
}) => {
  // TEMP deactivated on production while we finish this up
  if (isProduction) return <CommingSoon />

  const { setExperimentTextKey } = useStore(useStoreExperimentData)
  useEffect(() => setExperimentTextKey('secondary'), [])

  return (
    <LayoutArticle maxWidthClass="max-w-full lg:mx-5" prose={false}>
      {/* <MetaTags> are part of <ScenesAllPage> */}
      <ScenesAllPage rawScenes={sceneNodes} />
    </LayoutArticle>
  )
}

export default AllPageSecondary

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
