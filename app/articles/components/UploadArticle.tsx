"use client";
import useArticleUploadModal from "@/hooks/useArticleUploadModal";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const UploadArticle = () => {
  const authModal = useAuthModal();
  const articleUploadModal = useArticleUploadModal();
  const { user } = useUser();
  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return articleUploadModal.onOpen();
  };
  return (
    <div
      onClick={onClick}
      className="text-neutral-400 cursor-pointer hover:text-white transition rounded-full border-black bg-black p-2"
    >
      <AiOutlinePlus size={30} className="text-white" />
    </div>
  );
};

export default UploadArticle;
