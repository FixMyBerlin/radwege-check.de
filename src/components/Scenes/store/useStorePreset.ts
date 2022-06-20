import create from 'zustand'
import { PresetsScenes } from '../constants'

type StorePresetKey = null | string | 'custom'

export type StorePreset = {
  presets: null | PresetsScenes
  setPresets: (presets: PresetsScenes) => void
  currentPresetKey: StorePresetKey
  setCurrentPresetKey: (newKey: StorePresetKey) => void
}

export const useStorePreset = create<StorePreset>((set) => ({
  presets: null,
  setPresets: (presets) => set({ presets }),
  currentPresetKey: null,
  setCurrentPresetKey: (newKey: StorePresetKey) => {
    set({ currentPresetKey: newKey })
  },
}))
