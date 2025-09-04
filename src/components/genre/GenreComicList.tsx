"use client";

import { useState, useEffect } from "react";
import type { ComicsByGenreResponse } from "@/types";
import { ComicCard } from "@/components/shared/ComicCard";
import { Pagination } from "@/components/shared/Pagination";
import { ComicListSkeleton } from "@/components/shared/ComicListSkeleton";

interface GenreComicListProps {
  slug: string;
  pageNumber: number;
}

export const GenreComicList = ({ slug, pageNumber }: GenreComicListProps) => {
  const [response, setResponse] = useState<ComicsByGenreResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setResponse(null);
    setError(null);

    const fetchWithRetry = async () => {
      const maxRetries = 3;
      const retryDelay = 1000;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const res = await fetch(`/api/comics/${slug}/${pageNumber}`);

          if (!res.ok) {
            throw new Error(`API merespon dengan status ${res.status}`);
          }

          const apiResponse: ComicsByGenreResponse = await res.json();

          if (apiResponse && apiResponse.data && apiResponse.data.length > 0) {
            setResponse(apiResponse);
            setIsLoading(false);
            return;
          }

          if (attempt < maxRetries) {
            console.log(
              `Percobaan ${attempt} gagal, mencoba lagi dalam ${retryDelay}ms...`
            );
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
          } else {
            throw new Error(
              "Tidak ada data ditemukan setelah beberapa kali percobaan."
            );
          }
        } catch (err) {
          console.error(`Error pada percobaan ${attempt}:`, err);
          if (attempt === maxRetries) {
            setError("Gagal memuat komik. Silakan coba muat ulang halaman.");
            setIsLoading(false);
          }
        }
      }
    };

    fetchWithRetry();
  }, [slug, pageNumber]);

  if (isLoading) {
    return <ComicListSkeleton />;
  }

  if (error) {
    return <p className="text-center text-red-400 mt-10">{error}</p>;
  }

  if (!response) {
    return (
      <p className="text-center text-gray-400 mt-10">Komik tidak ditemukan.</p>
    );
  }

  const { data: comics, current_page, length_page } = response;

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {comics.map((comic) => (
          <ComicCard key={comic.href} comic={comic} />
        ))}
      </div>
      <Pagination
        currentPage={current_page}
        totalPages={length_page}
        basePath={`/genres/${slug}`}
      />
    </>
  );
};
