import React, { useEffect } from "react";
import Modal from "./Modal";
import useCommentModal from "@/hooks/useCommentModal";
import usePlayer from "@/hooks/usePlayer";
import useGetSongById from "@/hooks/useGetSongById";
import useGetCommentsById from "@/hooks/useGetCommentsById";
import AddComment from "./AddComment";
import { useUser } from "@/hooks/useUser";

const CommentModal = () => {
  const player = usePlayer();
  const user = useUser();
  const { song } = useGetSongById(player.activeId);
  const { comments, fetchComments } = useGetCommentsById(player.activeId);
  const { onClose, isOpen } = useCommentModal();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const getUserName = (email: string) => {
    const atIndex = email.indexOf("@");
    const userName = email.substring(0, atIndex);
    return userName;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = Number(currentDate) - Number(date);

    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    if (timeDifference > oneDayInMilliseconds) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    } else {
      const hoursAgo = Math.round(timeDifference / (60 * 60 * 1000));
      if (hoursAgo === 0) {
        return "just now";
      }
      return `${hoursAgo} hours ago`;
    }
  };

  return (
    <Modal
      title={`Comments on ${song?.title}`}
      description={`${comments?.length} comments`}
      isOpen={isOpen}
      onChange={onChange}
    >
      <div className="flex flex-col gap-2">
        <AddComment fetchComments={fetchComments} loggedIn={!!user.user} />
        <div className="flex flex-col gap-4 h-full lg:h-[350px] overflow-auto custom-scrollbar pr-2">
          {comments?.map((comment_data) => (
            <div className="flex flex-col" key={comment_data.id}>
              <div className="flex justify-between">
                <p className="text-md text-gray-300">
                  {getUserName(comment_data.user_email)}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(comment_data.created_at)}
                </p>
              </div>
              <p className="text-lg">{comment_data.content}</p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default CommentModal;
