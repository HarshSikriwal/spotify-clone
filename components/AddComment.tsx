import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import usePlayer from "@/hooks/usePlayer";
import useGetSongById from "@/hooks/useGetSongById";
import toast from "react-hot-toast";

const AddComment = ({
  fetchComments,
  loggedIn,
}: {
  fetchComments: () => void;
  loggedIn: boolean;
}) => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState<string>("");
  const { user } = useUser();
  const authModal = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const handleSubmit = async () => {
    if (user && value !== "") {
      try {
        setIsLoading(true);
        const { error: supabaseError } = await supabaseClient
          .from("comments")
          .insert({
            user_id: user?.id,
            content: value,
            song_id: song?.id,
            user_email: user?.email,
          });
        if (supabaseError) {
          setIsLoading(false);
          return toast.error(supabaseError.message);
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        fetchComments();
        setIsLoading(false);
      }
    }
  };
  const checkSession = () => {
    if (!user) {
      return authModal.onOpen();
    }
  };
  return (
    <div className="flex flex-col gap-1">
      <Input
        disabled={isLoading}
        id="comment"
        placeholder="Add Comment"
        className="py-2"
        onChange={(e) => setValue(e.target.value)}
        onClick={checkSession}
      />

      <Button
        onClick={handleSubmit}
        className="w-fit p-1 rounded-lg text-sm self-end"
        disabled={!loggedIn}
      >
        Comment
      </Button>
    </div>
  );
};

export default AddComment;
