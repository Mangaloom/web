"use client";

import { getSearchComics } from "@/action/comics"; // Pakai action search
import { fetcher } from "@/lib/fetcher";
import cntl from "cntl";
import {
  Book,
  BookmarkIcon,
  Flame,
  Home,
  LayoutGrid,
  ListFilter,
  Loader2,
  Search as SearchIcon,
  X,
} from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const pjs = Plus_Jakarta_Sans({
  subsets: ["latin"],
});
interface ComicSearchResult {
  href: string;
  thumbnail: string;
  title: string;
  type: string;
  chapter: string;
}

interface SearchResponse {
  data: ComicSearchResult[];
}

const navLinks = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/daftar-komik/1", label: "Daftar Komik", icon: ListFilter },
  { href: "/genres", label: "Genre", icon: LayoutGrid },
  { href: "/favorites", label: "Favorites", icon: BookmarkIcon },
];

function SearchComponent() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ComicSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetcher<SearchResponse>(
          `/search?keyword=${encodeURIComponent(query)}`
        );
        setResults((res.data as ComicSearchResult[]) || []);
      } catch (err) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative w-full max-w-xs md:max-w-sm">
      <div className="relative flex items-center">
        <SearchIcon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Cari manga favoritmu..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // delay to allow click on results
          className="w-full rounded-full bg-[#1E1E1E] py-2 pl-10 pr-4 text-white placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {isFocused && query && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full max-h-80 overflow-y-auto rounded-lg bg-[#1E1E1E] shadow-lg">
          {loading ? (
            <div className="flex justify-center p-4">
              <Loader2 className="animate-spin text-primary" />
            </div>
          ) : results.length > 0 ? (
            results.map((comic) => (
              <Link
                key={comic.href}
                href={`/komik${comic.href}`}
                className="flex items-center gap-3 p-2 transition-colors hover:bg-white/10"
                onClick={() => {
                  setQuery("");
                  setIsFocused(false);
                }}
              >
                <Image
                  src={comic.thumbnail || "/placeholder.png"}
                  alt={comic.title || "Thumbnail"}
                  width={40}
                  height={56}
                  loading="lazy"
                  unoptimized
                  className="rounded-md object-cover"
                />
                <div>
                  <p className="line-clamp-1 text-sm font-medium">
                    {comic.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {comic.type} · {comic.chapter}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-3 text-sm text-center text-gray-400">
              Tidak ada hasil ditemukan.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
function DesktopNav() {
  const pathname = usePathname();
  return (
    <div className="hidden items-center gap-4 md:flex">
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cntl`
            relative text-sm font-semibold transition-colors
            ${
              pathname === href
                ? "text-primary"
                : "text-white hover:text-primary/80"
            }
            after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:bg-primary after:scale-x-0 after:transition-transform
            ${
              pathname === href ? "after:scale-x-100" : "hover:after:scale-x-50"
            }
          `}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-40 block w-full border-t border-gray-700 bg-black md:hidden">
      <div className="flex h-16 items-center justify-around">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cntl`
                flex flex-col items-center gap-1 text-xs transition-colors
                ${isActive ? "text-primary" : "text-gray-400 hover:text-white"}
              `}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className={isActive ? "font-bold" : "font-medium"}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function Navbar() {
  const currentPath = usePathname();
  if (currentPath.startsWith("/admin")) return null;

  return (
    <>
      <header
        className={`${pjs.className} sticky top-0 z-30 w-full border-b-2 border-primary bg-black`}
        data-cy="main-nav"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              alt="Mangaloom Logo"
              className="h-16 w-auto"
              src={"/assets/logo/mangaloom-logo.png"}
              width={160}
              height={40}
              priority
            />
          </Link>

          {/* Navigasi Desktop */}
          <div className="hidden flex-1 justify-center md:flex">
            <DesktopNav />
          </div>

          {/* Komponen Pencarian */}
          <div className="flex flex-1 justify-end">
            <SearchComponent />
          </div>
        </div>
      </header>

      <MobileBottomNav />
    </>
  );
}
