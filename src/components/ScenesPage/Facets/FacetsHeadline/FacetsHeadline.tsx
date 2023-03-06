import clsx from 'clsx'
import React from 'react'
import { useStore } from 'zustand'
import { TranslationMissing } from '~/components/TextHelper'
import { useStoreExperimentData } from '../../store'

type Props = {
  aggregationKey: string
  /** Change styles for icon aggregations */
  forIcons?: boolean
}

export const FacetsHeadline: React.FC<Props> = ({
  aggregationKey,
  forIcons,
}) => {
  const { aggregationConfig } = useStore(useStoreExperimentData)
  const title = aggregationConfig[aggregationKey]?.title
  const text = title || <TranslationMissing value={aggregationKey} />

  return (
    <h2
      title={aggregationKey}
      className={clsx('mb-1', forIcons ? 'text-xs' : 'font-semi font-semibold')}
    >
      {text}
    </h2>
  )
}
