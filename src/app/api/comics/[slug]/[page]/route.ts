import { getComicsByGenre } from "@/action/comics";
import { NextResponse } from "next/server";
export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string; page: string }> }
) {
  const { slug, page } = await params;
  const pageNumber = parseInt(page, 10);

  if (isNaN(pageNumber) || pageNumber < 1 || !slug) {
    return NextResponse.json(
      { error: "Parameter tidak valid" },
      { status: 400 }
    );
  }

  try {
    const response = await getComicsByGenre(slug, pageNumber);
    if (!response) {
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
