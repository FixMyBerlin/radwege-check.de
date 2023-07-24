import { create } from 'zustand'

export type StoreResetFilterEnabled = {
  resetFilterEnabled: boolean
  setResetFilterEnabled: (newState: boolean) => void
}

export const useStoreResetFilterEnabled = create<StoreResetFilterEnabled>(
  (set) => ({
    resetFilterEnabled: false,
    setResetFilterEnabled: (resetFilterEnabled) => set({ resetFilterEnabled }),
  }),
)
