import React from "react";
import Link from "next/link";
import { getComicList } from "@/action/comics";
import { CardList } from "@/components/manga-list/card-list";
import { IoCaretBackOutline } from "react-icons/io5";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;

  return {
    title: `Daftar Komik - Mangaloom | Halaman ${page}`,
    description: "Jelajahi daftar komik terbaru dan terpopuler di Mangaloom.",
  };
}

const ComicList = async ({ params }: { params: Promise<{ page: string }> }) => {
  const { page } = await params;
  const currentPage = parseInt(page);

  if (isNaN(currentPage) || currentPage < 1) {
    redirect("/daftar-komik/1");
  }

  const comicList = await getComicList(currentPage.toString());

  if (!comicList || comicList.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-white">Komik tidak ditemukan.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screenpy-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="my-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            Daftar Komik
          </h1>
        </div>

        {/* Comic Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mb-12">
          {comicList?.map((comic, index: number) => (
            <CardList key={index} {...comic} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4 py-8">
          {/* Previous Button */}
          <Link
            href={`/daftar-komik/${currentPage > 1 ? currentPage - 1 : 1}`}
            aria-label="Chapter sebelumnya"
            className="group flex items-center space-x-3 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-105 transform transition"
          >
            <span className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full">
              <IoCaretBackOutline />
            </span>
          </Link>

          {/* Page Info */}
          <div className="flex items-center space-x-2">
            <span className="px-4 py-2 bg-primary text-white rounded-lg font-medium">
              {currentPage}
            </span>
          </div>

          {/* Next Button */}
          <Link
            href={`/daftar-komik/${currentPage + 1}`}
            aria-label="Chapter selanjutnya"
            className="group flex items-center space-x-3 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-105 transform transition"
          >
            <span className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full">
              <IoCaretBackOutline className="rotate-180" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComicList;
