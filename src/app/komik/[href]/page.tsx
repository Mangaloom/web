import { getDetailComic } from "@/action/comics";
import { Metadata } from "next";
import { ChapterList } from "@/components/comic-detail/ChapterList";
import { ComicHeader } from "@/components/comic-detail/ComicHeader";
import { ComicImage } from "@/components/comic-detail/ComicImage";
import { ComicInfo } from "@/components/comic-detail/ComicInfo";
import { ComicSynopsis } from "@/components/comic-detail/ComicSynopsis";
import { ComicJsonLd } from "@/components/comic-detail/ComicJsonLd";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { href: string };
}): Promise<Metadata> {
  const { href } = params;
  const detailComic = await getDetailComic(href);

  if (!detailComic) {
    return {
      title: "Komik tidak ditemukan | Baca Komik Online",
      description: "Halaman komik tidak tersedia atau telah dihapus.",
    };
  }

  const description =
    detailComic.description ||
    `Baca komik ${detailComic.title} dengan genre ${detailComic.genre
      .map((g) => g.title)
      .join(", ")} secara gratis.`;

  return {
    title: `Mangaloom - ${detailComic.title} (${detailComic.altTitle}) | Baca Komik Online`,
    description,
    openGraph: {
      title: detailComic.title,
      description: `Baca komik ${detailComic.title} terbaru dengan update chapter lengkap.`,
      url: `/komik/${href}`,
      siteName: "Baca Komik Online",
      images: [
        {
          url: detailComic.thumbnail,
          width: 600,
          height: 900,
          alt: detailComic.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: detailComic.title,
      description: detailComic.description || "Baca komik online gratis.",
      images: [detailComic.thumbnail],
    },
    keywords: [
      detailComic.title,
      detailComic.altTitle,
      ...detailComic.genre.map((g) => g.title),
      "baca komik",
      "komik online",
      "manga",
      "manhwa",
      "manhua",
    ],
  };
}

export default async function DetailComicPage({
  params,
}: {
  params: { href: string };
}) {
  const { href } = params;
  const detailComic = await getDetailComic(href);

  if (!detailComic) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Komik tidak ditemukan.
      </div>
    );
  }

  return (
    <>
      <ComicJsonLd comic={detailComic} href={href} />
      <div className="container mx-auto p-4 text-white">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 md:flex md:space-x-6">
          <ComicImage src={detailComic.thumbnail} alt={detailComic.title} />
          <div className="md:w-2/3 mt-4 md:mt-0">
            <ComicHeader
              comicIdentifier={{
                href: href,
                title: detailComic.title,
                thumbnail: detailComic.thumbnail,
              }}
              title={detailComic.title}
              altTitle={detailComic.altTitle}
              genres={detailComic.genre}
            />
            <ComicInfo
              status={detailComic.status}
              type={detailComic.type}
              released={detailComic.released}
              author={detailComic.author}
              updatedOn={detailComic.updatedOn}
              rating={detailComic.rating}
            />
            <ComicSynopsis
              description={detailComic.description}
              title={detailComic.title}
              genres={detailComic.genre}
            />
          </div>
        </div>

        <ChapterList chapters={detailComic.chapter} />
      </div>
    </>
  );
}
