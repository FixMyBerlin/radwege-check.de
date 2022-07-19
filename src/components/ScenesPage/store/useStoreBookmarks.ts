import create from 'zustand'

type SceneIds = string

export type StoreBookmarksData = {
  bookmarks: SceneIds[]
  addBookmark: (bookmark: SceneIds) => void
  removeBookmark: (sceneId: string) => void
  isInBookmarks: (sceneId: string) => boolean
  toggleBookmark: (sceneId: string) => void
}

export const useStoreBookmarks = create<StoreBookmarksData>((set, get) => ({
  bookmarks: [],
  addBookmark: (bookmark) => {
    const { bookmarks } = get()
    const newBookmarks = [...bookmarks, bookmark]
    set({ bookmarks: newBookmarks.sort((a, b) => a.localeCompare(b)) })
  },
  removeBookmark: (sceneId) => {
    const { bookmarks } = get()
    set({ bookmarks: bookmarks.filter((b) => b !== sceneId) })
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
