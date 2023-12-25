import { Article, Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";

const useGetAudioById = (type: "song" | "article", id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [audio, setAudio] = useState<Song | Article | undefined>(undefined);

  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSongOrArticle = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setAudio(data as Song);
        setIsLoading(false);
        return;
      }

      const { data: audioData, error: audioError } = await supabaseClient
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      if (audioData) {
        setAudio(audioData as Article);
        setIsLoading(false);
      }
      if (audioError) {
        toast.error("Could not load song or article");
      }
    };

    fetchSongOrArticle();
  }, [id, supabaseClient]);

  return { isLoading, audio };
};

export default useGetAudioById;
