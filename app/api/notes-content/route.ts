import { NextRequest, NextResponse } from "next/server";
import { getNoteContent, type Locale } from "@/lib/content";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  const locale = (request.nextUrl.searchParams.get("locale") ?? "tr") as Locale;

  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  const note = getNoteContent(slug, locale);
  if (!note) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json(note);
}
