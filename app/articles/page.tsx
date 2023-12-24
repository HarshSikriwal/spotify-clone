import Header from "@/components/Header";
import Image from "next/image";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import UploadArticle from "./components/UploadArticle";

const Articles = async () => {
  const onClick = () => {};
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mt-20">
          <div className="flex justify-between items-center">
            <div className="flex flex-col md:flex-row items-center gap-x-5 grow">
              <div className="relative h-32 w-32 lg:h-44 lg:w-44">
                <Image
                  fill
                  alt="Playlist"
                  className="object-cover"
                  src="/images/audiobook.png"
                />
              </div>
              <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                <p className="hidden md:block font-semibold text-sm">
                  Playlist
                </p>
                <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">
                  Audio Articles
                </h1>
              </div>
            </div>
            <UploadArticle />
          </div>
        </div>
      </Header>
    </div>
  );
};

export default Articles;
