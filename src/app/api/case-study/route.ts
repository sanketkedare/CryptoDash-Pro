import { NextResponse } from "next/server";
import CaseStudyData from "@/data/casestudy.json";

export async function GET() {
  return NextResponse.json(CaseStudyData, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "public, max-age=3600, s-maxage=1800",
    },
  });
}
