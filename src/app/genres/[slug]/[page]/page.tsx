import { GenreComicList } from "@/components/genre/GenreComicList";
import { Metadata } from "next";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; page: string }>;
}): Promise<Metadata> {
  const { slug, page } = await params;
  const genreName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  const pageNumber = page;

  return {
    title: `${genreName} Manga, Manhwa & Komik Terbaik - Halaman ${pageNumber} | Mangaloom`,
    description: `Baca koleksi lengkap komik ${genreName} terbaru dan terpopuler. Ribuan judul manga, manhwa, dan manhua genre ${genreName} gratis. Update harian, kualitas HD, baca online di Mangaloom halaman ${pageNumber}.`,
    keywords: `${genreName}, manga ${genreName}, manhwa ${genreName}, komik ${genreName}, baca komik online, manga indonesia, manhwa indonesia, komik gratis, manga terbaru`,
    openGraph: {
      title: `${genreName} Manga & Manhwa Terbaik - Halaman ${pageNumber}`,
      description: `Koleksi komik ${genreName} terlengkap. Baca manga, manhwa, dan manhua ${genreName} gratis di Mangaloom.`,
      type: "website",
      siteName: "Mangaloom",
    },
    twitter: {
      card: "summary_large_image",
      title: `${genreName} Manga & Manhwa - Halaman ${pageNumber}`,
      description: `Baca komik ${genreName} terbaik gratis di Mangaloom. Update harian!`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `/genres/${slug}/${page}`,
    },
  };
}
const GenreListPage = async ({
  params,
}: {
  params: Promise<{ slug: string; page: string }>;
}) => {
  const { slug, page } = await params;
  const pageNumber = parseInt(page, 10);
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
      <h1 className="text-3xl font-bold my-5 text-primary">{genreTitle}</h1>
      <GenreComicList slug={slug} pageNumber={pageNumber} />
    </div>
  );
};

export default GenreListPage;
