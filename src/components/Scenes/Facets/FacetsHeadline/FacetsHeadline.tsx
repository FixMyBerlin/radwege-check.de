import classNames from 'classnames'
import React from 'react'
import { TranslationMissing } from '~/components/TextHelper'
import { useAggregationConfig } from '../../hooks'
import { SceneCategory } from '../../types'

type Props = {
  category: SceneCategory
  aggregationKey: string
  /** Change styles for icon aggregations */
  forIcons?: boolean
}

export const FacetsHeadline: React.FC<Props> = ({
  category,
  aggregationKey,
  forIcons,
}) => {
  const aggregationConfig = useAggregationConfig(category)
  const title = aggregationConfig[aggregationKey]?.title
  const text = title || <TranslationMissing value={aggregationKey} />

  return (
    <h2
      title={aggregationKey}
      className={classNames(
        'mb-1',
        forIcons ? 'text-xs' : 'text-sm font-semibold'
      )}
    >
      {text}
    </h2>
  )
}
