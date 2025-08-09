import { NextResponse } from "next/server";
import { LISTINGS } from "@/utils/listings";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const item = LISTINGS.find((l) => l.slug === params.slug);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}
