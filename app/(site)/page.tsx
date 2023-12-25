import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import SongContent from "./components/SongContent";
import getArticles from "@/actions/getArticles";
import ArticlesContent from "../../components/ArticlesContent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  const articles = await getArticles();

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
          <div className="grid  grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-4">
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            />
            <ListItem
              image="/images/audiobook.png"
              name="Audio Articles"
              href="articles"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-white text-2xl font-semibold">
                Newest Songs
              </h1>
            </div>
            <SongContent songs={songs} />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-white text-2xl font-semibold">
                Newest Articles
              </h1>
            </div>
            <ArticlesContent articles={articles} />
          </div>
        </div>
      </div>
    </div>
  );
}
