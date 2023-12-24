import React, { useEffect } from "react";
import Modal from "./Modal";
import useCommentModal from "@/hooks/useCommentModal";
import usePlayer from "@/hooks/usePlayer";
import useGetSongById from "@/hooks/useGetSongById";

const CommentModal = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const { onClose, isOpen } = useCommentModal();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="Comments"
      description={`Comments on ${song?.title}`}
      isOpen={isOpen}
      onChange={onChange}
    >
      Comments
    </Modal>
  );
};

export default CommentModal;
