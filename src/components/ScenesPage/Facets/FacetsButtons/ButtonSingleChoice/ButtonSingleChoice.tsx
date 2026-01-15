import React from 'react'
import { renderToString } from 'react-dom/server'
import { useStore } from 'zustand'
import { useStoreExperimentData } from '~/components/ScenesPage/store'
import { isDev } from '~/components/utils'
import BikeIcon from '../../../Results/ResultNumbers/assets/bike-icon.svg'
import { ResultBucketProps } from '../../../types'
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
  bucket: ResultBucketProps
  buckets: ResultBucketProps[]
  handleClick: HandleSingleChoice
  index: number
  paginationTotal: number
}

export const ButtonSingleChoice: React.FC<Props> = ({
  aggregationKey,
  bucket,
  buckets,
  handleClick,
  index,
  paginationTotal,
}) => {
  const { aggregationConfig } = useStore(useStoreExperimentData)

  const { resultFuture, uiSelected, uiCanpress } = useResults({
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
    showAsList: aggregationConfig[aggregationKey]?.showAsList,
  })

  const formKey = `${aggregationKey}-${bucket.key}`
  const bucketLabel =
    aggregationConfig[aggregationKey].buckets[bucket.key] || 'TODO'

  return (
    <label
      htmlFor={formKey}
      className={labelClasses}
      title={[
        resultFuture === 0
          ? 'Auswahl würde 0 Ergebnisse zeigen.'
          : uiCanpress
            ? `Ergebnisse ${resultFuture ?? '-'}`
            : 'Auswahl würde die Ergebnisse nicht verändern.',
        aggregationConfig[aggregationKey]?.tooltipBuckets?.[bucket.key],
        isDev &&
          JSON.stringify({
            resultFuture,
            uiSelected,
            uiCanpress,
            total: paginationTotal,
            bucketCount: bucket.doc_count,
            bucketSelected: bucket.selected,
          }),
      ]
        .filter(Boolean)
        .join('\n')}
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
        aria-label={bucketLabel.replace(/<[^>]*>/g, '').replace('Fahrrad ', '')}
        className={inputClasses}
      />
      <span
        dangerouslySetInnerHTML={{
          __html: bucketLabel.replace(
            'Fahrrad ',
            renderToString(
              <>
                <BikeIcon className="inline h-3 w-auto align-baseline" />{' '}
              </>,
            ),
          ),
        }}
        aria-hidden="true"
      />
    </label>
  )
}
