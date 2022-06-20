import classNames from 'classnames'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { useStore } from 'zustand'
import { useStoreExperimentData } from '~/components/Scenes/store'
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

  const formKey = `${aggregationKey}-${bucket.key}`

  return (
    <label
      htmlFor={formKey}
      className={classNames(
        'flex w-full flex-col items-center justify-start gap-1 border-r border-gray-300 px-1 py-1 text-center leading-4 first:pl-0 last:border-r-0 last:pr-0',
        'silbentrennung',
        { 'cursor-pointer hover:bg-yellow-50': uiCanpress },
        { 'cursor-not-allowed': !uiCanpress }
      )}
      title={[
        uiCanpress
          ? `Ergebnisse ${resultFuture ?? 'todo'}`
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
        className={classNames(
          'h-4 w-4 rounded',
          {
            'cursor-pointer border-gray-300 text-brand-yellow focus:outline-none focus:ring-brand-light-yellow focus:ring-offset-0':
              uiCanpress,
          },
          {
            'cursor-not-allowed': !uiCanpress,
          },
          {
            'border-gray-300 text-brand-yellow hover:text-stone-500':
              !uiCanpress && uiSelected,
          },
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
