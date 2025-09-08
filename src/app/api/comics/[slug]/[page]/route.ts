import { getComicsByGenre } from "@/action/comics";
import { NextResponse } from "next/server";
export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string; page: string } }
) {
  const { slug, page } = params;
  const pageNumber = parseInt(page, 10);

  if (isNaN(pageNumber) || pageNumber < 1 || !slug) {
    console.error(`Parameter tidak valid: slug=${slug}, page=${page}`);
    return NextResponse.json(
      { error: "Parameter tidak valid" },
      { status: 400 }
    );
  }

  try {
    const response = await getComicsByGenre(slug, pageNumber);
    if (!response) {
      console.error(
        `Gagal mengambil data untuk genre: ${slug}, halaman: ${page}`
      );
      throw new Error("Gagal mengambil data dari API eksternal.");
    }
    return NextResponse.json(response);
  } catch (error) {
    console.error(`API route error untuk /${slug}/${page}:`, error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
