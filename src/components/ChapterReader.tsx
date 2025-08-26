"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaRegClone, FaExpand, FaCompress, FaArrowUp } from "react-icons/fa";
import { MdSwipe } from "react-icons/md";

export default function ChapterReader({
  title,
  panel,
}: {
  title: string;
  panel: string[];
}) {
  const [mode, setMode] = useState<"scroll" | "swipe">("scroll");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // simpan posisi scroll fullscreen
  const [fullscreenScroll, setFullscreenScroll] = useState(0);

  // Menambahkan/menghapus class pada body untuk fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isFullscreen]);

  // Scroll listener untuk tombol Scroll To Top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // listener khusus untuk div fullscreen
  useEffect(() => {
    if (!isFullscreen) return;

    const fsEl = document.getElementById("fullscreen-reader");
    if (!fsEl) return;

    const handleScroll = () => {
      setFullscreenScroll(fsEl.scrollTop);
    };

    fsEl.addEventListener("scroll", handleScroll);
    return () => fsEl.removeEventListener("scroll", handleScroll);
  }, [isFullscreen]);

  // restore posisi scroll setelah keluar fullscreen
  useEffect(() => {
    if (!isFullscreen && fullscreenScroll > 0) {
      window.scrollTo({
        top: fullscreenScroll,
        behavior: "instant" as ScrollBehavior,
      });
    }
  }, [isFullscreen, fullscreenScroll]);

  const renderScrollContent = (isFullScreenView: boolean) => (
    <div className="flex flex-col items-center">
      {panel?.map((src, idx) => (
        <Image
          key={idx}
          src={src}
          alt={`${title} - Halaman ${idx + 1}`}
          width={800}
          height={1200}
          loading="lazy"
          draggable={false}
          className={`w-full h-auto object-contain ${
            isFullScreenView ? "" : " shadow-lg "
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full relative">
      {/* Mode Switcher */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setMode("scroll")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all shadow-md backdrop-blur-md ${
            mode === "scroll"
              ? "bg-primary text-white"
              : "bg-gray-700/70 text-gray-300 hover:bg-gray-600/80"
          }`}
        >
          <FaRegClone className="text-lg" />
          <span>Scroll Mode</span>
        </button>
        <button
          onClick={() => setMode("swipe")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all shadow-md backdrop-blur-md ${
            mode === "swipe"
              ? "bg-primary text-white"
              : "bg-gray-700/70 text-gray-300 hover:bg-gray-600/80"
          }`}
        >
          <MdSwipe className="text-lg" />
          <span>Swipe Mode</span>
        </button>
      </div>

      {/* Content */}
      {mode === "scroll" ? (
        <>
          {/* Tombol Fullscreen hanya muncul di mode scroll */}
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setIsFullscreen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all shadow-md backdrop-blur-md bg-gray-700/70 text-gray-300 hover:bg-gray-600/80"
            >
              <FaExpand />
              <span>Fullscreen</span>
            </button>
          </div>
          {renderScrollContent(false)}

          {/* Tampilan Fullscreen */}
          {isFullscreen && (
            <div
              id="fullscreen-reader"
              className="fixed inset-0 z-50 bg-black overflow-y-auto"
            >
              <div className="relative">
                {renderScrollContent(true)}
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="fixed bottom-4 right-4 z-[60] bg-primary/80 text-white p-3 rounded-full shadow-lg backdrop-blur-sm"
                  aria-label="Exit Fullscreen"
                >
                  <FaCompress className="text-xl" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Keyboard]}
          navigation
          pagination={{ clickable: true }}
          keyboard={{ enabled: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
          }}
          spaceBetween={20}
          className="w-full h-auto rounded-2xl shadow-xl bg-black/40 backdrop-blur-md"
        >
          {panel.map((src, idx) => (
            <SwiperSlide key={idx} className="flex justify-center">
              <Image
                src={src}
                alt={`${title} - Panel ${idx + 1}`}
                width={800}
                height={1200}
                loading="lazy"
                draggable={false}
                className="rounded-lg shadow-lg object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Floating Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 left-5 z-50 bg-primary/80 text-white p-3 rounded-full shadow-lg backdrop-blur-sm hover:bg-primary transition"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-xl" />
        </button>
      )}
    </div>
  );
}
