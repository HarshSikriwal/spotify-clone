import { Article, Song } from "@/types";
import { create } from "zustand";

interface PlayerStore {
  songs: Song[];
  articles: Article[];
  setSongs: (songs: Song[]) => void;
  setArticles: (articles: Article[]) => void;
}

const useSongsAndArticles = create<PlayerStore>((set) => ({
  songs: [],
  articles: [],
  setSongs: (songs: Song[]) => set({ songs: songs }),
  setArticles: (articles: Article[]) => set({ articles: articles }),
}));

export default useSongsAndArticles;
