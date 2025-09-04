import Link from "next/link";
import type { Genre } from "@/types";
import { FavoriteButton } from "./FavoriteButton"; // <- Import komponen baru

// Tipe data untuk identifikasi komik
type ComicIdentifier = {
  href: string;
  title: string;
  thumbnail: string;
};

interface ComicHeaderProps {
  title: string;
  altTitle: string;
  genres: Genre[];
  comicIdentifier: ComicIdentifier; // <- Tambahkan prop baru
}

export const ComicHeader = ({
  title,
  altTitle,
  genres,
  comicIdentifier,
}: ComicHeaderProps) => (
  <>
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
      <div>
        <h1 className="text-3xl font-bold mb-1">{title}</h1>
        <h2 className="text-xl text-gray-400">{altTitle}</h2>
      </div>
      <div className="flex-shrink-0">
        <FavoriteButton comic={comicIdentifier} />
      </div>
    </div>

    <div className="flex flex-wrap gap-2 mb-4">
      {genres.map((genre) => (
        <Link
          href={`${genre.href}1`}
          key={genre.href}
          className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-primary/80 transition-colors"
        >
          {genre.title}
        </Link>
      ))}
    </div>
  </>
);
