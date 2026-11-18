
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  buscarChamado,
  resolverChamado
} from "../services/agenteService";
import { obterUsuario } from "../services/usuarioLogado";
import type { ChamadoAgente } from "../types/Agente";

function ResolverChamado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const usuario = obterUsuario();

  const [chamado, setChamado] = useState<ChamadoAgente | null>(null);
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        if (!id || !Number.isInteger(Number(id))) {
          throw new Error("ID inválido");
        }

        const dados = await buscarChamado(Number(id));
        setChamado(dados);
      } catch {
        setErro("Não foi possível carregar o chamado.");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, [id]);

  if (!usuario || usuario.tpUsuario !== "AGENTE") {
    return (
      <main className="chamados-container">
        <h1>Acesso restrito</h1>
        <p>Somente agentes podem resolver chamados.</p>
      </main>
    );
  }

  if (carregando) {
    return (
      <main className="chamados-container">
        <p>Carregando...</p>
      </main>
    );
  }

  if (
    !chamado ||
    chamado.stChamado !== "EM_ANDAMENTO" ||
    chamado.cdAgente !== usuario.cdUsuario
  ) {
    return (
      <main className="chamados-container">
        <h1>Resolução indisponível</h1>

        <p>
          {erro ||
            "Este chamado não está sob sua responsabilidade."}
        </p>

        <Link to="/meus-atendimentos">
          Voltar
        </Link>
      </main>
    );
  }

  async function salvar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (!usuario || !chamado) {
      return;
    }

    if (!descricao.trim()) {
      setErro("A descrição da resolução é obrigatória.");
      return;
    }

    setSalvando(true);
    setErro("");

    try {
      await resolverChamado(chamado.cdChamado, {
        cdUsuario: usuario.cdUsuario,
        dsObservacao: descricao.trim(),
        dsFoto: foto.trim() || null
      });

      navigate("/meus-atendimentos");
    } catch {
      setErro("Não foi possível resolver o chamado.");
    } finally {
      setSalvando(false);
    }
  }

 
return (
  <main className="chamados-container ca-editor-page">
    <header className="ca-resolver-header">
      <h1>Resolver chamado</h1>
      <p>
        Registre as informações do atendimento realizado
        para concluir esta ocorrência.
      </p>
    </header>

    <section className="ca-resolver-card">
      <h2>Informações da ocorrência</h2>

      <div className="ca-resolver-infos">
        <div className="ca-resolver-info">
          <span>Protocolo</span>
          <strong>{chamado.nrProtocolo}</strong>
        </div>

        <div className="ca-resolver-info">
          <span>Status</span>
          <strong>Em andamento</strong>
        </div>

        <div className="ca-resolver-info ca-resolver-info-full">
          <span>Descrição do problema</span>
          <p>{chamado.dsDescricao}</p>
        </div>

        <div className="ca-resolver-info ca-resolver-info-full">
          <span>Endereço</span>
          <p>{chamado.dsEndereco}</p>
        </div>
      </div>
    </section>

    <section className="ca-resolver-card">
      <h2>Registrar resolução</h2>
      <p>
        Descreva como o problema foi resolvido.
        A foto de comprovação é opcional.
      </p>

      <form onSubmit={salvar} className="ca-resolver-form">
        <div className="ca-resolver-campo">
          <label htmlFor="descricao-resolucao">
            Descrição da resolução *
          </label>

          <textarea
            id="descricao-resolucao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={5}
            maxLength={1000}
            required
            placeholder="Descreva o serviço realizado pela equipe"
          />
        </div>

        <div className="ca-resolver-campo">
          <label htmlFor="foto-resolucao">
            URL da foto (opcional)
          </label>

          <input
            id="foto-resolucao"
            type="url"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
            placeholder="https://exemplo.com/foto.jpg"
          />
        </div>

        {erro && (
          <p className="ca-resolver-erro" role="alert">
            {erro}
          </p>
        )}

        <div className="ca-resolver-acoes">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={salvando}
          >
            {salvando ? "Salvando..." : "Concluir atendimento"}
          </button>

          <Link
            to="/meus-atendimentos"
            className="btn ca-resolver-voltar"
          >
            Voltar
          </Link>
        </div>
      </form>
    </section>
  </main>
);

}

export default ResolverChamado;
