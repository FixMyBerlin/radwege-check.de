import React, { useLayoutEffect } from 'react'

import { ScenePage } from '~/components/ScenePage'
import {
  aggregationConfigSecondary,
  itemJsConfigSecondary,
} from '~/components/ScenesPage/constants'
import { getExperimentDataActions } from '~/components/ScenesPage/store'
import type { SceneSecondaryProps } from '~/components/ScenesPage/types'

type Props = {
  pagePath: string
  scene: SceneSecondaryProps | null
}

export const NebenstrassenSceneRoute = ({ pagePath, scene }: Props) => {
  useLayoutEffect(() => {
    getExperimentDataActions().setItemJsConfig(itemJsConfigSecondary)
    getExperimentDataActions().setAggregationConfig(aggregationConfigSecondary)
    getExperimentDataActions().setExperimentTextKey('secondary')
  }, [])

  if (!scene) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="mt-2 text-gray-600">Scene not found</p>
        </div>
      </div>
    )
  }

  return <ScenePage scene={scene} pagePath={pagePath} />
}
