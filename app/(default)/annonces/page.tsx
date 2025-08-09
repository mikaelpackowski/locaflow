import ListingCard from "@/components/ListingCard";
import { searchListings } from "@/utils/listings";

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

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
      <h1 className="text-3xl font-bold text-gray-900 text-center">Annonces</h1>
      <p className="mt-2 text-center text-gray-500">
        Explorez les biens disponibles et filtrez selon vos critères.
      </p>

      {/* Barre de recherche (GET) */}
      <form
        method="GET"
        className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-[1fr_180px_160px_auto]"
      >
        <input
          name="q"
          defaultValue={q}
          placeholder="Ville, quartier..."
          className="rounded-lg border px-3 py-2"
        />
        <input
          name="max"
          defaultValue={searchParams?.max ?? ""}
          placeholder="Budget max (€)"
          inputMode="numeric"
          className="rounded-lg border px-3 py-2"
        />
        <select
          name="type"
          defaultValue={type}
          className="rounded-lg border px-3 py-2"
        >
          <option value="all">Type (tous)</option>
          <option value="studio">Studio</option>
          <option value="T1">T1</option>
          <option value="T2">T2</option>
          <option value="T3">T3</option>
          <option value="maison">Maison</option>
        </select>

        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500"
        >
          Rechercher
        </button>
      </form>

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
