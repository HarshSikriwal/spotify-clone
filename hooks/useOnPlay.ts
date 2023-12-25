import { Article, Song } from "@/types";
import usePlayer from "./usePlayer";

const useOnPlay = (audios: Song[] | Article[]) => {
  const player = usePlayer();
  const onPlay = (id: string, type: "song" | "article") => {
    player.setType(type);
    player.setId(id);
    player.setIds(audios.map((audio) => audio.id));
  };
  return onPlay;
};

export default useOnPlay;
