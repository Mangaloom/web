import NewestComics from "@/components/manga-list/newest";
import { Recommended } from "@/components/manga-list/recommended";
import PopularAside from "@/components/popular-list/popular";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "edge";

export default function Home() {
  return (
    <main className="min-h-screen text-foreground px-[0.5em] sm:px-[1em] md:px-[8vw] lg:px-[10vw] pt-6 pb-16 md:pb-24 lg:pb-32 mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col max-w-5xl gap-5">
          <Recommended />
          <NewestComics />
        </div>
        <PopularAside />
      </div>
    </main>
  );
}
