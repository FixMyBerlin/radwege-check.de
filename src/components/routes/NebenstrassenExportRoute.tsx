import React, { useLayoutEffect } from 'react'

import { ScenesExportPage } from '~/components/ScenesExportPage'
import { getExperimentDataActions } from '~/components/ScenesPage/store'

type Props = {
  rawScenes: { node: Record<string, unknown> }[]
}

export const NebenstrassenExportRoute = ({ rawScenes }: Props) => {
  useLayoutEffect(() => {
    getExperimentDataActions().setExperimentTextKey('secondary')
  }, [])

  return <ScenesExportPage experimentTextKey="secondary" rawScenes={rawScenes} />
}
