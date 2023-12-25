import { Article, Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";

const useGetAudioById = (type: "song" | "article", id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [audio, setAudio] = useState<Song | Article | undefined>(undefined);
  const { supabaseClient } = useSessionContext();
  console.log(type, "audiobyid");
  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);
    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setAudio(data as Song);
      setIsLoading(false);
    };
    const fetchArticle = async () => {
      const { data, error } = await supabaseClient
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setAudio(data as Article);
      setIsLoading(false);
    };

    if (type === "song") {
      fetchSong();
    }
    if (type === "article") {
      fetchArticle();
    }
  }, [id, supabaseClient, type]);

  return { isLoading, audio };
  // return useMemo(
  //   () => ({
  //     isLoading,
  //     audio,
  //     type,
  //   }),
  //   [isLoading, audio, type]
  // );
};

export default useGetAudioById;
