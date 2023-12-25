import { Article, Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSongUrl = (audio: Song | Article, type: "song" | "article") => {
  const supabaseClient = useSupabaseClient();

  if (!audio) {
    return "";
  }
  if ((audio as Article).audio_path) {
    return (audio as Article).audio_path;
  }

  const { data } = supabaseClient.storage
    .from("songs")
    .getPublicUrl((audio as Song).song_path);

  return data.publicUrl;
};

export default useLoadSongUrl;
