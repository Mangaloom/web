import { getPopularComics } from "@/action/comics";
import { PopularItem } from "./popular-item";

export default async function PopularAside() {
  const popularManga = await getPopularComics();
  return (
    <aside className="w-full md:w-1/2 lg:w-1/4 h-fit bg-primary p-4 rounded-lg flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Paling Dilihat</h2>
      </div>

      <div className="space-y-3">
        {popularManga.map((manga, idx) => (
          <PopularItem key={idx} rank={idx + 1} {...manga} priority={idx < 3} />
        ))}
      </div>
    </aside>
  );
}
