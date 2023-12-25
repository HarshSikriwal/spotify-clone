import { Article, Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSongUrl = (audio: Song | Article, type: "song" | "article") => {
  const supabaseClient = useSupabaseClient();

  if (!audio) {
    return "";
  }
  const { data } = supabaseClient.storage
    .from("songs")
    .getPublicUrl(
      type === "song"
        ? (audio as Song).song_path
        : (audio as Article).audio_path
    );

  return data.publicUrl;
};

export default useLoadSongUrl;
