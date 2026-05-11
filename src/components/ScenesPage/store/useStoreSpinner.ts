import { create } from "zustand";
import { useStore } from "zustand";

type SpinnerState = {
  showSpinner: boolean;
};

type SpinnerActions = {
  setShowSpinner: (newState: boolean) => void;
};

export type StoreSpinner = SpinnerState & { actions: SpinnerActions };

const spinnerStore = create<StoreSpinner>((set) => ({
  showSpinner: true,
  actions: {
    setShowSpinner: (showSpinner) => set({ showSpinner }),
  },
}));

export const useShowSpinner = () => useStore(spinnerStore, (s) => s.showSpinner);

export const useSpinnerActions = () => useStore(spinnerStore, (s) => s.actions);

export const getSpinnerActions = () => spinnerStore.getState().actions;
