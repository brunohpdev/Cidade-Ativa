
import { useEffect, useState } from "react";
import { listarChamados } from "../services/agenteService";
import type { ChamadoAgente } from "../types/Agente";

function PainelAgente() {
  const [chamados, setChamados] = useState<ChamadoAgente[]>([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    listarChamados()
      .then(setChamados)
      .catch(() => setErro("Erro ao carregar chamados."))
      .finally(() => setCarregando(false));
  }, []);

  // Mostrar apenas chamados abertos e sem agente
  const chamadosDisponiveis = chamados.filter(
    (chamado) =>
      chamado.stChamado === "ABERTO" &&
      chamado.cdAgente === null
  );

  if (carregando) {
    return (
      <main className="chamados-container">
        <p>Carregando chamados...</p>
      </main>
    );
  }

  return (
    <main className="chamados-container">
      <h1>Painel do agente público</h1>

      <p>
        Consulte os chamados disponíveis para atendimento
        na cidade.
      </p>

      {erro && (
        <p className="erro">{erro}</p>
      )}

      {!erro && (
        <>
          <h2>Chamados disponíveis</h2>

          <p>
            Total de chamados disponíveis:{" "}
            {chamadosDisponiveis.length}
          </p>

          {chamadosDisponiveis.length === 0 ? (
            <div className="lista-vazia">
              <h3>Nenhum chamado disponível</h3>
              <p>
                Não existem chamados abertos
                aguardando um agente no momento.
              </p>
            </div>
          ) : (
            <div className="chamados-grid">
              {chamadosDisponiveis.map((chamado) => (
                <article
                  className="chamado-card"
                  key={chamado.cdChamado}
                >
                  <span className="protocolo">
                    {chamado.nrProtocolo}
                  </span>

                  <h3>Chamado #{chamado.cdChamado}</h3>

                  <p className="chamado-descricao">
                    {chamado.dsDescricao}
                  </p>

                  <div className="chamado-informacoes">
                    <p>
                      <strong>Endereço:</strong>{" "}
                      {chamado.dsEndereco}
                    </p>

                    <p>
                      <strong>Status:</strong> Aberto
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default PainelAgente;
