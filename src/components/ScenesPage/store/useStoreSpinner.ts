import create from 'zustand'

export type StoreSpinner = {
  showSpinner: boolean
  setShowSpinner: (newState: boolean) => void
}

export const useStoreSpinner = create<StoreSpinner>((set) => ({
  showSpinner: false,
  setShowSpinner: (showSpinner) => set({ showSpinner }),
}))
