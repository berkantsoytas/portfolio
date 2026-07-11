import { NextRequest, NextResponse } from "next/server";
import { getNotesIndex, type Locale } from "@/lib/content";

export async function GET(request: NextRequest) {
  const locale = (request.nextUrl.searchParams.get("locale") ?? "tr") as Locale;
  const nodes = getNotesIndex(locale);
  return NextResponse.json(nodes);
}
