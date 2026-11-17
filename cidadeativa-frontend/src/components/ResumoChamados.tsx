
import type { ChamadoAgente } from "../types/Agente";

interface Props {
  chamados: ChamadoAgente[];
}

function ResumoChamados({ chamados }: Props) {
  const abertos = chamados.filter(
    (chamado) => chamado.stChamado === "ABERTO"
  ).length;

  const andamento = chamados.filter(
    (chamado) => chamado.stChamado === "EM_ANDAMENTO"
  ).length;

  const resolvidos = chamados.filter(
    (chamado) => chamado.stChamado === "RESOLVIDO"
  ).length;

  return (
    <section className="ca-resumo" aria-label="Resumo dos chamados">
      <article className="ca-resumo-card">
        <h3>Abertos</h3>
        <p>{abertos}</p>
      </article>

      <article className="ca-resumo-card">
        <h3>Em andamento</h3>
        <p>{andamento}</p>
      </article>

      <article className="ca-resumo-card">
        <h3>Resolvidos</h3>
        <p>{resolvidos}</p>
      </article>
    </section>
  );
}

export default ResumoChamados;
