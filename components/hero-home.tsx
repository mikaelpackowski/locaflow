export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Bienvenue sur LocaFlow
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mb-10">
            Simplifiez la gestion locative : dépôt de bien, recherche de logement, automatisation des démarches.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
            <a
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-6 py-3 text-white font-semibold hover:bg-indigo-600 transition"
              href="/auth/login?role=owner"
            >
              🏠 Propriétaire
            </a>

            <a
             className="btn bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white hover:from-purple-600 hover:to-rose-600"
              href="/auth/login?role=tenant"
            >
              🔑 Locataire
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
