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
              Propriétaire
            </a>

            <a
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 px-6 py-3 text-white font-semibold hover:from-purple-600 hover:to-rose-600 transition"
              href="/auth/login?role=tenant"
            >
              Locataire
            </a>
          </div>

          {/* Vidéo intégrée optionnelle */}
          {/* 
          <div className="mt-12">
            <video
              className="rounded-xl shadow-xl mx-auto max-w-3xl"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/videos/interior-department-room.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la vidéo HTML5.
            </video>
          </div>
          */}
        </div>
      </div>
    </section>
  );
}
