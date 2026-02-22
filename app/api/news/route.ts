import { NextResponse } from "next/server";
import { getFpHomepageNews, fpSources } from "../../../lib/fpnews";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Math.max(1, Math.min(30, Number(searchParams.get("limit") ?? 12)));

  const items = await getFpHomepageNews(limit);

  return NextResponse.json(
    {
      source: fpSources,
      count: items.length,
      items,
      note:
        "Notizie aggregate automaticamente da fpcgil.it (categoria In Evidenza). I contenuti originali restano di proprietà dei rispettivi autori; qui mostriamo titolo/estratto e rimandiamo alla fonte.",
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
      },
    }
  );
}
