import { getDetailComic } from "@/action/comics";
import { RatingComic } from "@/components/RatingComic";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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

  return {
    title: `${detailComic.title} (${detailComic.altTitle}) | Baca Komik Online`,
    description:
      detailComic.description ||
      `Baca komik ${detailComic.title} dengan genre ${detailComic.genre
        .map((g) => g.title)
        .join(", ")} secara gratis.`,
    openGraph: {
      title: detailComic.title,
      description:
        detailComic.description ||
        `Baca komik ${detailComic.title} terbaru dengan update chapter lengkap.`,
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

export default async function DetailComic({
  params,
}: {
  params: { href: string };
}) {
  const { href } = params;
  const detailComic = await getDetailComic(href);

  const infoList = [
    { label: "Status", value: detailComic.status },
    { label: "Tipe", value: detailComic.type },
    { label: "Rilis", value: detailComic.released },
    { label: "Author", value: detailComic.author },
    { label: "Update", value: detailComic.updatedOn },
  ];

  if (!detailComic) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Komik tidak ditemukan.
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ComicSeries",
    name: detailComic.title,
    alternateName: detailComic.altTitle,
    description:
      detailComic.description || `Baca komik ${detailComic.title} gratis.`,
    author: {
      "@type": "Person",
      name: detailComic.author,
    },
    genre: detailComic.genre.map((g) => g.title),
    image: detailComic.thumbnail,
    url: `https://mangaloom.app/komik/${href}`,
  };

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 md:flex md:space-x-6">
        <div className="md:w-1/3">
          <Image
            src={detailComic.thumbnail}
            alt={detailComic.title}
            width={300}
            height={450}
            className="rounded-lg w-full object-cover"
            priority
          />
        </div>
        <div className="md:w-2/3 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-1">{detailComic.title}</h1>
          <h2 className="text-xl text-gray-400 mb-4">{detailComic.altTitle}</h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {detailComic.genre.map((genre) => (
              <Link
                href={genre.href}
                key={genre.href}
                className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-primary/80 transition-colors"
              >
                {genre.title}
              </Link>
            ))}
          </div>

          <div className="mt-4 border-t border-b border-gray-700 py-4">
            <dl className="space-y-2 text-sm">
              {infoList.map((item) => (
                <div key={item.label} className="flex">
                  <dt className="w-24 text-gray-400 font-medium">
                    {item.label}
                  </dt>
                  <dd className="text-white">{item.value}</dd>
                </div>
              ))}
              <div className="flex items-center">
                <dt className="w-24 text-gray-400 font-medium">Rating</dt>
                <dd className="flex items-center">
                  <RatingComic rating={detailComic.rating} size={16} />
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Sinopsis</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {detailComic.description || "Tidak ada sinopsis."}
            </p>
          </div>

          {/* tambahkan dibawah sini copy writing dinamik agar meningkatkan seo */}
          <div className="mt-10">
            <p className="text-gray-400 text-sm leading-relaxed">
              Baca komik <strong>{detailComic.title}</strong> secara online dan
              gratis hanya di Mangaloom. Sebagai salah satu komik dengan genre{" "}
              {detailComic.genre.map((g) => g.title).join(", ")}, cerita ini
              menawarkan alur yang menegangkan dan visual yang memukau. Jangan
              lewatkan update chapter terbaru dari manga{" "}
              <strong>{detailComic.title}</strong> dan ikuti terus
              perkembangannya di situs{" "}
              <Link
                href="https://mangaloom.app"
                className="text-primary hover:underline"
              >
                Mangaloom
              </Link>
              . Temukan juga berbagai rekomendasi komik lainnya yang tak kalah
              menarik di platform kami.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4">Daftar Chapter</h3>
        <div className="max-h-96 overflow-y-auto pr-2">
          <ul className="space-y-2">
            {detailComic.chapter.map((chap) => (
              <li key={chap.href}>
                <Link
                  href={`/baca${chap.href.replace("/chapter", "")}`}
                  className="flex justify-between items-center p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
                >
                  <span className="font-medium">{chap.title.trim()}</span>
                  <span className="text-sm text-gray-400">{chap.date}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
