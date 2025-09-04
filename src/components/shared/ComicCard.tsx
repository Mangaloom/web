import Link from "next/link";
import Image from "next/image";
import { RatingComic } from "../RatingComic"; // Pastikan path import ini benar
import type { ComicByGenre } from "@/types";

interface ComicCardProps {
  comic: ComicByGenre;
  priority?: boolean;
}

function CountryFlag({ flag }: { flag: string }) {
  return (
    <Image
      src={`https://flagcdn.com/w40/${flag}.png`}
      alt={`${flag} flag`}
      width={25}
      height={10}
      loading="eager"
      unoptimized
      className="shadow"
    />
  );
}

export const ComicCard = ({ comic, priority = false }: ComicCardProps) => {
  const { title, type, thumbnail, href, chapter, rating } = comic;

  const flagMap: Record<string, string> = {
    manga: "jp",
    manhwa: "kr",
    manhua: "cn",
  };

  const flagCode = flagMap[type.toLowerCase()];

  return (
    <Link
      href={`/komik${href}`}
      className="bg-transparent text-white rounded-lg overflow-hidden transition group"
      data-prevent-nprogress={true}
    >
      {/* Thumbnail */}
      <div className="aspect-[3/4] w-full relative">
        <Image
          width={200}
          height={300}
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          src={thumbnail || "/placeholder.png"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Bendera di kanan atas */}
        {flagCode && (
          <div className="absolute top-2 right-2">
            <CountryFlag flag={flagCode} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2 flex flex-col">
        <h3 className="text-sm font-bold truncate text-white mt-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-slate-300">{type}</p>
          <span className="text-xs text-slate-300">{chapter}</span>
        </div>
        <RatingComic rating={rating} className="mt-2" size={14} />
      </div>
    </Link>
  );
};
