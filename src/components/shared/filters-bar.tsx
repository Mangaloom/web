"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";

type Genre = { href: string; name?: string };

function toSlug(s: string) {
  if (!s) return "";
  if (s.startsWith("/")) return s.replace(/\//g, "");
  return s.trim().toLowerCase().replace(/\s+/g, "-");
}
function toLabel(s: string) {
  const t = s.replace(/\//g, "").replace(/-/g, " ");
  return t
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");
}

export function FilterBar({
  genres,
  currentPage,
}: {
  genres: Genre[];
  currentPage: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // seed dari URL
  const [genre, setGenre] = useState(search.get("genre") ?? "");
  const [status, setStatus] = useState(search.get("status") ?? "");
  const [type, setType] = useState(search.get("type") ?? "");

  // opsi genre
  const genreOptions = useMemo(
    () =>
      genres
        .map((g) => {
          const slug = toSlug(g.href || g.name || "");
          return { value: slug, label: toLabel(g.name || slug) };
        })
        .filter((g) => g.value),
    [genres]
  );

  const buildQuery = useCallback(() => {
    const sp = new URLSearchParams();
    if (genre) sp.set("genre", genre);
    if (status) sp.set("status", status);
    if (type) sp.set("type", type);
    return sp.toString();
  }, [genre, status, type]);

  const apply = useCallback(() => {
    startTransition(() => {
      const qs = buildQuery();
      router.push(`/daftar-komik/1${qs ? `?${qs}` : ""}`);
    });
  }, [router, buildQuery]);

  const reset = useCallback(() => {
    setGenre("");
    setStatus("");
    setType("");
    startTransition(() => {
      router.push(`/daftar-komik/1`);
    });
  }, [router]);

  const hasActiveFilters = genre || status || type;

  return (
    <div className=" top-14 z-30 mb-6">
      <div className="bg-black backdrop-blur-sm border border-slate-700 rounded-2xl shadow-lg shadow-slate-900/50 p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <h3 className="text-sm font-medium text-slate-100">Filter Komik</h3>
            {hasActiveFilters && (
              <span className="text-xs bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full">
                {[genre, status, type].filter(Boolean).length} aktif
              </span>
            )}
          </div>
          <span className="text-xs text-slate-400">Halaman {currentPage}</span>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Genre Filter */}
          <div className="group">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              🎭 Genre
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none px-4 py-3 pr-10 rounded-xl bg-slate-700 border border-slate-600 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-slate-600"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                aria-label="Filter berdasarkan genre"
              >
                <option value="">Semua Genre</option>
                {genreOptions.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Status Filter */}
          <div className="group">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              📊 Status
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none px-4 py-3 pr-10 rounded-xl bg-slate-700 border border-slate-600 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-slate-600"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                aria-label="Filter berdasarkan status"
              >
                <option value="">Semua Status</option>
                <option value="ongoing">🔄 Ongoing</option>
                <option value="completed">✅ Completed</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Type Filter */}
          <div className="group">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              📚 Tipe
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none px-4 py-3 pr-10 rounded-xl bg-slate-700 border border-slate-600 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-slate-600"
                value={type}
                onChange={(e) => setType(e.target.value)}
                aria-label="Filter berdasarkan tipe"
              >
                <option value="">Semua Tipe</option>
                <option value="manga">🇯🇵 Manga</option>
                <option value="manhwa">🇰🇷 Manhwa</option>
                <option value="manhua">🇨🇳 Manhua</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={apply}
            disabled={isPending}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-800"
            aria-label="Terapkan filter yang dipilih"
          >
            {isPending ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
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
                Menerapkan...
              </>
            ) : (
              <>
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
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Terapkan Filter
              </>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={reset}
              disabled={isPending}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium transition-all duration-200 border border-slate-600 disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              aria-label="Reset semua filter"
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
              Reset
            </button>
          )}
        </div>

        {/* Helper Text */}
        <p className="mt-4 text-xs text-slate-400 text-center">
          💡 Pilih filter yang diinginkan dan klik "Terapkan Filter" untuk
          melihat hasil
        </p>
      </div>
    </div>
  );
}
