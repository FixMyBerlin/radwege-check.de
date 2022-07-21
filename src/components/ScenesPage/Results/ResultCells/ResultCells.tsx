import React from 'react'
import { AggregationConfig } from '../../constants'
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
  aggregationConfig: AggregationConfig
}

export const ResultCells: React.FC<Props> = ({
  scene,
  searchFilters,
  showHover,
  aggregationConfig,
}) => {
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
            aggregationConfig={aggregationConfig}
          />
        )
      })}
    </>
  )
}
