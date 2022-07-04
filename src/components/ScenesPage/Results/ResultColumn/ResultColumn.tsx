import classNames from 'classnames'
import React, { useState } from 'react'
import { useStore } from 'zustand'
import { Link } from '~/components/Link'
import { SceneImage } from '../../SceneImage'
import { useStoreBookmarks } from '../../store'
import {
  ScenePrimaryProps,
  SceneSecondaryProps,
  SearchOptionProps,
} from '../../types'
import { titleScene } from '../../utils/titleScenes'
import { ResultCells } from '../ResultCells'
import { ResultNumbers } from '../ResultNumbers'
import { ShowTableProps } from '../Results'
import PinIcon from './assets/pin-icon.svg'

export type PrevBucketValues = { [key: string]: string | number }

export type HandleBookmarkProp = {
  handleBookmark: (sceneId: string) => void
  bookmarks: string[] | undefined
}

type Props = {
  scene: ScenePrimaryProps | SceneSecondaryProps
  index?: number
  searchFilters?: SearchOptionProps['filters']
} & ShowTableProps &
  HandleBookmarkProp

export const ResultColumn: React.FC<Props> = ({
  scene,
  index = 0,
  searchFilters = {},
  showTable,
  setShowTable,
  handleBookmark,
  bookmarks,
}) => {
  const [sceneImage, setSceneImage] = useState(scene.sceneId)
  const handleImageChange = (sceneId: string) => setSceneImage(sceneId)

  const { allowBookmarks } = useStore(useStoreBookmarks)
  const isBookmarked = bookmarks?.includes(scene.sceneId)

  const safeZoneForIosSafariNavigationBar = 'mb-[40rem] lg:mb-0'

  return (
    <article
      className={classNames(
        safeZoneForIosSafariNavigationBar,
        '_snap-start box-content h-full w-56 flex-none px-1.5 pb-4 first:pl-4 lg:w-48 lg:px-2'
      )}
    >
      <h2 className="sr-only">
        <Link to={scene.path}>{titleScene(scene)}</Link>
      </h2>

      {allowBookmarks && (
        <section className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => handleBookmark(scene.sceneId)}
            className="group flex w-full items-center justify-center p-2"
          >
            <div
              className={classNames(
                'flex h-8 w-8 items-center justify-center rounded-full border-2 border-brand-yellow p-[0.4rem] group-hover:bg-yellow-400',
                isBookmarked ? 'bg-brand-yellow' : 'bg-white'
              )}
            >
              <PinIcon className="h-4 w-4" />
            </div>
          </button>
        </section>
      )}

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

      <ResultCells scene={scene} searchFilters={searchFilters} />

      <section className="py-3">
        <Link button blank to={scene.path}>
          Details
        </Link>
      </section>
    </article>
  )
}
