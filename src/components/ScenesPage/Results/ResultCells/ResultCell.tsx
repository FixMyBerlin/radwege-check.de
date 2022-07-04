import classNames from 'classnames'
import React from 'react'
import { useStore } from 'zustand'
import { TranslationMissing } from '~/components/TextHelper'
import { formatMeter } from '~/components/utils'
import { Icons } from '../../Facets/FacetsButtons'
import { useStoreExperimentData } from '../../store'
import { ScenePrimaryProps, SceneSecondaryProps } from '../../types'

type Props = {
  keyName: string
  bucketActive: boolean
  scene: ScenePrimaryProps | SceneSecondaryProps
  groupEndIndicator: boolean
  showIcon: boolean
}

export const ResultCell: React.FC<Props> = ({
  keyName,
  bucketActive,
  scene,
  groupEndIndicator,
  showIcon,
}) => {
  const { aggregationConfig } = useStore(useStoreExperimentData)

  const titleTranslation = aggregationConfig[keyName]?.resultTitle ||
    aggregationConfig[keyName]?.title || <TranslationMissing value={keyName} />

  const bucketTranslation =
    aggregationConfig[keyName]?.resultBuckets?.[scene[keyName]] ||
    aggregationConfig[keyName]?.buckets[scene[keyName]] ||
    'TODO'

  return (
    <section
      title={`${keyName}: ${scene[keyName]}`}
      className={classNames(
        'break-before-avoid border-b py-2 hover:bg-stone-50 lg:py-3.5',
        groupEndIndicator
          ? 'border-dashed border-stone-300'
          : 'border-dotted border-stone-200'
      )}
    >
      <h3
        title={bucketActive ? 'Filter-Gruppe aktiv' : ''}
        className="mb-0.5 flex items-center justify-between text-xxs font-semibold"
      >
        {titleTranslation}
        {bucketActive && (
          <>
            {' '}
            <span
              className="font-xl mr-1 inline-flex h-2 w-2 cursor-help content-center items-center rounded-full bg-yellow-200 text-yellow-200"
              title="Für diese Gruppe ist ein Filter aktiv."
            >
              ・
            </span>
          </>
        )}
      </h3>

      <p className="w-ful relative leading-tight text-neutral-800">
        <span
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: bucketTranslation }}
        />

        {keyName.includes('Width') &&
          !Number.isNaN(scene[`${keyName}Number`]) && (
            <span className="ml-1 font-light text-neutral-500">
              {' '}
              {formatMeter(scene[`${keyName}Number`], {})}
            </span>
          )}

        {showIcon && (
          <span className="absolute right-1 top-0 text-xxs">
            <Icons forValue={scene[keyName]} className="scale-75" />
          </span>
        )}
      </p>
    </section>
  )
}
