
import { useEffect, useState } from "react";

import {
  listarChamados,
  assumirChamado
} from "../services/agenteService";

import { obterUsuario } from "../services/usuarioLogado";
import BotaoAtualizar from "../components/BotaoAtualizar";

import type { ChamadoAgente } from "../types/Agente";

function PainelAgente() {
  const [chamados, setChamados] = useState<ChamadoAgente[]>([]);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [assumindoId, setAssumindoId] = useState<number | null>(null);

  const usuario = obterUsuario();

  // Buscar chamados atualizados da API
  async function carregarChamados() {
    setCarregando(true);

    try {
      const dados = await listarChamados();

      setChamados(dados);
      setErro("");
    } catch {
      setErro("Erro ao carregar chamados.");
    } finally {
      setCarregando(false);
    }
  }

  // Buscar chamados ao abrir a pagina
  useEffect(() => {
    carregarChamados();
  }, []);

  // Mostrar apenas chamados abertos e sem agente
  const chamadosDisponiveis = chamados.filter(
    (chamado) =>
      chamado.stChamado === "ABERTO" &&
      chamado.cdAgente === null
  );

  // Assumir um chamado
  async function assumir(id: number) {
    if (!usuario || usuario.tpUsuario !== "AGENTE") {
      setErro("Somente agentes podem assumir chamados.");
      return;
    }

    const confirmou = window.confirm(
      "Deseja assumir este chamado?"
    );

    if (!confirmou) {
      return;
    }

    setErro("");
    setSucesso("");
    setAssumindoId(id);

    try {
      await assumirChamado(id, usuario.cdUsuario);

      setSucesso("Chamado assumido com sucesso!");

      // Atualizar a lista apos assumir
      await carregarChamados();
    } catch {
      setErro(
        "Não foi possível assumir o chamado. " +
        "Ele pode já ter sido assumido por outro agente."
      );
    } finally {
      setAssumindoId(null);
    }
  }

  // Restringir a pagina aos agentes
  if (!usuario || usuario.tpUsuario !== "AGENTE") {
    return (
      <main className="chamados-container">
        <h1>Acesso restrito</h1>

        <p>
          Somente agentes públicos podem acessar esta página.
        </p>
      </main>
    );
  }

  if (carregando && chamados.length === 0) {
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
        Consulte os chamados disponíveis e escolha
        quais deseja atender.
      </p>

      {/* Botao do commit 3 */}
      <BotaoAtualizar
        atualizar={carregarChamados}
        carregando={carregando}
      />

      {erro && (
        <p className="erro" role="alert">
          {erro}
        </p>
      )}

      {sucesso && (
        <p className="mensagem-sucesso" role="status">
          {sucesso}
        </p>
      )}

      <h2>Chamados disponíveis</h2>

      <p>
        Total de chamados disponíveis:{" "}
        {chamadosDisponiveis.length}
      </p>

      {chamadosDisponiveis.length === 0 ? (
        <div className="lista-vazia">
          <h3>Nenhum chamado disponível</h3>

          <p>
            Não existem chamados abertos aguardando
            atendimento no momento.
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

              <h3>
                Chamado #{chamado.cdChamado}
              </h3>

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

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => assumir(chamado.cdChamado)}
                disabled={assumindoId !== null}
              >
                {assumindoId === chamado.cdChamado
                  ? "Assumindo..."
                  : "Assumir chamado"}
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default PainelAgente;
