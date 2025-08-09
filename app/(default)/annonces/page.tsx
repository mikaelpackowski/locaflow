import ListingCard from "@/components/ListingCard";
import SearchBar from "@/components/SearchBar";
import { LISTINGS } from "@/utils/listings";
import { headers } from "next/headers";

export const metadata = {
  title: "Annonces | LocaFlow",
  description: "Trouvez votre logement et filtrez selon vos critères.",
};

function buildBaseUrl() {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export default async function AnnoncesPage({ searchParams }: any) {
  // ✅ Next 15 peut fournir un Promise ici → on l'attend
  const sp = (await searchParams) ?? {};
  const q = sp.q ?? "";
  const max = sp.max ?? "";
  const type = sp.type ?? "all";
  const sort = sp.sort as "price_asc" | "price_desc" | undefined;
  const page = Number(sp.page ?? 1);
  const limit = Number(sp.limit ?? 9);

  const base = buildBaseUrl();
  const url = new URL(`${base}/api/annonces`);
  if (q) url.searchParams.set("q", q);
  if (max) url.searchParams.set("max", max);
  if (type && type !== "all") url.searchParams.set("type", type);
  if (sort) url.searchParams.set("sort", sort);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  const res = await fetch(url.toString(), { cache: "no-store" });
  const data = await res.json();

  const cities = Array.from(
    new Set(LISTINGS.flatMap((l) => [l.city, l.district].filter(Boolean) as string[]))
  ).sort((a, b) => a.localeCompare(b, "fr"));
  const types = Array.from(new Set(LISTINGS.map((l) => l.type)));

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-bold text-gray-900 text-center">Annonces</h1>
      <p className="mt-2 text-center text-gray-500">
        Explorez les biens disponibles et filtrez selon vos critères.
      </p>

      <SearchBar
        defaultQuery={q}
        defaultMax={max}
        defaultType={type}
        defaultSort={sort ?? ""}
        cities={cities}
        types={types}
      />

      {data.items.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">
          Aucune annonce ne correspond à vos critères.
        </p>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((l: any) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>

          <Pagination
            total={data.total}
            page={data.page}
            pages={data.pages}
            limit={data.limit}
            searchParams={sp}
          />
        </>
      )}
    </main>
  );
}

function Pagination({
  total,
  page,
  pages,
  limit,
  searchParams,
}: {
  total: number;
  page: number;
  pages: number;
  limit: number;
  searchParams: Record<string, string>;
}) {
  if (pages <= 1) return null;

  const makeLink = (p: number) => {
    const sp = new URLSearchParams();
    if (searchParams?.q) sp.set("q", searchParams.q);
    if (searchParams?.max) sp.set("max", searchParams.max);
    if (searchParams?.type) sp.set("type", searchParams.type);
    if (searchParams?.sort) sp.set("sort", searchParams.sort);
    sp.set("page", String(p));
    sp.set("limit", String(limit));
    return `/annonces?${sp.toString()}`;
  };

  const pagesToShow = Array.from({ length: pages }, (_, i) => i + 1).slice(
    Math.max(0, page - 3),
    Math.max(0, page - 3) + 5
  );

  return (
    <nav className="mt-10 flex items-center justify-center gap-2">
      <a href={makeLink(Math.max(1, page - 1))} className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
        ← Précédent
      </a>
      {pagesToShow.map((p) => (
        <a
          key={p}
          href={makeLink(p)}
          className={`rounded-lg px-3 py-2 text-sm ${p === page ? "bg-indigo-600 text-white" : "border hover:bg-gray-50"}`}
        >
          {p}
        </a>
      ))}
      <a href={makeLink(Math.min(pages, page + 1))} className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50">
        Suivant →
      </a>
    </nav>
  );
}
