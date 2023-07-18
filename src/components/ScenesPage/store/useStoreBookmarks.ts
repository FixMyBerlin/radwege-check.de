import { create } from 'zustand'
import { trackContentInteraction } from '~/components/utils'

type SceneIds = string

export type StoreBookmarksData = {
  bookmarks: SceneIds[]
  /** @desc (Over)write the store with an array of SceneIds */
  setBookmarks: (bookmark: SceneIds[]) => void
  /** @desc Add a SceneId to the Store */
  addBookmark: (bookmark: SceneIds) => void
  /** @desc Remove a SceneId from the Store */
  removeBookmark: (sceneId: string) => void
  isInBookmarks: (sceneId: string) => boolean
  /** @desc Add or remove (depending on isInBookmars) a SceneId to/from the Store */
  toggleBookmark: (sceneId: string) => void
}

export const useStoreBookmarks = create<StoreBookmarksData>((set, get) => ({
  bookmarks: [],
  setBookmarks: (externalBookmarks) => {
    set({ bookmarks: externalBookmarks.sort((a, b) => a.localeCompare(b)) })
    externalBookmarks.forEach((sceneId) =>
      trackContentInteraction({
        action: 'refill bookmarks',
        id: sceneId,
        representation: 'result page',
        url: `#${sceneId}`,
      }),
    )
  },
  addBookmark: (sceneId) => {
    const { bookmarks } = get()
    const newBookmarks = [...bookmarks, sceneId]
    set({ bookmarks: newBookmarks.sort((a, b) => a.localeCompare(b)) })
    trackContentInteraction({
      action: 'add bookmark',
      id: sceneId,
      representation: 'result page',
      url: `#${sceneId}`,
    })
  },
  removeBookmark: (sceneId) => {
    const { bookmarks } = get()
    set({ bookmarks: bookmarks.filter((b) => b !== sceneId) })
    trackContentInteraction({
      action: 'remove bookmark',
      id: sceneId,
      representation: 'result page',
      url: `#${sceneId}`,
    })
  },
  isInBookmarks: (sceneId) => {
    const { bookmarks } = get()
    return bookmarks.includes(sceneId)
  },
  toggleBookmark: (sceneId) => {
    const { isInBookmarks, removeBookmark, addBookmark } = get()
    if (isInBookmarks(sceneId)) {
      removeBookmark(sceneId)
    } else {
      addBookmark(sceneId)
    }
  },
}))
