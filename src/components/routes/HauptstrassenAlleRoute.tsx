import React, { useLayoutEffect } from 'react'

import { ScenesAllPage } from '~/components/ScenesAllPage'
import { getExperimentDataActions } from '~/components/ScenesPage/store'

type Props = {
  rawScenes: { node: Record<string, unknown> }[]
}

export const HauptstrassenAlleRoute = ({ rawScenes }: Props) => {
  useLayoutEffect(() => {
    getExperimentDataActions().setExperimentTextKey('primary')
  }, [])

  return <ScenesAllPage rawScenes={rawScenes} sceneKind="primary" />
}
