// app/api/search/route.ts
import { getSearchComics } from "@/action/comics";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");

  const data = await getSearchComics(keyword || "");

  if (!data) {
    return NextResponse.json({ data: [] });
  }

  return NextResponse.json(data);
}
