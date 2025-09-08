// src/app/api/comics/[slug]/[page]/route.ts
import { NextResponse } from "next/server";
import { getComicsByGenre } from "@/action/comics";

export const runtime = "edge";

type Params = { slug: string; page: string };
type Ctx = { params: Params } | { params: Promise<Params> };

async function resolveParams(p: Params | Promise<Params>): Promise<Params> {
  return (p as any)?.then ? await (p as Promise<Params>) : (p as Params);
}

export async function GET(_req: Request, ctx: Ctx) {
  const { slug, page } = await resolveParams(ctx.params);
  const pageNumber = Number(page);

  if (!slug || !Number.isFinite(pageNumber) || pageNumber < 1) {
    return NextResponse.json(
      { error: "Parameter tidak valid" },
      { status: 400 }
    );
  }

  try {
    const response = await getComicsByGenre(slug, pageNumber);
    if (!response || !Array.isArray(response.data)) {
      return NextResponse.json({ error: "Gagal ambil data" }, { status: 502 });
    }
    return NextResponse.json(response, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
