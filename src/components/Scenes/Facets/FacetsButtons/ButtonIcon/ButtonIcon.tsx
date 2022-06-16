import React from 'react'
import { isDev } from '~/components/utils'
import { useAggregationConfig } from '../../../hooks'
import { ResultBucketProps, SceneCategory } from '../../../types'
import { HandleSingleChoice } from '../ButtonSingleChoice'
import { useResults } from '../ButtonSingleChoice/useResults'
import { Icons } from './Icons'
import { buttonIconClassNames } from './utils'

type Props = {
  aggregationKey: string
  category: SceneCategory
  bucket: ResultBucketProps
  handleClick: HandleSingleChoice
  paginationTotal: number
}

export const ButtonIcon: React.FC<Props> = ({
  aggregationKey,
  category,
  bucket,
  handleClick,
  paginationTotal,
}) => {
  const aggregationConfig = useAggregationConfig(category)

  const { resultFuture, uiSelected, uiCanpress } = useResults({
    total: paginationTotal,
    bucketCount: bucket?.doc_count,
    bucketSelected: bucket?.selected,
  })

  const { buttonClasses, iconClasses } = buttonIconClassNames({
    uiSelected,
    uiCanpress,
  })

  return (
    <button
      key={bucket.key}
      type="button"
      className={buttonClasses}
      onClick={() =>
        handleClick({
          aggregationKey,
          selectedBucketKey: bucket.key,
        })
      }
      disabled={!uiCanpress}
      title={[
        aggregationConfig[aggregationKey].buckets[bucket.key],
        resultFuture === 0
          ? 'Auswahl würde 0 Ergebnisse zeigen.'
          : `Ergebnisse ${resultFuture ?? 'todo'}`,
        isDev &&
          JSON.stringify({
            resultFuture,
            uiSelected,
            uiCanpress,
            total: paginationTotal,
            bucketCount: bucket?.doc_count,
            bucketSelected: bucket?.selected,
          }),
      ]
        .filter(Boolean)
        .join('\n')}
    >
      <Icons forValue={bucket.key} className={iconClasses} />
    </button>
  )
}
