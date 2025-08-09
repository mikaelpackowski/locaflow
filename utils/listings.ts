// utils/listings.ts
export type Listing = {
  id: string;
  slug: string;                 // pour l’URL: /annonces/[slug]
  title: string;
  city: string;
  district?: string;
  type: "studio" | "T1" | "T2" | "T3" | "maison";
  surface: number;              // m²
  price: number;                // €/mois
  features: string[];           // ex: ["Balcon", "Rénové"]
  description: string;
  images: string[];             // chemins public/...
  coords?: { lat: number; lng: number };
};

export const LISTINGS: Listing[] = [
  {
    id: "apt-001",
    slug: "appartement-t2-centre-ville-1",
    title: "Appartement T2 – Centre-ville",
    city: "Lyon",
    district: "Cordeliers",
    type: "T2",
    surface: 45,
    price: 1050,
    features: ["Balcon", "Rénové", "Dernier étage"],
    description:
      "Charmant T2 rénové au cœur de la Presqu'île, lumineux, proche métro et commerces.",
    images: [
      "/images/annonces/apt-01.jpg",
      "/images/annonces/apt-01b.jpg",
      "/images/annonces/apt-01c.jpg",
    ],
    coords: { lat: 45.764, lng: 4.8357 },
  },
  {
    id: "apt-002",
    slug: "appartement-t2-centre-ville-2",
    title: "Appartement T2 – Centre-ville",
    city: "Lyon",
    district: "Bellecour",
    type: "T2",
    surface: 44,
    price: 990,
    features: ["Ascenseur", "Cuisine équipée"],
    description:
      "Bel appartement au calme, belle hauteur sous plafond, idéal jeune couple.",
    images: [
      "/images/annonces/apt-02.jpg",
      "/images/annonces/apt-02b.jpg",
      "/images/annonces/apt-02c.jpg",
    ],
  },
  {
    id: "apt-003",
    slug: "appartement-t3-terrasse",
    title: "Appartement T3 – Terrasse",
    city: "Villeurbanne",
    district: "Gratte-Ciel",
    type: "T3",
    surface: 62,
    price: 1250,
    features: ["Terrasse", "Parking", "Récemment livré"],
    description:
      "T3 récent avec grande terrasse exposée sud, place de stationnement incluse.",
    images: [
      "/images/annonces/apt-03.jpg",
      "/images/annonces/apt-03b.jpg",
    ],
  },
];

export function searchListings(params: {
  q?: string;
  max?: number;
  type?: Listing["type"] | "all";
}) {
  const q = (params.q ?? "").trim().toLowerCase();
  const max = params.max ?? Infinity;
  const type = (params.type ?? "all") as Listing["type"] | "all";

  return LISTINGS.filter((l) => {
    const matchesQuery =
      !q ||
      l.city.toLowerCase().includes(q) ||
      l.district?.toLowerCase().includes(q) ||
      l.title.toLowerCase().includes(q);
    const matchesPrice = l.price <= max;
    const matchesType = type === "all" || l.type === type;
    return matchesQuery && matchesPrice && matchesType;
  });
}

export function getBySlug(slug: string) {
  return LISTINGS.find((l) => l.slug === slug) ?? null;
}
