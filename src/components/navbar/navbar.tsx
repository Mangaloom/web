"use client";

import cntl from "cntl";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { NavLinks } from "./_partials/nav-links";
import { getSearchComics } from "@/action/comics"; // ⬅️ pakai action search
import { fetcher } from "@/lib/fetcher";
import { Loader2 } from "lucide-react";

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

const styles = {
  navThinLink: `flex items-center transition-colors p-[2px] rounded-sm`,
  navSlim: (type: "visible" | "invisible") =>
    cntl`leading-none transition-all text-[10px] md:text-[11px] lg:text-xs text-[#757575] bg-[#FBFBFB] px-[5vw] md:px-[10vw] lg:px-[15vw] ${
      type === "visible" ? cntl`` : cntl`invisible`
    }`,
  navMain: `${pjs.className}  text-white sm:px-[1em] px-[0.5em] md:px-[8vw] lg:px-[10vw]`,
  navAll: (type: "fixed" | "hidden") =>
    cntl`fixed top-0 z-30 flex flex-col w-full font-medium transition-transform shadow-[0_4px_8px_0px_rgba(0,0,0,0.1)] ${
      type === "fixed"
        ? cntl`shadow-none`
        : cntl`-translate-y-9 md:-translate-y-[38px] lg:-translate-y-10`
    }`,
  navMobile: (sidebarOpen: boolean) =>
    cntl`fixed inset-y-0 right-0 z-40 w-screen h-screen bg-slate-900 p-8 flex flex-col gap-[4vh] transform transition-transform duration-300 md:hidden
  ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`,
};

export function Navbar() {
  const navAll = useRef<HTMLDivElement>(null);
  const navSlim = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const onScroll = useCallback(handleNavbarScroll, [sidebarOpen]);

  function handleNavbarScroll() {
    const { scrollY } = window;
    if (!navAll.current || !navSlim.current) return;

    navAll.current.className = styles.navAll("fixed");
    navSlim.current.className = styles.navSlim("visible");

    if (sidebarOpen) {
      return (navAll.current.className = styles.navAll("hidden"));
    }
    if (scrollY > 100) {
      navAll.current.className = styles.navAll("hidden");
      navSlim.current.className = styles.navSlim("invisible");
    }
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 767;

  function handleMobileNavigationToggler() {
    setSidebarOpen((current) => {
      const bodyClasses = document.body.classList;
      if (isMobile && !current) {
        bodyClasses.add("overflow-hidden");
      } else {
        bodyClasses.remove("overflow-hidden");
      }
      return !current;
    });
  }
  function closeMobileNavbar() {
    setSidebarOpen(() => {
      const bodyClasses = document.body.classList;
      bodyClasses.remove("overflow-hidden");
      return false;
    });
  }

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const currentPath = usePathname();
  if (currentPath.startsWith("/admin")) return null;

  // 🔎 State search
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ComicSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  // ⏳ debounce search
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
        setResults(res.data as ComicSearchResult[]);
      } catch (err) {
        setResults([]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500); // delay 500ms

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <nav
      className={`w-full z-30 bg-black border-b-4 border-primary ${styles.navMain}`}
      ref={navAll}
      data-cy="main-nav"
      tabIndex={0}
    >
      <div className={`lg:px-8 md:px-10`}>
        <div className="flex items-center px-2 justify-between h-20 mx-auto max-w-7xl">
          {/* Logo */}
          <div>
            <Link
              href="/"
              onClick={closeMobileNavbar}
              className="flex flex-col items-center"
            >
              <Image
                alt="Mangaloom Logo"
                className="flex items-center pl-[1px] max-w-[12rem] h-20 w-full"
                src={"/assets/logo/mangaloom-logo.png"}
                width={400}
                height={400}
              />
            </Link>
          </div>

          {/* Nav Links */}
          <div
            className="items-center hidden md:gap-1 lg:gap-2 md:flex"
            data-cy="desktop-nav"
          >
            <NavLinks
              closeMobileNavbar={closeMobileNavbar}
              isMobile={isMobile}
            />
          </div>

          {/* 🔎 Search */}
          <div className="flex items-center gap-2 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari manga..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-[#1E1E1E] text-white rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 md:w-64 lg:w-72"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>

            {/* Dropdown hasil */}
            {query && (
              <div className="absolute top-12 left-0 w-full md:w-72 bg-[#1E1E1E] text-white rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
                {loading ? (
                  <Loader2 className="animate-spin m-3 mx-auto" />
                ) : results && results.length > 0 ? (
                  results.map((comic) => (
                    <Link
                      key={comic.href}
                      href={`/komik${comic.href}`}
                      className="flex items-center gap-3 p-2 hover:bg-white/10"
                      onClick={() => setQuery("")}
                    >
                      <Image
                        src={comic.thumbnail || "/placeholder.png"}
                        alt={comic.title || "Thumbnail"}
                        width={40}
                        height={56}
                        loading="lazy"
                        unoptimized
                        draggable={false}
                        className="rounded-md object-cover"
                      />

                      <div>
                        <p className="text-sm font-medium">{comic.title}</p>
                        <p className="text-xs text-gray-400">
                          {comic.type} · {comic.chapter}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-3 text-sm text-gray-400">
                    Tidak ada hasil.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="flex items-center md:hidden z-50 relative"
            data-cy="hamburger"
            title="Buka menu"
            type="button"
            onClick={handleMobileNavigationToggler}
          >
            {sidebarOpen ? (
              <MdMenuOpen size={32} className="text-primary " />
            ) : (
              <MdMenu size={32} className="text-primary" />
            )}
          </button>
        </div>
      </div>

      <aside className={styles.navMobile(sidebarOpen)} data-cy="mobile-nav">
        <NavLinks closeMobileNavbar={closeMobileNavbar} isMobile={isMobile} />
      </aside>
    </nav>
  );
}
