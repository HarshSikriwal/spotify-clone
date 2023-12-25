"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Article, Song } from "@/types";
import Image from "next/image";
import PlayButton from "./PlayButton";
import Link from "next/link";

interface SongItemProps {
  data: Article;
  onClick: (id: string) => void;
}

const ArticleItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden ">
        <Image
          className="object-cover"
          src={"/images/audiobook.png"}
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <Link href={data.url}>Article Link</Link>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default ArticleItem;
