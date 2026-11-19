
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
    <main className="institucional">
      <section className="institucional-topo">
        <span className="institucional-tag">Equipe DevForce</span>
        <h1>Integrantes</h1>
        <p>
          Conheça a equipe responsável pelo desenvolvimento do CidadeAtiva.
        </p>
      </section>

      <section className="institucional-conteudo">
        <div className="integrantes-grid">
          {integrantes.map((integrante) => (
            <article className="integrante-card-completo" key={integrante.rm}>
              <img
                src={integrante.imagem}
                alt={`Foto de ${integrante.nome}`}
                className="integrante-foto"
              />

              <h2>{integrante.nome}</h2>

              <p>RM {integrante.rm}</p>
              <p>Turma {integrante.turma}</p>

              <div className="integrante-links">
                <a
                  href={integrante.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="integrante-github"
                >
                  GitHub
                </a>

                <a
                  href={integrante.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="integrante-linkedin"
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
