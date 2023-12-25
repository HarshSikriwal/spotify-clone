import { Comment } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useGetCommentsById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);

  const [comments, setComments] = useState<Comment[] | null>(null);
  const { supabaseClient } = useSessionContext();
  const fetchComments = async () => {
    const { data, error } = await supabaseClient
      .from("comments")
      .select("*")
      .eq("song_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      setIsLoading(false);
      if (error.message.startsWith("invalid input syntax for type bigint")) {
        return;
      }
      return toast.error(error.message);
    }
    setComments(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (!id) {
      return;
    }

    fetchComments();
  }, [id, supabaseClient]);
  return { isLoading, comments, fetchComments };
};

export default useGetCommentsById;
