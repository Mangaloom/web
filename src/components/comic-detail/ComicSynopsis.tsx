import Link from "next/link";
import type { Genre } from "@/types";

interface ComicSynopsisProps {
  description: string;
  title: string;
  genres: Genre[];
}

export const ComicSynopsis = ({
  description,
  title,
  genres,
}: ComicSynopsisProps) => (
  <>
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Sinopsis</h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {description || "Tidak ada sinopsis."}
      </p>
    </div>
    <div className="mt-10">
      <p className="text-gray-400 text-sm leading-relaxed">
        Baca komik <strong>{title}</strong> secara online dan gratis hanya di
        Mangaloom. Sebagai salah satu komik dengan genre{" "}
        {genres.map((g) => g.title).join(", ")}, cerita ini menawarkan alur yang
        menegangkan dan visual yang memukau. Jangan lewatkan update chapter
        terbaru dari manga <strong>{title}</strong> dan ikuti terus
        perkembangannya di situs{" "}
        <Link
          href="https://mangaloom.app"
          className="text-primary hover:underline"
        >
          Mangaloom
        </Link>
        . Temukan juga berbagai rekomendasi komik lainnya yang tak kalah menarik
        di platform kami.
      </p>
    </div>
  </>
);
