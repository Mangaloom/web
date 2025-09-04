import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Komik Terlengkap - Mangaloom | Baca Manga Online Gratis",
  description:
    "Temukan daftar komik dan manga terlengkap di Mangaloom. Baca ribuan judul manga online gratis dengan kualitas terbaik. Update terbaru setiap hari!",
  keywords: [
    "daftar komik",
    "manga online",
    "baca manga gratis",
    "mangaloom",
    "komik indonesia",
    "manga terbaru",
    "manhwa",
    "manhua",
    "webtoon",
  ],
  authors: [{ name: "Mangaloom" }],
  creator: "Mangaloom",
  publisher: "Mangaloom",
  openGraph: {
    title: "Daftar Komik Terlengkap - Mangaloom",
    description:
      "Temukan daftar komik dan manga terlengkap di Mangaloom. Baca ribuan judul manga online gratis dengan kualitas terbaik.",
    url: "https://mangaloom.app/daftar-komik",
    siteName: "Mangaloom",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daftar Komik Terlengkap - Mangaloom",
    description:
      "Temukan daftar komik dan manga terlengkap di Mangaloom. Baca ribuan judul manga online gratis.",
    creator: "@mangaloomapp",
  },
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
  alternates: {
    canonical: "https://mangaloom.app/daftar-komik",
  },
};

export default function DaftarKomikRoot() {
  redirect("/daftar-komik/1");
}
