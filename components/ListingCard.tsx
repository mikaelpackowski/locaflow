import Image from "next/image";
import Link from "next/link";
import type { Listing } from "@/utils/listings";

export default function ListingCard({ listing }: { listing: Listing }) {
  const img = listing.images[0] ?? "/images/placeholder.jpg";

  return (
    <article className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
      <Link href={`/annonces/${listing.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={img}
            alt={listing.title}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
      </Link>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900">
          <Link href={`/annonces/${listing.slug}`}>{listing.title}</Link>
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          {listing.surface} m² · {listing.features.slice(0, 2).join(" · ")}
        </p>

        <p className="mt-2 text-sm font-semibold">
          {listing.price.toLocaleString("fr-FR")} € / mois
        </p>

        <Link
          href={`/annonces/${listing.slug}`}
          className="mt-3 inline-block text-sm text-indigo-600 hover:text-indigo-700"
        >
          Voir le détail
        </Link>
      </div>
    </article>
  );
}
