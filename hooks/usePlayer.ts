import { create } from "zustand";

interface PlayerStore {
  ids: string[];
  activeId?: string;
  type: "song" | "article" | undefined;
  setType: (type: "song" | "article") => void;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  type: undefined,
  setType: (type: "song" | "article") => set({ type: type }),
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ ids: [], activeId: undefined }),
}));

export default usePlayer;
