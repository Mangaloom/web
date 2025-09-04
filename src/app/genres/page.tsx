import { getAllGenres } from "@/action/comics";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Daftar Genre Komik Lengkap - Manga, Manhwa, Manhua | Mangaloom",
  description:
    "Explore koleksi lengkap genre komik di Mangaloom! Baca manga, manhwa, dan manhua gratis dengan genre Action, Romance, Isekai, Fantasy, Slice of Life, Horror, Comedy, Drama, dan masih banyak lagi. Platform baca komik online terbaik Indonesia.",
  keywords: [
    "mangaloom",
    "baca komik online",
    "manga gratis",
    "manhwa indonesia",
    "manhua terbaru",
    "genre komik",
    "action manga",
    "romance manhwa",
    "isekai manga",
    "fantasy komik",
    "komik online gratis",
    "webtoon indonesia",
  ],
  authors: [{ name: "Mangaloom Team" }],
  creator: "Mangaloom",
  publisher: "Mangaloom",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Daftar Genre Komik Lengkap - Manga, Manhwa, Manhua | Mangaloom",
    description:
      "Explore koleksi lengkap genre komik di Mangaloom! Baca manga, manhwa, dan manhua gratis dengan berbagai genre menarik.",
    url: "https://mangaloom.app/genres",
    siteName: "Mangaloom",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daftar Genre Komik Lengkap | Mangaloom",
    description:
      "Explore koleksi lengkap genre komik di Mangaloom! Baca manga, manhwa, dan manhua gratis.",
    creator: "@mangaloomapp",
  },
  alternates: {
    canonical: "https://mangaloom.app/genres",
  },
};

const GenresPage = async () => {
  const genres = await getAllGenres();

  return (
    <div className="container mx-auto p-4 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 border-l-4 border-primary pl-4">
        Daftar Genre
      </h1>
      {genres.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {genres.map((genre) => {
            const slug = genre.href.replace(/\//g, "");
            return (
              <Link
                href={`/genres/${slug}/1`}
                key={genre.href}
                className="bg-gray-800 p-4 rounded-lg text-center font-semibold hover:bg-primary hover:text-white transition-colors duration-200"
              >
                {genre.title}
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400">
          Gagal memuat daftar genre. Silakan coba lagi nanti.
        </p>
      )}
    </div>
  );
};

export default GenresPage;
