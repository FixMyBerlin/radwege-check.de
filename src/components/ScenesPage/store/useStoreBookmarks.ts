import { create } from 'zustand'
import { useStore } from 'zustand'

import { trackContentInteraction } from '~/components/utils'

type SceneIds = string

type BookmarksState = {
  bookmarks: SceneIds[]
}

type BookmarkActions = {
  setBookmarks: (bookmark: SceneIds[]) => void
  addBookmark: (bookmark: SceneIds) => void
  removeBookmark: (sceneId: string) => void
  isInBookmarks: (sceneId: string) => boolean
  toggleBookmark: (sceneId: string) => void
}

type StoreBookmarksData = BookmarksState & { actions: BookmarkActions }

const bookmarksStore = create<StoreBookmarksData>((set, get) => ({
  bookmarks: [],
  actions: {
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
      const { isInBookmarks, removeBookmark, addBookmark } = get().actions
      if (isInBookmarks(sceneId)) {
        removeBookmark(sceneId)
      } else {
        addBookmark(sceneId)
      }
    },
  },
}))

export const useBookmarksState = () => useStore(bookmarksStore, (s) => s.bookmarks)

export const useBookmarkActions = () => useStore(bookmarksStore, (s) => s.actions)
