"use client";

import { useState, useEffect } from "react";
import type { ComicsByGenreResponse } from "@/types";
import { ComicCard } from "@/components/shared/ComicCard";
import { Pagination } from "@/components/shared/Pagination";
import { ComicListSkeleton } from "@/components/shared/ComicListSkeleton";
import Link from "next/link";

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
            setError(
              "Oops! Komik sedang tidak tersedia. Silakan coba beberapa saat lagi atau pilih genre lainnya."
            );
            setIsLoading(false);
          }
        } catch (err) {
          console.error(`Error pada percobaan ${attempt}:`, err);
          if (attempt === maxRetries) {
            setError(
              "Terjadi kesalahan saat memuat komik. Silakan coba lagi nanti."
            );
            setIsLoading(false);
          } else if (attempt < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
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
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center max-w-md">
          {/* Error Icon */}
          <div className="mx-auto mb-6 w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">{error}</p>

          {/* Action Button */}
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center max-w-md">
          {/* Empty State Icon */}
          <div className="mx-auto mb-6 w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>

          {/* Empty State Message */}
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Komik Tidak Ditemukan
          </h3>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Tidak ada komik yang tersedia untuk genre ini saat ini. Coba
            jelajahi genre lainnya!
          </p>

          {/* Back Button */}
          <Link
            href="/genres"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Lihat Genre Lain
          </Link>
        </div>
      </div>
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
