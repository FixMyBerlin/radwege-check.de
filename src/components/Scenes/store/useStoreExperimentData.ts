import create from 'zustand'
import { AggregationConfig } from '../constants'

type ExperimentTextKey = null | 'primary' | 'secondary'

export type StoreExperimentData = {
  itemJsConfig: null | any
  setItemJsConfig: (config) => void

  aggregationConfig: null | AggregationConfig
  setAggregationConfig: (config: AggregationConfig) => void

  experimentTextKey: ExperimentTextKey
  setExperimentTextKey: (input: ExperimentTextKey) => void
}

export const useStoreExperimentData = create<StoreExperimentData>((set) => ({
  itemJsConfig: null,
  setItemJsConfig: (config) => {
    set({ itemJsConfig: config })
  },

  aggregationConfig: null,
  setAggregationConfig: (config) => {
    set({ aggregationConfig: config })
  },

  experimentTextKey: null,
  setExperimentTextKey: (input) => {
    set({ experimentTextKey: input })
  },
}))
