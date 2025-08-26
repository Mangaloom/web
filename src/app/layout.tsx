import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { SWRProvider } from "./swr-provider";
import { Navbar } from "@/components/navbar/navbar";
import { ClientProvider } from "@/providers/client-provider";

const roboto = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mangaloom - Baca Komik Manga, Manhwa, Manhua Online",
    template: "%s | Mangaloom",
  },
  description:
    "Mangaloom adalah platform baca komik online terbaik. Koleksi manga, manhwa, dan manhua terbaru lengkap, update setiap hari, gratis dan mudah diakses.",
  keywords: [
    "manga online",
    "baca manga",
    "manhwa terbaru",
    "manhua gratis",
    "komik indonesia",
    "komik online",
    "mangaloom",
    "https://mangaloom.app",
    "baca komik",
    "komik terbaru",
    "komik update",
    "komik rilis",
    "komik populer",
    "rekomendasi komik",
    "baca komik gratis",
    "platform komik online",
    "akses komik mudah",
    "koleksi komik lengkap",
    "komik update harian",
    "Mangaloom",
    "terbaru",
    "Komik Terbaru",
    "Update Komik",
    "Rilis Komik",
    "Komik Populer",
    "Rekomendasi Komik",
    "Baca Komik Gratis",
    "Platform Komik Online",
    "Akses Komik Mudah",
    "Koleksi Komik Lengkap",
    "Komik Update Harian",
    "Manga Terbaru",
    "Manhwa Terbaru",
    "Manhua Terbaru",
    "Komik Rekomendasi",
    "Baca Komik Online",
    "Komik Gratis",
    "Komik Digital",
    "baca manga tanpa iklan",
    "baca manhwa gratis",
    "baca manhua online",
    "komik petualangan",
    "komik aksi",
    "komik romantis",
    "komik fantasi",
    "komik isekai",
    "komik horor",
    "komik komedi",
    "komik drama",
    "komik supernatural",
    "komik sci-fi",
    "komik olahraga",
    "komik sejarah",
    "komik slice of life",
    "komik thriller",
    "komik misteri",
  ],
  authors: [{ name: "Mangaloom Team" }],
  creator: "Mangaloom",
  publisher: "Mangaloom",
  metadataBase: new URL("https://mangaloom.app"),
  alternates: {
    canonical: "https://mangaloom.app",
  },
  openGraph: {
    title: "Mangaloom - Baca Komik Manga, Manhwa, Manhua Online",
    description:
      "Nikmati pengalaman baca komik online terbaik dengan koleksi manga, manhwa, dan manhua terbaru di Mangaloom.",
    url: "https://mangaloom.app",
    siteName: "Mangaloom",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://mangaloom.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mangaloom - Baca Komik Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mangaloom - Baca Komik Manga, Manhwa, Manhua Online",
    description:
      "Baca manga, manhwa, dan manhua terbaru secara gratis hanya di Mangaloom.",
    creator: "@mangaloom",
    images: ["https://mangaloom.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "Comics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SWRProvider>
      <html lang="id">
        <body
          className={`${roboto.variable} ${robotoMono.variable} antialiased bg-slate-900 flex-col flex`}
        >
          <ClientProvider />
          <Navbar />
          {children}
        </body>
      </html>
    </SWRProvider>
  );
}
