// app/annonces/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AnnonceDetail() {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const fetchAnnonce = async () => {
        const { data, error } = await supabase
          .from("annonces")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error(error);
        } else {
          setAnnonce(data);
        }
      };

      fetchAnnonce();
    }
  }, [id]);

  if (!annonce) {
    return <p className="text-center mt-20">Chargement...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{annonce.titre}</h1>
      <p className="text-lg text-gray-600 mb-6">
        {annonce.surface} m² - {annonce.pieces} pièces - {annonce.ville}
      </p>
      <p className="text-xl font-semibold text-indigo-600 mb-8">
        {annonce.loyer} € / mois
      </p>

      {/* Images */}
      {annonce.images && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {annonce.images.map((url: string, i: number) => (
            <img
              key={i}
              src={url}
              alt={`Photo ${i + 1}`}
              className="rounded-lg shadow"
            />
          ))}
        </div>
      )}

      {/* Description */}
      <p className="text-gray-700 leading-relaxed mb-8">
        {annonce.description}
      </p>

      <a
        href={`/contact?annonce=${id}`}
        className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-500"
      >
        Contacter
      </a>
    </div>
  );
}
