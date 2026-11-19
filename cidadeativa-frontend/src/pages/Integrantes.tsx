
type Integrante = {
  nome: string;
  rm: string;
  turma: string;
  imagem: string;
  github: string;
  linkedin: string;
};

const integrantes: Integrante[] = [
  {
    nome: "Bruno Henrique Pizzo",
    rm: "572362",
    turma: "1TDSPY",
    imagem: "/img/Bruno.png",
    github: "https://github.com/brunohpdev",
    linkedin: "https://www.linkedin.com/in/bruno-pizzo-72b74138b/"
  },
  {
    nome: "Murilo Castellano Bernardes",
    rm: "569757",
    turma: "1TDSPY",
    imagem: "/img/Murilo.png",
    github: "https://github.com/mucastellano",
    linkedin: "https://www.linkedin.com/in/murilo-castellano-bernardes-27b430324/"
  },
  {
    nome: "Nicolas Kristman Perini",
    rm: "573541",
    turma: "1TDSPY",
    imagem: "/img/Nicolas.png",
    github: "https://github.com/nicolaskp14",
    linkedin: "https://www.linkedin.com/in/nicolas-kristman-perini-8b780a380/"
  },
  {
    nome: "Rodrigo Bertolla Silveira",
    rm: "570141",
    turma: "1TDSPY",
    imagem: "/img/Rodrigo.png",
    github: "https://github.com/rodrigobertolla",
    linkedin: "https://www.linkedin.com/in/rodrigo-bertolla-silveira-4475a43b5/"
  }
];

export default function Integrantes() {
  return (
    <main className="min-h-[70vh] bg-slate-50">
      <section className="bg-gradient-to-br from-teal-700 to-teal-900 px-5 py-16 text-center text-white">
        <span className="mb-5 inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
          Equipe DevForce
        </span>

        <h1 className="mb-5 text-3xl font-bold text-white md:text-5xl">
          Integrantes
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-teal-50">
          Conheça a equipe responsável pelo desenvolvimento
          do CidadeAtiva.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {integrantes.map((integrante) => (
            <article
              key={integrante.rm}
              className="flex min-w-0 flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
            >
              <img
                src={integrante.imagem}
                alt={`Foto de ${integrante.nome}`}
                className="mb-5 h-36 w-36 rounded-full border-4 border-teal-700 object-cover"
              />

              <h2 className="mb-3 text-xl font-bold text-slate-900">
                {integrante.nome}
              </h2>

              <p className="mb-1 text-sm text-slate-600">
                RM {integrante.rm}
              </p>

              <p className="mb-6 text-sm text-slate-600">
                Turma {integrante.turma}
              </p>

              <div className="mt-auto flex flex-wrap justify-center gap-2">
                <a
                  href={integrante.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  GitHub
                </a>

                <a
                  href={integrante.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
                >
                  LinkedIn
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
