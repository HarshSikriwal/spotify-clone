import { Article, Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import useSongsAndArticles from "./useSongsAndArticles";

const useGetAudioById = (type: "song" | "article", id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [audio, setAudio] = useState<Song | Article | undefined>(undefined);
  const songsAndArticles = useSongsAndArticles();

  const { supabaseClient } = useSessionContext();
  console.log("audioById", id);
  console.log("songs", songsAndArticles.songs);
  console.log("articles", songsAndArticles.articles);

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
    console.log(type);
    if (songsAndArticles.songs.find((s) => s.id === id)) {
      console.log("fetching song");
      fetchSong();
    } else {
      console.log("fetching article");

      fetchArticle();
    }
  }, [id, supabaseClient]);

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
