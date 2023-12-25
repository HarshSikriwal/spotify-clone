"use client";

import useGetAudioById from "@/hooks/useGetAudioById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();

  const { audio } = useGetAudioById(player.type!, player.activeId);

  const audioUrl = useLoadSongUrl(audio!, player.type!);

  if (!audio || !audioUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent
        audio={audio}
        audioUrl={audioUrl}
        key={audioUrl}
        type={player.type!}
      />
    </div>
  );
};

export default Player;
