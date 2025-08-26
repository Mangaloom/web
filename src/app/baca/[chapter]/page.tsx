import { getChapterDetail } from "@/action/comics";
import ChapterReader from "@/components/ChapterReader";
import Link from "next/link";
import { FaBackspace, FaBackward } from "react-icons/fa";
import {
  IoCaretBackOutline,
  IoCaretForwardOutline,
  IoPlayBackOutline,
} from "react-icons/io5";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  return params.then(async ({ chapter }) => {
    const response = await getChapterDetail(chapter);

    if (!response) {
      return {
        title: "Chapter tidak ditemukan | Baca Komik Online",
        description: "Halaman chapter tidak tersedia atau telah dihapus.",
      };
    }

    return {
      title: `${response.title} | Baca Komik Online`,
      description: `Baca chapter ${response.title} dengan kualitas gambar terbaik secara gratis di Mangaloom.`,
      openGraph: {
        title: response.title,
        description: `Baca chapter ${response.title} dengan kualitas gambar terbaik secara gratis di Mangaloom.`,
        url: `/baca/${chapter}`,
        siteName: "Baca Komik Online",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: response.title,
        description: `Baca chapter ${response.title} dengan kualitas gambar terbaik secara gratis di Mangaloom.`,
      },
      keywords: [
        response.title,
        "baca komik",
        "komik online",
        "manga",
        "manhwa",
        "manhua",
        "chapter terbaru",
        "baca manga",
        "baca manhwa",
        "baca manhua",
        "mangaloom",
      ],
    };
  });
}

export default async function BacaChapter({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter } = await params;
  const response = await getChapterDetail(chapter);

  if (!response) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Chapter tidak ditemukan.
      </div>
    );
  }

  const { title, prev, next, panel } = response;

  return (
    <div className="container mx-auto p-4 text-white">
      {/* 📌 Copywriting SEO atas */}
      <div className="mb-6 text-center text-gray-300">
        <p className="text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
          Nikmati pengalaman membaca komik <strong>{title}</strong> secara
          gratis dengan kualitas gambar terbaik. Baca manga, manhwa, dan manhua
          terbaru dalam bahasa Indonesia hanya di <strong>Mangaloom</strong>.
        </p>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        {title}
      </h1>

      <div className="flex justify-between items-center mt-6">
        {prev ? (
          <Link
            href={`/baca${prev.replace("/chapter", "")}`}
            aria-label="Chapter sebelumnya"
            className="group flex items-center space-x-3 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-105 transform transition"
          >
            <span className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full">
              <IoCaretBackOutline />
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/baca${next.replace("/chapter", "")}`}
            aria-label="Chapter selanjutnya"
            className="group flex items-center space-x-3 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-105 transform transition"
          >
            <span className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full">
              <IoCaretForwardOutline />
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>

      <ChapterReader title={title} panel={panel} />

      {!next && (
        <div className="mt-10 text-center text-gray-300">
          <p className="text-base md:text-lg font-medium">
            Untuk saat ini <strong>{title}</strong> sudah sampai di chapter
            terbaru. Nantikan update selanjutnya hanya di{" "}
            <strong>Mangaloom</strong>.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Jangan lupa bookmark halaman ini agar kamu tidak ketinggalan chapter
            baru begitu rilis!
          </p>
        </div>
      )}

      {/* Navigasi bawah */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`/baca${prev.replace("/chapter", "")}`}
            className="w-full flex items-center sm:w-auto text-center px-5 py-3 rounded-xl bg-gray-800/90 hover:bg-gray-700 text-white font-medium shadow-md transition"
          >
            <IoPlayBackOutline className="mr-2" />
            Chapter Sebelumnya
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={`/baca${next.replace("/chapter", "")}`}
            className="w-full flex items-center sm:w-auto text-center px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium shadow-md transition"
          >
            Chapter Selanjutnya
            <IoPlayBackOutline className="ml-2 rotate-180" />
          </Link>
        ) : (
          <span />
        )}
      </div>

      {/* 📌 Copywriting SEO bawah */}
      <div className="mt-10 text-gray-400 text-sm md:text-base leading-relaxed max-w-3xl mx-auto text-center">
        <p>
          Kamu baru saja membaca <strong>{title}</strong>. Jangan lupa untuk
          mengikuti update terbaru agar tidak ketinggalan chapter selanjutnya.
          Di <strong>Mangaloom</strong>, kamu bisa membaca berbagai komik
          populer dengan terjemahan bahasa Indonesia secara cepat, mudah, dan
          gratis.
        </p>
        <p className="mt-4">
          Temukan juga pilihan manga, manhwa, dan manhua favorit lainnya di
          koleksi kami. Jadikan <strong>Mangaloom</strong> sebagai tempat utama
          untuk menemani waktu santai kamu dengan cerita-cerita seru setiap
          hari.
        </p>
      </div>
    </div>
  );
}
