import { NextResponse } from "next/server";
import { LISTINGS } from "@/utils/listings";

function filterAndSort({
  q,
  max,
  type,
  sort,
}: {
  q?: string;
  max?: number;
  type?: string;
  sort?: "price_asc" | "price_desc";
}) {
  const query = (q ?? "").trim().toLowerCase();

  let items = LISTINGS.filter((l) => {
    const matchQ =
      !query ||
      l.city.toLowerCase().includes(query) ||
      (l.district ?? "").toLowerCase().includes(query) ||
      l.title.toLowerCase().includes(query);
    const matchMax = !max || l.price <= max;
    const matchType = !type || type === "all" || l.type === type;
    return matchQ && matchMax && matchType;
  });

  if (sort === "price_asc") items = items.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") items = items.sort((a, b) => b.price - a.price);

  return items;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? undefined;
  const max = searchParams.get("max") ? Number(searchParams.get("max")) : undefined;
  const type = searchParams.get("type") ?? undefined;
  const sort = (searchParams.get("sort") as "price_asc" | "price_desc" | null) ?? undefined;

  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(30, Math.max(1, Number(searchParams.get("limit") ?? 9)));

  const filtered = filterAndSort({ q, max, type, sort });
  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const end = start + limit;

  const items = filtered.slice(start, end);

  return NextResponse.json({ items, total, page, limit, pages });
}
