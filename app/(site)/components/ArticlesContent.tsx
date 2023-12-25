"use client";

import ArticleItem from "@/components/ArticleItem";
import useOnPlay from "@/hooks/useOnPlay";

import { Article } from "@/types";

interface ArticlesContentProps {
  articles: Article[];
}

const ArticlesContent: React.FC<ArticlesContentProps> = ({ articles }) => {
  const onPlay = useOnPlay(articles);

  if (articles.length === 0) {
    return <div className="mt-4 text-neutral-400">No Articles available.</div>;
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4 mt-4">
      {articles.map((item) => (
        <ArticleItem
          key={item.id}
          onClick={(id: string) => onPlay(id, "article")}
          data={item}
        />
      ))}
    </div>
  );
};

export default ArticlesContent;
