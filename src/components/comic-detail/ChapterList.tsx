import Link from "next/link";
import type { Chapter } from "@/types";

interface ChapterListProps {
  chapters: Chapter[];
}

export const ChapterList = ({ chapters }: ChapterListProps) => (
  <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6">
    <h3 className="text-2xl font-bold mb-4">Daftar Chapter</h3>
    <div className="max-h-96 overflow-y-auto pr-2">
      <ul className="space-y-2">
        {chapters.map((chap) => (
          <li key={chap.href}>
            <Link
              href={`/baca${chap.href.replace("/chapter", "")}`}
              className="flex justify-between items-center p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
            >
              <span className="font-medium">{chap.title.trim()}</span>
              <span className="text-sm text-gray-400">{chap.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
