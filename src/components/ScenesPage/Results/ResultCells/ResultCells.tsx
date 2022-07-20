import React from 'react'
import { useStore } from 'zustand'
import { useStoreExperimentData } from '../../store'
import {
  ScenePrimaryProps,
  SceneSecondaryProps,
  SearchOptionProps,
} from '../../types'
import { ResultCell } from './ResultCell'

type Props = {
  scene: ScenePrimaryProps | SceneSecondaryProps
  searchFilters?: SearchOptionProps['filters']
  showHover?: boolean
}

export const ResultCells: React.FC<Props> = ({
  scene,
  searchFilters,
  showHover,
}) => {
  const { aggregationConfig } = useStore(useStoreExperimentData)

  return (
    <>
      {Object.keys(aggregationConfig || {}).map((key) => {
        const bucketActive = searchFilters && !!searchFilters[key]

        return (
          <ResultCell
            key={key}
            keyName={key}
            scene={scene}
            bucketActive={bucketActive}
            groupEndIndicator={aggregationConfig[key]?.groupEndIndicator}
            showIcon={aggregationConfig[key]?.showAsIcons}
            showHover={showHover}
          />
        )
      })}
    </>
  )
}
