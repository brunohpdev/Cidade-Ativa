
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarChamados } from "../services/agenteService";
import { obterUsuario } from "../services/usuarioLogado";
import type { ChamadoAgente } from "../types/Agente";

function MeusAtendimentos() {
  const usuario = obterUsuario();

  const [chamados, setChamados] = useState<ChamadoAgente[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await listarChamados();
        setChamados(dados);
      } catch {
        setErro("Erro ao carregar atendimentos.");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  if (!usuario || usuario.tpUsuario !== "AGENTE") {
    return (
      <main className="chamados-container">
        <h1>Acesso restrito</h1>
        <p>Somente agentes podem acessar esta página.</p>
      </main>
    );
  }

  const meusChamados = chamados.filter(
    (chamado) =>
      chamado.cdAgente === usuario.cdUsuario &&
      chamado.stChamado === "EM_ANDAMENTO"
  );

  return (
    <main className="chamados-container">
      <h1>Meus atendimentos</h1>

      <p>
        Acompanhe os chamados que você assumiu.
      </p>

      {carregando && <p>Carregando...</p>}

      {erro && <p className="erro">{erro}</p>}

      {!carregando && !erro && meusChamados.length === 0 && (
        <p>Você não possui chamados em andamento.</p>
      )}

      {!carregando && !erro && (
        <div className="chamados-grid">
          {meusChamados.map((chamado) => (
            <article
              className="chamado-card"
              key={chamado.cdChamado}
            >
              <h3>{chamado.nrProtocolo}</h3>

              <p>{chamado.dsDescricao}</p>

              <p>
                <strong>Endereço:</strong>{" "}
                {chamado.dsEndereco}
              </p>

              <p>
                <strong>Status:</strong> Em andamento
              </p>

              <Link
                className="btn btn-primary"
                to={`/resolver-chamado/${chamado.cdChamado}`}
              >
                Resolver chamado
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default MeusAtendimentos;
