import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative">
      {/* Image de fond pleine largeur */}
      <div className="relative h-[70vh] min-h-[480px] w-full overflow-hidden md:h-[78vh]">
        <Image
          src="/images/hero-header.jpg"     // ← ton image
          alt="Appartement lumineux avec vue"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay sombre + léger dégradé bas pour le texte */}
        <div className="absolute inset-0 bg-black/35" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Contenu centré */}
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4 sm:px-6">
          <div className="w-full text-center">
            <h1 className="mx-auto max-w-3xl text-4xl font-extrabold text-white md:max-w-4xl md:text-6xl">
              Bienvenue sur <span className="bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-transparent">LocaFlow</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base text-white/80 md:text-lg">
              Simplifiez la gestion locative : dépôt de bien, recherche de logement, automatisations.
            </p>

            {/* Boutons */}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/auth/login?role=owner"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-indigo-500"
              >
                Propriétaire
              </a>
              <a
                href="/auth/login?role=tenant"
                className="inline-flex items-center justify-center rounded-lg bg-white/95 px-6 py-3 font-semibold text-gray-900 backdrop-blur transition hover:bg-white"
              >
                Locataire
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Séparateur sous le header (comme le template Cruip) */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t border-gray-200 py-12 md:py-16" />
      </div>
    </section>
  );
}
