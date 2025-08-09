// app/annonces/page.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AnnoncesPage() {
  const [annonces, setAnnonces] = useState<any[]>([]);
  const [ville, setVille] = useState("");
  const [budget, setBudget] = useState("");
  const [type, setType] = useState("");

  const fetchAnnonces = async () => {
    let query = supabase.from("annonces").select("*");

    if (ville) query = query.ilike("ville", `%${ville}%`);
    if (budget) query = query.lte("loyer", Number(budget));
    if (type) query = query.eq("type", type);

    const { data, error } = await query;

    if (error) {
      console.error(error);
    } else {
      setAnnonces(data || []);
    }
  };

  useEffect(() => {
    fetchAnnonces();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Annonces</h1>

      {/* Filtres */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <input
          placeholder="Ville, quartier..."
          value={ville}
          onChange={(e) => setVille(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />
        <input
          type="number"
          placeholder="Budget max (€)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">Type</option>
          <option value="Appartement">Appartement</option>
          <option value="Maison">Maison</option>
        </select>
        <button
          onClick={fetchAnnonces}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500"
        >
          Rechercher
        </button>
      </div>

      {/* Liste des annonces */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {annonces.map((a) => (
          <div
            key={a.id}
            className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            {a.images && a.images[0] && (
              <img src={a.images[0]} alt={a.titre} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h2 className="font-bold text-lg">{a.titre}</h2>
              <p className="text-sm text-gray-500">{a.surface} m² - {a.ville}</p>
              <p className="text-indigo-600 font-semibold">{a.loyer} € / mois</p>
              <a
                href={`/annonces/${a.id}`}
                className="text-blue-600 hover:underline text-sm mt-2 inline-block"
              >
                Voir le détail
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
