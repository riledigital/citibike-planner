import { create } from "zustand";

type State = {
  currentStationId: string | null;
  setCurrentStationId: (id: string) => void;
  showInspector: boolean;
  setShowInspector: (show: boolean) => void;
};

export const useStationState = create<State>((set) => ({
  currentStationId: null,
  setCurrentStationId: (newId: string) => set({ currentStationId: newId }),
  showInspector: false,
  setShowInspector: (show: boolean) => set({ showInspector: show }),
}));
