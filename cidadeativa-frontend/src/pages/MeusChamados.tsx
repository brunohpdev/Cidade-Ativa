
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { obterCidadao } from "../services/sessao";

import type {
  ChamadoCidadao
} from "../types/ChamadoCidadao";

function MeusChamados() {
  const usuario = obterCidadao();

  const [chamados, setChamados] = useState<ChamadoCidadao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!usuario) return;

    let ativo = true;

    async function carregar() {
      try {
        const dados = await api(
          `/api/chamados/usuario/${usuario!.cdUsuario}`
        );

        if (ativo) setChamados(dados);
      } catch {
        if (ativo) {
          setErro("Não foi possível carregar seus chamados.");
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, [usuario?.cdUsuario]);

  if (!usuario) {
    return (
      <main className="auth-container">
        <div className="auth-card">
          <h1>Acesso necessário</h1>
          <p>Entre na sua conta para consultar seus chamados.</p>
          <Link to="/login" className="btn btn-primary">
            Fazer login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="chamados-container">
      <div className="chamados-topo">
        <div>
          <h1>Meus chamados</h1>
          <p>Acompanhe suas ocorrências registradas.</p>
        </div>

        <Link to="/novo-chamado" className="btn btn-primary">
          Novo chamado
        </Link>
      </div>

      {carregando && <p>Carregando chamados...</p>}

      {erro && <p className="erro">{erro}</p>}

      {!carregando && !erro && chamados.length === 0 && (
        <div className="lista-vazia">
          <h2>Nenhum chamado cadastrado</h2>
          <p>Registre uma ocorrência para começar.</p>
        </div>
      )}

      {!carregando && !erro && (
        <div className="chamados-grid">
          {chamados.map((chamado) => (
            <article
              key={chamado.cdChamado}
              className="chamado-card"
            >
              <span className="protocolo">
                {chamado.nrProtocolo}
              </span>

              <h3>{chamado.dsEndereco}</h3>

              <p className="chamado-descricao">
                {chamado.dsDescricao}
              </p>

              <p>
                <strong>Status: </strong>
                {chamado.stChamado === "ABERTO"
                  ? "Aberto"
                  : chamado.stChamado === "EM_ANDAMENTO"
                    ? "Em andamento"
                    : "Resolvido"}
              </p>

              <Link
                className="link-detalhes"
                to={`/chamados/${chamado.cdChamado}`}
              >
                Ver detalhes
              </Link>

              {chamado.stChamado === "ABERTO" && (
                <p>
                  <Link
                    className="btn btn-outline"
                    to={`/editar-chamado/${chamado.cdChamado}`}
                  >
                    Editar chamado
                  </Link>
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default MeusChamados;
