"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

type PopularItemProps = {
  rank: number;
  title: string;
  href: string;
  thumbnail: string;
  year: string;
  genre: string;
  priority?: boolean;
};

export function PopularItem({
  rank,
  title,
  href,
  thumbnail,
  year,
  genre,
  priority = false,
}: PopularItemProps) {
  const rankColors: { [key: number]: string } = {
    1: "bg-yellow-500 text-white", // Gold
    2: "bg-gray-400 text-white", // Silver
    3: "bg-orange-400 text-white", // Bronze
  };

  // Default color for ranks 4 and above
  const rankColorClass = rankColors[rank] || "bg-gray-700 text-white";

  return (
    <Link href={`/komik${href}`} className="flex items-center gap-3 mb-3">
      {/* Container for Thumbnail and Rank */}
      <div className="relative flex-shrink-0 w-12">
        {/* Thumbnail Image */}
        <Image
          src={thumbnail}
          alt={title}
          width={48}
          height={64}
          sizes="48px"
          loading="eager"
          priority={priority}
          className="w-12 h-16 object-cover rounded"
        />
        {/* Rank Badge */}
        <span
          className={`absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 flex items-center justify-center text-sm font-bold rounded-full ${rankColorClass}`}
        >
          {rank}
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-col">
        <span className="text-sm font-bold text-white">{title}</span>
        <span className="text-xs text-gray-300 line-clamp-1">{genre}</span>
        <span className="text-xs text-gray-400">{year}</span>
      </div>
    </Link>
  );
}
