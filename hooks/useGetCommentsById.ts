import { Comment } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useGetCommentsById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const { supabaseClient } = useSessionContext();
  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchComments = async () => {
      const { data, error } = await supabaseClient
        .from("comments")
        .select("*")
        .eq("song_id", id);

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }
      setComments(data);
      setIsLoading(false);
      console.log(comments);
    };
    fetchComments();
  }, [id, supabaseClient]);
  return useMemo(
    () => ({
      isLoading,
      comments,
    }),
    [isLoading, comments]
  );
};

export default useGetCommentsById;
