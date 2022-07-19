import classNames from 'classnames'
import React from 'react'
import { getColorByValue } from '~/components/charts'
import { buttonStyles, Link } from '~/components/Link'
import { SceneImage } from '~/components/ScenesPage'
import { PresetScene } from '~/components/ScenesPage/constants'
import { SceneCategory } from '~/components/ScenesPage/types'
import { formatPercent } from '~/components/utils'
import { FilterUrlBySceneCategory } from './types'

type Props = {
  sceneCategory: SceneCategory
  preset: PresetScene
}

export const PresetSliderSlide: React.FC<Props> = ({
  sceneCategory,
  preset,
}) => {
  const filterUrlBySceneCategory: FilterUrlBySceneCategory = {
    primary: '/hauptstrassen/?filter=',
    secondary: '/nebenstrassen/?filter=',
  }

  const url = `${filterUrlBySceneCategory[sceneCategory]}${preset.searchFilterString}`
  return (
    <Link
      button
      to={url}
      classNameOverwrite="flex relative h-82 w-80 flex-col justify-between rounded-md bg-white shadow-lg group"
    >
      <h3 className="my-3 ml-3 flex h-20 flex-none font-semi text-2xl leading-7 hover:text-yellow-800 group-hover:underline group-hover:decoration-brand-yellow">
        {preset.title}
      </h3>

      <div className="relative flex-auto">
        {preset.sceneIdForImage && (
          <SceneImage
            sceneId={preset.sceneIdForImage}
            className="h-[14rem] w-full overflow-hidden rounded-b-md object-cover object-bottom"
          />
        )}
        <div
          className={classNames(
            buttonStyles,
            'absolute -top-4 right-3 flex flex-col text-center'
          )}
          style={{
            backgroundColor: getColorByValue(preset.averageScore),
          }}
        >
          {Number(preset.resultTotal).toLocaleString()} Ergebnisse
          <div>
            {formatPercent(preset.averageScore, { precision: 0 })}{' '}
            <span className="text-thin inline">Ø Score</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
