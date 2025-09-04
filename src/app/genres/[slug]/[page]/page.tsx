import { GenreComicList } from "@/components/genre/GenreComicList";
import { Metadata } from "next";

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
    title: `Komik Genre ${genreName} - Halaman ${pageNumber} - Mangaloom`,
    description: `Daftar komik, manga, manhwa, dan manhua dengan genre ${genreName}. Baca sekarang di halaman ${pageNumber}.`,
  };
}

// Halaman ini sekarang menjadi Server Component yang sangat sederhana
const GenreListPage = async ({
  params,
}: {
  params: { slug: string; page: string };
}) => {
  const { slug, page } = params;
  const pageNumber = parseInt(page, 10);

  // Validasi sederhana tetap di sini, tapi notFound dipindahkan ke client component
  if (isNaN(pageNumber) || pageNumber < 1) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-white">Halaman tidak ditemukan.</h2>
      </div>
    );
  }

  const genreTitle = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="container mx-auto p-4 text-white min-h-screen">
      <h1 className="text-3xl font-bold my-5">
        Genre: <span className="text-primary">{genreTitle}</span>
      </h1>

      {/* Memanggil Client Component untuk menangani semua logika dinamis */}
      <GenreComicList slug={slug} pageNumber={pageNumber} />
    </div>
  );
};

export default GenreListPage;
