import classNames from 'classnames'
import React, { useState } from 'react'
import { Link } from '~/components/Link'
import { SceneImage } from '../../SceneImage'
import {
  SceneCategory,
  ScenePrimaryProps,
  SceneSecondaryProps,
  SearchOptionProps,
} from '../../types'
import { ResultCells } from '../ResultCells'
import { ResultNumbers } from '../ResultNumbers'
import { ShowTableProps } from '../Results'

export type PrevBucketValues = { [key: string]: string | number }

type Props = {
  category: SceneCategory
  scene: ScenePrimaryProps | SceneSecondaryProps
  index?: number
  searchFilters?: SearchOptionProps['filters']
} & ShowTableProps

export const ResultColumn: React.FC<Props> = ({
  category,
  scene,
  index = 0,
  searchFilters = {},
  showTable,
  setShowTable,
}) => {
  const [sceneImage, setSceneImage] = useState(scene.sceneId)
  const handleImageChange = (sceneId: string) => setSceneImage(sceneId)

  const safeZoneForIosSafariNavigationBar = 'mb-[40rem] lg:mb-0'

  return (
    <article
      className={classNames(
        safeZoneForIosSafariNavigationBar,
        '_snap-start box-content h-full w-56 flex-none py-4 px-1.5 first:pl-4 lg:w-48 lg:px-2'
      )}
    >
      <h2 className="sr-only">
        <Link to={scene.path}>Szene {scene.sceneId}</Link>
      </h2>

      <section className="mb-2">
        <Link to={scene.path} blank classNameOverwrite="relative">
          <SceneImage
            sceneId={sceneImage}
            className="h-36 w-full object-cover object-bottom"
            lazy={index > 10}
          />
        </Link>
      </section>

      <ResultNumbers
        scene={scene}
        handleHover={handleImageChange}
        showTable={showTable}
        setShowTable={setShowTable}
        wrapperClass={classNames(
          'border-b border-dotted py-2 lg:py-3.5',
          showTable ? 'h-96' : 'h-40'
        )}
        chartClass="border-b border-dotted"
      />

      <ResultCells
        category={category}
        scene={scene}
        searchFilters={searchFilters}
      />

      <section className="py-3">
        <Link button blank to={scene.path}>
          Details
        </Link>
      </section>
    </article>
  )
}
