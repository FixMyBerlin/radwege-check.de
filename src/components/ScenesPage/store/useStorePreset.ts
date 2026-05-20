import { create } from 'zustand'
import { useStore } from 'zustand'

import type { PresetsScenes } from '../constants'

type StorePresetKey = null | string | 'custom'

type PresetState = {
  presets: PresetsScenes
  currentPresetKey: StorePresetKey
}

type PresetActions = {
  setPresets: (presets: PresetsScenes) => void
  setCurrentPresetKey: (newKey: StorePresetKey) => void
}

type StorePreset = PresetState & { actions: PresetActions }

const presetStore = create<StorePreset>((set) => ({
  presets: {},
  currentPresetKey: null,
  actions: {
    setPresets: (presets) => set({ presets }),
    setCurrentPresetKey: (currentPresetKey) => set({ currentPresetKey }),
  },
}))

export const usePresetPresets = () => useStore(presetStore, (s) => s.presets)

export const usePresetCurrentKey = () => useStore(presetStore, (s) => s.currentPresetKey)

export const usePresetActions = () => useStore(presetStore, (s) => s.actions)

export const getPresetActions = () => presetStore.getState().actions
