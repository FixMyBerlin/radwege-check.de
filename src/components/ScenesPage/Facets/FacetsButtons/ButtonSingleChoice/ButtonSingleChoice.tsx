import React from 'react'
import { renderToString } from 'react-dom/server'

import { useExperimentAggregationConfig } from '~/components/ScenesPage/store'
import { SvgInline } from '~/components/Svg/SvgInline'
import { isDev } from '~/components/utils'

import bikeIconMarkup from '../../../Results/ResultNumbers/assets/bike-icon.svg?raw'
import type { ResultBucketProps } from '../../../types'
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

export const ButtonSingleChoice = ({
  aggregationKey,
  bucket,
  buckets,
  handleClick,
  index,
  paginationTotal,
}: Props) => {
  const aggregationConfig = useExperimentAggregationConfig()

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
  const bucketLabel = aggregationConfig[aggregationKey].buckets[bucket.key] || 'TODO'

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
                <SvgInline
                  src={bikeIconMarkup}
                  className="inline h-3 w-auto align-baseline"
                  aria-hidden
                />{' '}
              </>,
            ),
          ),
        }}
        aria-hidden="true"
      />
    </label>
  )
}
