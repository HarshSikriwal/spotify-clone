import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getArticles = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({ cookies });

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });
  //   console.log(data);
  if (error) {
    console.log(error);
  }
  return (data as any) || [];
};

export default getArticles;
