import { useEffect } from 'react'
import { useStore } from 'zustand'
import { useStorePreset } from '../store'

export const useSetPresetKey = (searchFilters: string) => {
  const { presets, currentPresetKey, setCurrentPresetKey } =
    useStore(useStorePreset)

  useEffect(() => {
    if (!searchFilters) {
      setCurrentPresetKey(null)
      return
    }

    const presetKeyMatchingUrlFilters = Object.entries(presets)
      .map(([key, values]) =>
        values.searchFilterString === searchFilters ? key : undefined,
      )
      .filter((v) => v !== undefined)

    if (presetKeyMatchingUrlFilters.length) {
      setCurrentPresetKey(presetKeyMatchingUrlFilters[0])
    } else {
      setCurrentPresetKey('custom')
    }
  }, [presets, searchFilters])

  return { presets, currentPresetKey }
}
