import React from 'react'
import { FeelSafe } from '~/components/charts'
import { Link } from '~/components/Link'
import { SceneImage } from '~/components/ScenesPage'
import { PresetScene } from '~/components/ScenesPage/constants'
import { SceneCategory } from '~/components/ScenesPage/types'
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
        <div className="absolute bottom-3 right-3 flex min-w-[8rem] flex-col items-center justify-center rounded bg-white/60 p-2 pb-1 text-center shadow backdrop-blur">
          <p className="-mb-0.5 leading-5">
            <strong>
              {Number(preset.resultTotal).toLocaleString()} Ergebnisse
            </strong>
            <br />Ø Score
          </p>
          <FeelSafe standalone value={preset.averageScore} />
        </div>
      </div>
    </Link>
  )
}
