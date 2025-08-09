"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  defaultQuery?: string;
  defaultMax?: string;
  defaultType?: string;
  cities: string[];            // ville + quartier uniques
  types: string[];             // ["T2", "T3", "studio", ...]
};

const PRICE_PRESETS = [700, 900, 1100, 1300, 1600];

export default function SearchBar({
  defaultQuery = "",
  defaultMax = "",
  defaultType = "all",
  cities,
  types,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(defaultQuery);
  const [max, setMax] = useState(defaultMax);
  const [type, setType] = useState(defaultType);

  // suggestions « intelligentes » (on filtre sur la frappe)
  const suggestions = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return cities.slice(0, 8);
    return cities
      .filter((c) => c.toLowerCase().includes(s))
      .slice(0, 8);
  }, [q, cities]);

  function submit(params: { q?: string; max?: string; type?: string }) {
    const next = new URLSearchParams(searchParams.toString());
    params.q !== undefined && next.set("q", params.q);
    params.max !== undefined && (params.max ? next.set("max", params.max) : next.delete("max"));
    params.type !== undefined && (params.type && params.type !== "all"
      ? next.set("type", params.type)
      : next.delete("type"));

    router.push(`/annonces?${next.toString()}`);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit({ q, max, type });
  }

  return (
    <section className="mt-8 rounded-2xl border bg-white p-4 shadow-sm">
      {/* Ligne principale */}
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_170px_170px_auto]"
      >
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ville ou quartier…"
            className="w-full rounded-lg border px-3 py-2"
            aria-label="Ville ou quartier"
          />
          {/* suggestions dropdown */}
          {q && suggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 max-h-64 w-full overflow-auto rounded-lg border bg-white shadow">
              {suggestions.map((s) => (
                <li
                  key={s}
                  className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-50"
                  onMouseDown={() => {
                    setQ(s);
                    submit({ q: s, max, type });
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          value={max}
          onChange={(e) => setMax(e.target.value.replace(/[^\d]/g, ""))}
          inputMode="numeric"
          aria-label="Budget maximum en euros"
          placeholder="Budget max (€)"
          className="rounded-lg border px-3 py-2"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-lg border px-3 py-2"
          aria-label="Type de bien"
        >
          <option value="all">Type (tous)</option>
          {/* on garde l’ordre d’origine */}
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-500"
        >
          Rechercher
        </button>
      </form>

      {/* Raccourcis prix + chips type */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="mr-2 text-xs uppercase text-gray-400">Raccourcis</span>
        {PRICE_PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => {
              setMax(String(p));
              submit({ q, max: String(p), type });
            }}
            className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50"
            type="button"
          >
            ≤ {p.toLocaleString("fr-FR")} €
          </button>
        ))}
        <span className="mx-2 h-4 w-px bg-gray-200" />
        {types.map((t) => (
          <button
            key={t}
            onClick={() => {
              setType(t);
              submit({ q, max, type: t });
            }}
            className={`rounded-full px-3 py-1 text-sm ${
              type === t
                ? "bg-indigo-600 text-white"
                : "border hover:bg-gray-50"
            }`}
            type="button"
          >
            {t}
          </button>
        ))}
        {type !== "all" && (
          <button
            onClick={() => {
              setType("all");
              submit({ q, max, type: "all" });
            }}
            className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50"
            type="button"
          >
            Tous les types
          </button>
        )}
      </div>
    </section>
  );
}
