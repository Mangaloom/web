import { getComicsByGenre } from "@/action/comics";
import { ComicCard } from "@/components/shared/ComicCard";
import { Pagination } from "@/components/shared/Pagination";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const runtime = "edge";
export async function generateMetadata({
  params,
}: {
  params: { slug: string; page: string };
}): Promise<Metadata> {
  const genreName = params.slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  const pageNumber = params.page;

  return {
    title: `Komik Genre ${genreName} - Halaman ${pageNumber}`,
    description: `Daftar komik, manga, manhwa, dan manhua dengan genre ${genreName}. Baca sekarang di halaman ${pageNumber}.`,
  };
}

const GenreListPage = async ({
  params,
}: {
  params: { slug: string; page: string };
}) => {
  const { slug, page } = params;
  const pageNumber = parseInt(page, 10);

  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  const response = await getComicsByGenre(slug, pageNumber);

  if (!response || !response.data || response.data.length === 0) {
    notFound();
  }

  const { data: comics, current_page, length_page } = response;
  const genreTitle = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="container mx-auto p-4 text-white min-h-screen">
      <h1 className="text-3xl font-bold my-5">
        Genre: <span className="text-primary">{genreTitle}</span>
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {comics.map((comic) => (
          <ComicCard key={comic.href} comic={comic} />
        ))}
      </div>

      <Pagination
        currentPage={current_page}
        totalPages={length_page}
        basePath={`/genres/${slug}`}
      />
    </div>
  );
};

export default GenreListPage;
