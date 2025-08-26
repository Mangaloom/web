import React from "react";
import { CardList } from "./card-list";
import { getRecommenderComics } from "@/action/comics";
import Link from "next/link";

export const Recommended = async () => {
  const recommendedManga = await getRecommenderComics();
  return (
    <section className="flex-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Rekomendasi Untuk Kamu</h2>
        <Link
          href="/daftar-komik"
          className="bg-primary text-primary-foreground px-3 py-1 rounded-md hover:opacity-90 transition"
        >
          Semua Komik
        </Link>
      </div>

      <div
        className="
          grid 
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
          gap-4
        "
      >
        {recommendedManga.map((manga, i) => (
          <CardList key={manga.href} {...manga} priority={i < 5} />
        ))}
      </div>
    </section>
  );
};
