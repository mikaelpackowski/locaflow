import ListingCard from "@/components/ListingCard";
import { LISTINGS, searchListings } from "@/utils/listings";
import SearchBar from "@/components/SearchBar";

export const metadata = {
  title: "Annonces | LocaFlow",
  description: "Trouvez votre logement et filtrez les annonces selon vos critères.",
};

type PageProps = {
  searchParams?: { q?: string; max?: string; type?: string };
};

export default function AnnoncesPage({ searchParams }: PageProps) {
  const q = searchParams?.q ?? "";
  const max = Number(searchParams?.max) || undefined;
  const type = (searchParams?.type as any) || "all";

  const results = searchListings({ q, max, type });

  // 🔹 listes uniques pour l’auto-complétion & les chips
  const cities = Array.from(
    new Set(
      LISTINGS.flatMap((l) =>
        [l.city, l.district].filter(Boolean).map((x) => x!.trim()),
      ),
    ),
  ).sort((a, b) => a.localeCompare(b, "fr"));

  const types = Array.from(new Set(LISTINGS.map((l) => l.type)));

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-bold text-gray-900 text-center">Annonces</h1>
      <p className="mt-2 text-center text-gray-500">
        Explorez les biens disponibles et filtrez selon vos critères.
      </p>

      {/* 🔎 Barre de recherche (client) */}
      <SearchBar
        defaultQuery={q}
        defaultMax={searchParams?.max ?? ""}
        defaultType={type}
        cities={cities}
        types={types}
      />

      {/* Résultats */}
      {results.length === 0 ? (
        <p className="mt-10 text-center text-gray-500">
          Aucune annonce ne correspond à vos critères.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      )}
    </main>
  );
}
