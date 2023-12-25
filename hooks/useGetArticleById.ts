import { Article } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";

const useGetArticleById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState<Article | undefined>(undefined);
  const { supabaseClient } = useSessionContext();
  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);
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

      setArticle(data as Article);
      setIsLoading(false);
    };

    fetchArticle();
  }, [id, supabaseClient]);

  return useMemo(
    () => ({
      isLoading,
      article,
    }),
    [isLoading, article]
  );
};

export default useGetArticleById;
