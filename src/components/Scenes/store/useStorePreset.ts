import create from 'zustand'

type StorePresetKey = null | string | 'custom'

export type StorePreset = {
  currentPresetKey: StorePresetKey
  setCurrentPresetKey: (newKey: StorePresetKey) => void
}

export const useStorePreset = create<StorePreset>((set) => ({
  currentPresetKey: null,
  setCurrentPresetKey: (newKey: StorePresetKey) => {
    set({ currentPresetKey: newKey })
  },
}))
