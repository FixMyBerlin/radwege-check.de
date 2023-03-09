import clsx from 'clsx'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { useStore } from 'zustand'
import { useStoreExperimentData } from '~/components/ScenesPage/store'
import { isDev } from '~/components/utils'
import BikeIcon from '../../../Results/ResultNumbers/assets/bike-icon.svg'
import { ResultBucketProps } from '../../../types'
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
  bucket: ResultBucketProps
  buckets: ResultBucketProps[]
  handleClick: HandleMultiChoice
  paginationTotal: number
}

export const ButtonMultiChoice: React.FC<Props> = ({
  aggregationKey,
  bucket,
  buckets,
  handleClick,
  paginationTotal,
}) => {
  const { resultFuture, uiSelected, uiCanpress } = useResults({
    total: paginationTotal,
    bucketCount: bucket?.doc_count,
    bucketSelected: bucket?.selected,
    anySelected: buckets.some((b) => b.selected),
  })

  const { aggregationConfig } = useStore(useStoreExperimentData)
  const { showAsList } = aggregationConfig[aggregationKey]

  const formKey = `${aggregationKey}-${bucket.key}`

  return (
    <label
      htmlFor={formKey}
      className={clsx(
        {
          'flex w-full flex-row items-center justify-start gap-1 px-1 py-1':
            showAsList,
        },
        {
          'flex w-full flex-col items-center justify-start gap-1 px-1 py-1 text-center leading-4':
            !showAsList,
        },
        {
          'border border-transparent border-r-gray-300 transition-colors last:border-r-transparent group-hover:border-gray-300 group-hover:border-r-transparent group-hover:last:border-r-gray-300':
            !showAsList,
        },
        'silbentrennung',
        { 'cursor-pointer hover:bg-yellow-50': uiCanpress },
        { 'cursor-not-allowed': !uiCanpress },
        { 'text-slate-500': !uiCanpress && uiSelected }
      )}
      title={[
        // eslint-disable-next-line no-nested-ternary
        resultFuture === 0
          ? 'Auswahl würde 0 Ergebnisse zeigen.'
          : uiCanpress
          ? `Ergebnisse ${resultFuture ?? '-'}`
          : 'Auswahl würde die Ergebnisse nicht verändern.',
        isDev &&
          JSON.stringify({
            resultFuture,
            uiSelected,
            uiCanpress,
            total: paginationTotal,
            bucketCount: bucket?.doc_count,
            bucketSelected: bucket?.selected,
            anySelected: buckets.some((b) => b.selected),
          }),
      ]
        .filter(Boolean)
        .join('\n')}
    >
      <input
        id={formKey}
        name={aggregationKey}
        type="checkbox"
        checked={uiSelected}
        disabled={!uiCanpress}
        onChange={() =>
          handleClick({
            aggregationKey,
            buckets,
            selectedBucket: bucket,
          })
        }
        className={clsx(
          'h-4 w-4 rounded',
          { 'mr-1': showAsList },
          {
            'cursor-pointer border-gray-300 text-brand-yellow focus:outline-none focus:ring-brand-light-yellow focus:ring-offset-0':
              uiCanpress,
          },
          { 'cursor-not-allowed': !uiCanpress },
          { 'border-gray-300 text-brand-yellow/50': !uiCanpress && uiSelected },
          {
            'border-gray-300 bg-white/30 text-brand-yellow/30':
              !uiCanpress && !uiSelected,
          }
        )}
      />
      <span
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html:
            aggregationConfig[aggregationKey].buckets[bucket.key].replace(
              'Fahrrad ',
              renderToString(
                <>
                  <BikeIcon className="inline h-3 w-auto align-baseline" />{' '}
                </>
              )
            ) || 'TODO',
        }}
      />
    </label>
  )
}
