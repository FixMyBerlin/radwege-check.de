import { InformationCircleIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import React from 'react'
import { useStore } from 'zustand'
import { TranslationMissing } from '~/components/TextHelper'
import { formatMeter, isDev } from '~/components/utils'
import { Icons } from '../../Facets/FacetsButtons'
import { useStoreExperimentData } from '../../store'
import { ScenePrimaryProps, SceneSecondaryProps } from '../../types'
import { laneWidthCalculationText } from './utils'

type Props = {
  keyName: string
  bucketActive: boolean
  scene: ScenePrimaryProps | SceneSecondaryProps
  groupEndIndicator: boolean
  showIcon: boolean
  showHover?: boolean
}

export const ResultCell: React.FC<Props> = ({
  keyName,
  bucketActive,
  scene,
  groupEndIndicator,
  showIcon,
  showHover = true,
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
      title={isDev && `${keyName}: ${scene[keyName]}`}
      className={classNames(
        'break-before-avoid border-b py-2 print:py-1 lg:py-3.5',
        { 'hover:bg-stone-50': showHover },
        groupEndIndicator
          ? 'border-dashed border-stone-300 print:border-dotted print:border-stone-200'
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
              className="font-xl mr-1 inline-flex h-2 w-2 cursor-help content-center items-center rounded-full bg-yellow-200 text-yellow-200 print:hidden"
              title="Für diese Gruppe ist ein Filter aktiv."
            >
              ・
            </span>
          </>
        )}
      </h3>

      <p className="relative w-full leading-tight text-neutral-800">
        <span
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: bucketTranslation }}
        />

        {/* If cell is a number cell (and > 0), show the number next to the text: */}
        {scene[`${keyName}Number`] !== undefined &&
          scene[`${keyName}Number`] !== 0 && (
            <span className="ml-0.5 font-light text-neutral-500">
              {' '}
              {formatMeter(scene[`${keyName}Number`], {})}
            </span>
          )}

        {/* If cell is 'bicycleLaneWidth', then show the usable with as well */}
        {keyName === 'bicycleLaneWidth' &&
        'bicycleLaneWidthWithoutBufferAndDooringZoneNumber' in scene &&
        scene.bicycleLaneWidthWithoutBufferAndDooringZoneNumber > 0 ? (
          <span
            title={laneWidthCalculationText(scene)}
            className="group flex cursor-help justify-between"
          >
            <span>
              Nutzbare Breite:{' '}
              <span className="ml-0.5 font-light text-neutral-500">
                {formatMeter(
                  scene.bicycleLaneWidthWithoutBufferAndDooringZoneNumber,
                  {}
                )}
              </span>
            </span>
            <InformationCircleIcon className="h-5 w-5 text-gray-200 group-hover:text-gray-600 print:hidden" />
          </span>
        ) : (
          <span className="block">&nbsp;</span>
        )}

        {showIcon && scene[keyName] !== 'none' && (
          <span className="absolute right-1 top-0 text-xxs">
            <Icons forValue={scene[keyName]} className="scale-75" />
          </span>
        )}
      </p>
    </section>
  )
}
