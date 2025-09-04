import type { KomikData } from "@/types";

interface ComicJsonLdProps {
  comic: KomikData;
  href: string;
}

export const ComicJsonLd = ({ comic, href }: ComicJsonLdProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ComicSeries",
    name: comic.title,
    alternateName: comic.altTitle,
    description: comic.description || `Baca komik ${comic.title} gratis.`,
    author: {
      "@type": "Person",
      name: comic.author,
    },
    genre: comic.genre.map((g) => g.title),
    image: comic.thumbnail,
    url: `https://mangaloom.app/komik/${href}`, // Pastikan URL sesuai
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
