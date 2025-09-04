import Link from "next/link";
import { HeartCrack } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
      <HeartCrack size={64} className="mb-4 text-gray-600" />
      <h2 className="text-2xl font-bold text-white mb-2">Belum Ada Favorit</h2>
      <p className="mb-6 text-center">
        Sepertinya Anda belum menambahkan komik apa pun ke daftar favorit.
      </p>
      <Link
        href="/"
        className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-primary/80 transition-colors"
      >
        Jelajahi Komik
      </Link>
    </div>
  );
};
