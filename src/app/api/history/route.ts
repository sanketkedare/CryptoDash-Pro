import { NextRequest, NextResponse } from "next/server";
import { historicalChartUrl } from "@/lib/api";
import { HistoricalDataSchema } from "@/lib/schemas/history";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id") ?? "bitcoin";
  const days = searchParams.get("days") ?? "365";
  const currency = searchParams.get("currency") ?? "INR";

  try {
    const daysNum = Number(days);
    // Long-range data changes slowly — cache more aggressively
    const revalidate = daysNum >= 1825 ? 21600 : daysNum >= 365 ? 3600 : 300;

    const res = await fetch(historicalChartUrl(id, daysNum, currency), {
      headers: { Accept: "application/json" },
      next: { revalidate },
    });

    if (res.status === 429) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }
    if (!res.ok) {
      return NextResponse.json({ error: "upstream_error" }, { status: 502 });
    }

    const raw = await res.json();

    const parsed = HistoricalDataSchema.safeParse(raw);
    if (!parsed.success) {
      console.error("[/api/history] Schema mismatch:", parsed.error.flatten());
      return NextResponse.json(
        { error: "schema_mismatch", issues: parsed.error.flatten() },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed.data);
  } catch {
    return NextResponse.json({ error: "fetch_failed" }, { status: 503 });
  }
}
