/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames'
import React from 'react'
import { useAggregationConfig } from '../../../hooks'
import { ResultBucketProps, SceneCategory } from '../../../types'
import { useResults } from './useResults'
import { buttonClassNames } from './utils'

export type HandleSingleChoiceProps = {
  aggregationKey: string
  selectedBucketKey: string | null
}

export type HandleSingleChoice = ({
  aggregationKey,
  selectedBucketKey,
}: HandleSingleChoiceProps) => void

type Props = {
  aggregationKey: string
  category: SceneCategory
  bucket: ResultBucketProps
  buckets: ResultBucketProps[]
  handleClick: HandleSingleChoice
  index: number
  paginationTotal: number
}

export const ButtonSingleChoice: React.FC<Props> = ({
  aggregationKey,
  category,
  bucket,
  buckets,
  handleClick,
  index,
  paginationTotal,
}) => {
  const aggregationConfig = useAggregationConfig(category)

  const { resultTotal, resultFuture, uiSelected, uiCanpress } = useResults({
    total: paginationTotal,
    bucketCount: bucket.doc_count,
    bucketSelected: bucket.selected,
  })

  const firstElement = index === 0
  const lastElement = index === buckets.length

  const { labelClasses, inputClasses } = buttonClassNames({
    firstElement,
    lastElement,
    uiSelected,
    uiCanpress,
  })

  const formKey = `${aggregationKey}-${bucket.key}`

  return (
    <label
      htmlFor={formKey}
      className={classNames(labelClasses)}
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
      <input
        id={formKey}
        name={aggregationKey}
        type="radio"
        checked={uiSelected}
        disabled={!uiCanpress}
        onChange={() =>
          handleClick({
            aggregationKey,
            selectedBucketKey: bucket.key,
          })
        }
        className={classNames(inputClasses)}
      />
      <span
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html:
            aggregationConfig[aggregationKey].buckets[bucket.key] || 'TODO',
        }}
      />
    </label>
  )
}
