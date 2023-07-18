import clsx from 'clsx'
import React from 'react'
import { useStore } from 'zustand'
import { useStoreExperimentData } from '../../store'
import { ResultBucketProps, ResultProps } from '../../types'
import { checkBucketValueConsistency, checkDataConsistency } from '../utils'
import { ButtonIcon, ButtonIconNoChoice } from './ButtonIcon'
import { ButtonMultiChoice, HandleMultiChoice } from './ButtonMultiChoice'
import {
  ButtonSingleChoice,
  ButtonSingleChoiceNoChoice,
  HandleSingleChoice,
} from './ButtonSingleChoice'

type Props = {
  aggregationKey: string
  results: ResultProps
  buckets: ResultBucketProps[]
  handleSingleChoice?: HandleSingleChoice
  handleMultiChoice?: HandleMultiChoice
}

export const FacetsButtons: React.FC<Props> = ({
  aggregationKey,
  results,
  buckets,
  handleSingleChoice,
  handleMultiChoice,
}) => {
  checkDataConsistency({ aggregationKey })
  const { keyFromItemjsMissingInTranslations } = checkBucketValueConsistency({
    aggregationKey,
    buckets,
  })

  // We need a specific order for our Bucket values.
  // We use the order of key from our aggregationConfig for that.
  // However, for keys of type number that does not work, which is why we use a custom order via the `sortOrder` key.
  const { aggregationConfig } = useStore(useStoreExperimentData)
  const sortedBuckets =
    aggregationConfig[aggregationKey]?.sortOrder ||
    Object.keys(aggregationConfig[aggregationKey].buckets)

  const { showAsIcons, choiceMode, showAsList } =
    aggregationConfig[aggregationKey]
  const wrapperClass = clsx(
    'w-full font-condensed',
    {
      'flex flex-col border border-transparent hover:border-gray-300 overflow-hidden p-1.5':
        showAsList,
    },
    { 'rounded-md': showAsList && choiceMode === 'single' },
    { 'group grid grid-cols-4': !showAsList && choiceMode === 'multi' },
    { 'group flex flex-row': !showAsList && choiceMode === 'single' },
  )

  return (
    <>
      <div className={wrapperClass}>
        {sortedBuckets.map((bucketKey, index) => {
          if (bucketKey === 'noChoice') {
            if (showAsIcons) {
              return (
                <ButtonIconNoChoice
                  key="noChoice"
                  bucketKey="noChoice"
                  buckets={buckets}
                  aggregationKey={aggregationKey}
                  handleClick={handleSingleChoice}
                />
              )
            }

            if (choiceMode === 'single') {
              return (
                <ButtonSingleChoiceNoChoice
                  key="noChoice"
                  bucketKey="noChoice"
                  buckets={buckets}
                  aggregationKey={aggregationKey}
                  handleClick={handleSingleChoice}
                />
              )
            }
          }

          const bucket = results.data.aggregations[
            aggregationKey
          ].buckets.filter((b) => b.key === bucketKey)?.[0]

          // Guard for `keyFromTranslationMissingInItemjs`
          if (!bucket) return null

          if (showAsIcons) {
            return (
              <ButtonIcon
                key={bucketKey}
                bucket={bucket}
                aggregationKey={aggregationKey}
                handleClick={handleSingleChoice}
                paginationTotal={results?.pagination?.total}
              />
            )
          }

          if (choiceMode === 'single') {
            return (
              <ButtonSingleChoice
                key={bucketKey}
                buckets={buckets}
                bucket={bucket}
                index={index}
                aggregationKey={aggregationKey}
                handleClick={handleSingleChoice}
                paginationTotal={results?.pagination?.total}
              />
            )
          }

          return (
            <ButtonMultiChoice
              key={bucketKey}
              buckets={buckets}
              bucket={bucket}
              aggregationKey={aggregationKey}
              handleClick={handleMultiChoice}
              paginationTotal={results?.pagination?.total}
            />
          )
        })}
      </div>

      {!!keyFromItemjsMissingInTranslations?.length && (
        <div className="text-xs text-neutral-500">
          Werte, die wir in den Daten bereinigen müssen:{' '}
          {keyFromItemjsMissingInTranslations.map((v) => (
            <code key={v} className="rounded-sm bg-red-100 px-1">
              {v}{' '}
            </code>
          ))}
        </div>
      )}
    </>
  )
}
