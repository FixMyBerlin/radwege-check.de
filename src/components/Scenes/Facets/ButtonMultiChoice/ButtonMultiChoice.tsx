import classNames from 'classnames'
import React from 'react'
import { useAggregationConfig } from '../../hooks'
import { ResultBucketProps, SceneCategory } from '../../types'
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
  index: number
  paginationTotal: number
}

export const ButtonMultiChoice: React.FC<Props> = ({
  aggregationKey,
  category,
  bucket,
  buckets,
  handleClick,
  index,
  paginationTotal,
}) => {
  const { resultTotal, resultFuture, uiSelected, uiCanpress } = useResults({
    total: paginationTotal,
    bucketCount: bucket?.doc_count,
    bucketSelected: bucket?.selected,
    anySelected: buckets.some((b) => b.selected),
  })
  const firstElement = index === 0
  const lastElement = index === buckets.length - 1
  const aggregationConfig = useAggregationConfig(category)

  return (
    <button
      key={bucket.key}
      type="button"
      className={classNames(
        buttonClassNames({
          firstElement,
          lastElement,
          uiSelected,
          uiCanpress,
        })
      )}
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
      <span
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html:
            aggregationConfig[aggregationKey].buckets[bucket.key] || 'TODO',
        }}
      />
    </button>
  )
}
