import { CheckIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import React from 'react'
import { useAggregationConfig } from '../../../hooks'
import { ResultBucketProps, SceneCategory } from '../../../types'
import { buttonClassNames } from '../utils'
import { useResults } from './useResults'

export type HandleMultiChoiceProps = {
  aggregationKey: string
  buckets: ResultBucketProps[]
  selectedBucket: ResultBucketProps
}

export type HandleMultiChoice = ({
  aggregationKey,
  buckets,
  selectedBucket,
}: HandleMultiChoiceProps) => void

type Props = {
  aggregationKey: string
  category: SceneCategory
  bucket: ResultBucketProps
  buckets: ResultBucketProps[]
  handleClick: HandleMultiChoice
  paginationTotal: number
}

export const ButtonMultiChoice: React.FC<Props> = ({
  aggregationKey,
  category,
  bucket,
  buckets,
  handleClick,
  paginationTotal,
}) => {
  const { resultTotal, resultFuture, uiSelected, uiCanpress } = useResults({
    total: paginationTotal,
    bucketCount: bucket?.doc_count,
    bucketSelected: bucket?.selected,
    anySelected: buckets.some((b) => b.selected),
  })
  const aggregationConfig = useAggregationConfig(category)

  const { buttonClasses, iconClasses } = buttonClassNames({
    firstElement: true,
    lastElement: true,
    uiSelected,
    uiCanpress,
  })

  return (
    <button
      key={bucket.key}
      type="button"
      className={classNames(buttonClasses)}
      onClick={() =>
        handleClick({
          aggregationKey,
          buckets,
          selectedBucket: bucket,
        })
      }
      disabled={!uiCanpress}
      title={
        resultTotal === resultFuture
          ? 'Auswahl nicht möglich da keine Änderung der Ergebnisse.'
          : `Ergebnisse ${resultFuture || 'todo'}`
      }
    >
      <div className="mt-1 flex flex-none justify-center">
        <CheckIcon className={classNames(iconClasses, 'h-6')} />
      </div>
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html:
            aggregationConfig[aggregationKey].buckets[bucket.key] || 'TODO',
        }}
      />
    </button>
  )
}
