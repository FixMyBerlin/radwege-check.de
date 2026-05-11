import { create } from "zustand";
import { useStore } from "zustand";

import type { AggregationConfig } from "../constants";

export type ExperimentTextKey = null | "primary" | "secondary";

type ExperimentDataState = {
  itemJsConfig: null | any;
  aggregationConfig: null | AggregationConfig;
  experimentTextKey: ExperimentTextKey;
};

type ExperimentDataActions = {
  setItemJsConfig: (config: any) => void;
  setAggregationConfig: (config: AggregationConfig) => void;
  setExperimentTextKey: (input: ExperimentTextKey) => void;
};

export type StoreExperimentData = ExperimentDataState & { actions: ExperimentDataActions };

const experimentDataStore = create<StoreExperimentData>((set) => ({
  itemJsConfig: null,
  aggregationConfig: null,
  experimentTextKey: null,
  actions: {
    setItemJsConfig: (itemJsConfig) => set({ itemJsConfig }),
    setAggregationConfig: (aggregationConfig) => set({ aggregationConfig }),
    setExperimentTextKey: (experimentTextKey) => set({ experimentTextKey }),
  },
}));

export const useExperimentItemJsConfig = () => useStore(experimentDataStore, (s) => s.itemJsConfig);

export const useExperimentAggregationConfig = () =>
  useStore(experimentDataStore, (s) => s.aggregationConfig);

export const useExperimentTextKeyState = () =>
  useStore(experimentDataStore, (s) => s.experimentTextKey);

export const useExperimentDataActions = () => useStore(experimentDataStore, (s) => s.actions);

/** Non-React reads (e.g. title helpers, dev checks, route bootstrapping). */
export const getExperimentDataState = () => experimentDataStore.getState();

export const getExperimentDataActions = () => experimentDataStore.getState().actions;
