import classNames from 'classnames'
import React from 'react'
import { useAggregationConfig } from '../../../hooks'
import { ResultBucketProps, SceneCategory } from '../../../types'
import CircleIcon from '../assets/circle-icon.svg'
import { buttonClassNames } from '../utils'
import { useResults } from './useResults'

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
    bucketCount: bucket?.doc_count,
    bucketSelected: bucket?.selected,
  })

  const firstElement = index === 0
  const lastElement = index === buckets.length

  const { buttonClasses, iconClasses } = buttonClassNames({
    firstElement,
    lastElement,
    uiSelected,
    uiCanpress,
  })

  // The goal is to have the shadows on the right only; and TW needs the classes spelled out.
  const zIndexClass = {
    z0: 'z-[11]',
    z1: 'z-[10]',
    z2: 'z-[9]',
    z3: 'z-[8]',
    z4: 'z-[7]',
  }

  return (
    <button
      key={bucket.key}
      type="button"
      className={classNames(
        buttonClasses,
        `z-test-${index}`,
        zIndexClass[`z${index}`]
      )}
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
      <div className="my-1 flex flex-none justify-center">
        <CircleIcon className={classNames(iconClasses, 'h-4')} />
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
