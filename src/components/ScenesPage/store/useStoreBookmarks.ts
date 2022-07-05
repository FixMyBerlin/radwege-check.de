import create from 'zustand'

export type StoreBookmarksData = {
  enableBookmarksFeature: boolean
  setBookmarksFeatureEnabled: (enableBookmarksFeature: boolean) => void
}

export const useStoreBookmarks = create<StoreBookmarksData>((set) => ({
  enableBookmarksFeature: true,
  setBookmarksFeatureEnabled: (enableBookmarksFeature) =>
    set({ enableBookmarksFeature }),
}))
