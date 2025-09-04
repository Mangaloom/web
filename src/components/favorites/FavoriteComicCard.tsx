import Image from "next/image";
import Link from "next/link";
import type { FavoriteComic } from "@/types";

interface FavoriteComicCardProps {
  comic: FavoriteComic;
}

export const FavoriteComicCard = ({ comic }: FavoriteComicCardProps) => {
  return (
    <Link
      href={`/komik/${comic.href}`}
      className="group bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-primary/50 transition-shadow duration-300"
    >
      <div className="relative aspect-[2/3]">
        <Image
          src={comic.thumbnail}
          alt={comic.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3">
        <h3
          className="font-semibold text-white truncate group-hover:text-primary transition-colors"
          title={comic.title}
        >
          {comic.title}
        </h3>
      </div>
    </Link>
  );
};
