import Link from "next/link";
import { Button } from "../ui/button";
import { CardList, CardMangaProps } from "./card-list";
import { getNewestComics } from "@/action/comics";

export default async function NewestComics() {
  const newestManga = await getNewestComics();
  return (
    <section className="flex-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">Pembaharuan Harian</h2>
        <Link
          href="/daftar-komik"
          className="bg-primary text-primary-foreground px-3 py-1 rounded-md hover:opacity-90 transition"
        >
          Semua Pembaharuan
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
        {newestManga.map((manga) => (
          <CardList key={manga.href} {...manga} />
        ))}
      </div>
    </section>
  );
}
