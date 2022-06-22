import create from 'zustand'

export type StoreBookmarksData = {
  allowBookmarks: boolean
  setAllowBookmarks: (allowBookmarks: boolean) => void
}

export const useStoreBookmarks = create<StoreBookmarksData>((set) => ({
  allowBookmarks: true,
  setAllowBookmarks: (allowBookmarks) => set({ allowBookmarks }),
}))
