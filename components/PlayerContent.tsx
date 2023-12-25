"use client";

import { Article, Song } from "@/types";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import CommentButton from "./CommentButton";
import Image from "next/image";

interface PlayerContentProps {
  audio: Song | Article;
  audioUrl: string;
  type: "song" | "article";
}

const PlayerContent: React.FC<PlayerContentProps> = ({
  audio,
  audioUrl,
  type,
}) => {
  const player = usePlayer();

  const [volume, setVolume] = useState(0.6);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextAudio = player.ids[currentIndex + 1];
    if (!nextAudio) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextAudio);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousAudio = player.ids[currentIndex - 1];
    if (!previousAudio) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousAudio);
  };

  const [play, { pause, sound }] = useSound(audioUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex justify-start">
        <div className="flex items-center gap-x-4 w-full">
          {type === "song" ? (
            <>
              <MediaItem data={audio as Song} />
              <LikeButton songId={(audio as Song).id} />
              <CommentButton songId={(audio as Song).id} />
            </>
          ) : (
            <div
              className="flex items-center gap-x-4 cursor-pointer
        hover:bg-neutral-800/50 w-full p-2 rounded-md grow"
            >
              <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image
                  fill
                  src={"/images/audiobook.png"}
                  alt="Media Item"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">{audio.title}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>
      <div
        className="hidden h-full md:flex justify-center 
      items-center w-full max-w-[722px] gap-x-6 "
      >
        <AiFillStepBackward
          size={30}
          onClick={onPlayPrevious}
          className="text-neutral-400 cursor-pointer 
        hover:text-white transition"
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          size={30}
          onClick={onPlayNext}
          className="text-neutral-400 cursor-pointer 
        hover:text-white transition"
        />
      </div>
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider
            value={volume}
            onChange={(value) => {
              setVolume(value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
