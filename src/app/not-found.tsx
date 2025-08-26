import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="flex flex-col items-center space-y-6">
        <Image
          src="/assets/not-found.png"
          alt="404 Not Found"
          width={400}
          height={300}
          priority
        />

        <div className="text-center">
          <p className="text-lg text-gray-300">
            Oops! Sepertinya halaman yang kamu cari tidak tersedia.
          </p>
        </div>

        <Link
          href="/"
          className="px-6 py-3 rounded-2xl bg-slate-800 transition text-white font-medium shadow-lg"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
