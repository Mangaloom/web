import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { IoCaretBackOutline } from "react-icons/io5";

import { CardList } from "@/components/manga-list/card-list";
import {
  getAllGenres,
  getComicList,
  getComicsByFilters,
} from "@/action/comics";
import { FilterBar } from "@/components/shared/filters-bar";
import { Pagination } from "@/components/shared/Pagination";

export const runtime = "edge";

type PageParams = { page: string };
type Qs = { genre?: string; status?: string; type?: string };

const qsToString = (qs: Qs) => {
  const sp = new URLSearchParams();
  if (qs.genre) sp.set("genre", qs.genre);
  if (qs.status) sp.set("status", qs.status);
  if (qs.type) sp.set("type", qs.type);
  const s = sp.toString();
  return s ? `?${s}` : "";
};

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<Qs>;
}): Promise<Metadata> {
  const { page } = await params;
  const q = await searchParams;
  const currentPage = parseInt(page, 10);

  const parts: string[] = [];
  if (q.genre) parts.push(`Genre ${q.genre}`);
  if (q.status) parts.push(`Status ${q.status}`);
  if (q.type) parts.push(`Tipe ${q.type}`);
  const filterLabel = parts.length ? ` • ${parts.join(" • ")}` : "";

  const baseUrl = "https://mangaloom.app";
  const qs = qsToString(q);

  return {
    title: `Daftar Komik${filterLabel} - Halaman ${currentPage} | Mangaloom`,
    description: `Jelajahi komik${
      parts.length ? ` (${parts.join(", ")})` : ""
    } di halaman ${currentPage}. Update harian.`,
    keywords: [
      "daftar komik",
      "komik terbaru",
      "manga online",
      "baca komik gratis",
      "komik terpopuler",
      "mangaloom",
    ],
    authors: [{ name: "Mangaloom" }],
    creator: "Mangaloom",
    publisher: "Mangaloom",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: `Daftar Komik${filterLabel} - Halaman ${currentPage} | Mangaloom`,
      description: `Temukan komik${
        parts.length ? ` (${parts.join(", ")})` : ""
      } di halaman ${currentPage}.`,
      url: `${baseUrl}/daftar-komik/${currentPage}${qs}`,
      siteName: "Mangaloom",
      type: "website",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: `Daftar Komik${filterLabel} - Halaman ${currentPage}`,
      description: `Koleksi komik${
        parts.length ? ` (${parts.join(", ")})` : ""
      } halaman ${currentPage}.`,
      creator: "@mangaloomapp",
    },
    alternates: {
      canonical: `${baseUrl}/daftar-komik/${currentPage}${qs}`,
    },
  };
}

const ComicList = async ({
  params,
  searchParams,
}: {
  params: Promise<{ page: string }>;
  searchParams: Promise<{ genre?: string; status?: string; type?: string }>;
}) => {
  const { page } = await params;
  const q = await searchParams;
  const currentPage = parseInt(page, 10);

  const useFilter = Boolean(q.genre || q.status || q.type);

  const data = useFilter
    ? await getComicsByFilters({
        genre: q.genre,
        status: q.status,
        type: q.type,
        page: currentPage,
      })
    : {
        items: await getComicList(String(currentPage)),
        totalPages: 0,
        currentPage,
        nextPage: null,
      };

  const comicList = data?.items ?? [];
  const totalPages = data?.totalPages ?? 0;
  const genres = await getAllGenres();

  if (!comicList || comicList.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Komik Tidak Ditemukan
          </h2>
          <p className="text-gray-300 mb-6">
            Tidak ada komik untuk kombinasi filter ini. Reset filter atau
            kembali ke halaman utama.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/daftar-komik/1"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/80 transition-colors"
            >
              Kembali ke Halaman 1
            </Link>
            <Link
              href={`/daftar-komik/1`}
              className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Reset Filter
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const qs = (() => {
    const sp = new URLSearchParams();
    if (q.genre) sp.set("genre", q.genre);
    if (q.status) sp.set("status", q.status);
    if (q.type) sp.set("type", q.type);
    const s = sp.toString();
    return s ? `?${s}` : "";
  })();

  const prevHref = `/daftar-komik/${
    currentPage > 1 ? currentPage - 1 : 1
  }${qs}`;
  const nextHref = `/daftar-komik/${currentPage + 1}${qs}`;

  const headingParts: string[] = [];
  if (q.genre) headingParts.push(`Genre ${q.genre}`);
  if (q.status) headingParts.push(`Status ${q.status}`);
  if (q.type) headingParts.push(`Tipe ${q.type}`);
  const headingSuffix = headingParts.length
    ? ` • ${headingParts.join(" • ")}`
    : "";

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Filters */}
        <FilterBar genres={genres} currentPage={currentPage} />

        <div className="my-6">
          <h1 className="text-3xl font-bold mb-3 border-l-4 border-primary text-white pl-4">
            Daftar Komik Terbaru & Terpopuler{headingSuffix}
          </h1>
          <p className="text-gray-300 text-lg">
            Halaman {currentPage}
            {headingSuffix ? ` — ${headingSuffix.replaceAll(" • ", ", ")}` : ""}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mb-12">
          {comicList.map((comic: any, i: number) => (
            <CardList key={i} {...comic} />
          ))}
        </div>

        {/* Pagination */}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/daftar-komik"
          query={qs}
        />
      </div>
    </div>
  );
};

export default ComicList;
