import classNames from 'classnames'
import React from 'react'
import { useAggregationConfig } from '../../../hooks'
import { ResultBucketProps, SceneCategory } from '../../../types'
import { HandleSingleChoice } from '../ButtonSingleChoice'
import { useResults } from '../ButtonSingleChoice/useResults'
import { buttonIconClassNames } from './utils'
import { Icons } from './Icons'

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

  const { resultTotal, resultFuture, uiSelected, uiCanpress } = useResults({
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
        `${aggregationConfig[aggregationKey].buckets[bucket.key]}`,
        // eslint-disable-next-line no-nested-ternary
        resultTotal === resultFuture
          ? 'Auswahl nicht möglich da keine Änderung der Ergebnisse.'
          : resultFuture === 0
          ? 'Auswahl nicht möglich da sie zu 0 Ergebnissen führen würde'
          : `Ergebnisse ${resultFuture || 'todo'}`,
      ]
        .filter((k) => !!k)
        .join(' – ')}
    >
      <Icons
        forValue={bucket.key}
        className={classNames(iconClasses, 'scale-75')}
      />
    </button>
  )
}
