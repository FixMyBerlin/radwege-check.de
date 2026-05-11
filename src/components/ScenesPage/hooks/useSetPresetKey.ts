import { useEffect } from "react";
import { usePresetActions, usePresetCurrentKey, usePresetPresets } from "../store";

export const useSetPresetKey = (searchFilters: string | null | undefined) => {
  const presets = usePresetPresets();
  const currentPresetKey = usePresetCurrentKey();
  const { setCurrentPresetKey } = usePresetActions();

  useEffect(() => {
    if (!searchFilters) {
      setCurrentPresetKey(null);
      return;
    }

    const presetKeyMatchingUrlFilters = Object.entries(presets)
      .map(([key, values]) => (values.searchFilterString === searchFilters ? key : undefined))
      .filter((v) => v !== undefined);

    if (presetKeyMatchingUrlFilters.length) {
      setCurrentPresetKey(presetKeyMatchingUrlFilters[0]);
    } else {
      setCurrentPresetKey("custom");
    }
  }, [presets, searchFilters, setCurrentPresetKey]);

  return { presets, currentPresetKey };
};
