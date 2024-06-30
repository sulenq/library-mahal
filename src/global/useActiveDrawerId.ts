import { create } from "zustand";

interface State {
  activeDrawerId: string[];
}

interface Actions {
  setActiveDrawerId: (newState: string[]) => void;
}

const useActiveDrawerId = create<State & Actions>((set) => ({
  activeDrawerId: [],
  setActiveDrawerId: (newState: string[]) => set({ activeDrawerId: newState }),
}));

export default useActiveDrawerId;
