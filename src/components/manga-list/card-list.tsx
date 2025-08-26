"use client";

import Link from "next/link";
import React from "react";
import { Rating, RatingButton } from "@/components/ui/kibo-ui/rating";

import Image from "next/image";
import { RatingComic } from "../RatingComic";

export type CardMangaProps = {
  title: string;
  type: "Manga" | "Manhwa" | "Manhua" | string;
  thumbnail: string;
  href: string;
  chapter: string;
  rating: string;
};

function CountryFlag({ flag }: { flag: string }) {
  return (
    <Image
      src={`https://flagcdn.com/w40/${flag}.png`}
      alt=""
      width={25}
      height={10}
      loading="lazy"
      unoptimized
      className="shadow"
    />
  );
}

export const CardList = ({
  title,
  type,
  thumbnail,
  href,
  chapter,
  rating,
}: CardMangaProps) => {
  const flagMap: Record<string, string> = {
    manga: "jp",
    manhwa: "kr",
    manhua: "cn",
  };

  return (
    <Link
      href={`/komik${href}`}
      className="bg-transparent text-white rounded-lg overflow-hidden transition"
      data-prevent-nprogress={true}
    >
      {/* Thumbnail */}
      <div className="aspect-[3/4] w-full relative">
        <Image
          width={200}
          height={300}
          loading="lazy"
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Flag di kanan atas */}
        {flagMap[type.toLowerCase()] && (
          <div className="absolute top-2 right-2">
            <CountryFlag flag={flagMap[type.toLowerCase()]} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2">
        <h3 className="text-xs font-bold truncate text-white border-t border-white">
          {title}
        </h3>
        <p className="text-xs text-slate-300">{type}</p>
        <span className="text-[10px]">{chapter}</span>

        <RatingComic rating={rating} className="justify-between" size={14} />
      </div>
    </Link>
  );
};
