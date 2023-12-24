import useCommentModal from "@/hooks/useCommentModal";
import React from "react";
import { MdOutlineInsertComment } from "react-icons/md";

const CommentButton = ({ songId }: { songId: string }) => {
  const commentModal = useCommentModal();
  const handleComments = () => {
    return commentModal.onOpen();
  };
  return (
    <button onClick={handleComments} className="z-40">
      <MdOutlineInsertComment className="text-2xl" />
    </button>
  );
};

export default CommentButton;
