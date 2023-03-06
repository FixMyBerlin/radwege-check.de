import { XMarkIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { useStore } from 'zustand'
import { Link } from '~/components/Link'
import { SceneImage } from '../SceneImage'
import { useStoreBookmarks } from '../store'

export const BookmarkCollector: React.FC = () => {
  const { bookmarks, removeBookmark } = useStore(useStoreBookmarks)

  if (!bookmarks.length) return null

  return (
    <div className="absolute inset-x-1 bottom-5 z-50 flex items-center justify-center">
      <section className="flex max-w-lg items-center justify-center gap-1 rounded-xl bg-brand-yellow/70 px-3 py-3 shadow-md backdrop-blur">
        {bookmarks.map((bookmark) => (
          <div className="group relative inline-flex" key={bookmark}>
            <button
              type="button"
              onClick={() => removeBookmark(bookmark)}
              className="absolute top-1 right-1 hidden items-center justify-center p-2 group-hover:flex"
            >
              <div className="h-8 w-8 items-center justify-center rounded-full border-2 border-brand-yellow bg-brand-yellow p-[0.4rem]  hover:bg-yellow-400">
                <XMarkIcon className="h-4 w-4" />
              </div>
            </button>
            <SceneImage
              sceneId={bookmark}
              className="h-10 w-10 rounded-sm object-cover transition-all duration-200 group-hover:h-32 group-hover:w-32"
            />
          </div>
        ))}
        <Link
          button
          to={`/vergleichen?sceneIds=${bookmarks.join(',')}`}
          state={{ showBack: true }}
          className="h-10 !bg-white"
        >
          <span className="hidden sm:inline">Vergleichen</span>
          <ArrowRightIcon className="h-4 w-4 sm:hidden" />
        </Link>
      </section>
    </div>
  )
}
