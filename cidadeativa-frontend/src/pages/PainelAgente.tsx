
import { useEffect, useState } from "react";

import {
  listarChamados,
  assumirChamado
} from "../services/agenteService";

import { obterUsuario } from "../services/usuarioLogado";
import BotaoAtualizar from "../components/BotaoAtualizar";
import Carregamento from "../components/Carregamento";
import MensagemErro from "../components/MensagemErro";
import ResumoChamados from "../components/ResumoChamados";

import type { ChamadoAgente } from "../types/Agente";

function PainelAgente() {
  const [chamados, setChamados] = useState<ChamadoAgente[]>([]);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [assumindoId, setAssumindoId] = useState<number | null>(null);

  const usuario = obterUsuario();

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

  useEffect(() => {
    carregarChamados();
  }, []);

  const chamadosDisponiveis = chamados.filter(
    (chamado) =>
      chamado.stChamado === "ABERTO" &&
      chamado.cdAgente === null
  );

  async function assumir(id: number) {
    if (!usuario || usuario.tpUsuario !== "AGENTE") {
      setErro("Somente agentes podem assumir chamados.");
      return;
    }

    const confirmou = window.confirm(
      "Deseja assumir este chamado?"
    );

    if (!confirmou) return;

    setErro("");
    setSucesso("");
    setAssumindoId(id);

    try {
      await assumirChamado(id, usuario.cdUsuario);
      setSucesso("Chamado assumido com sucesso!");
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

  const container =
    "mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14";

  if (!usuario || usuario.tpUsuario !== "AGENTE") {
    return (
      <main className={container}>
        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          Acesso restrito
        </h1>
        <p className="text-slate-600">
          Somente agentes públicos podem acessar esta página.
        </p>
      </main>
    );
  }

  if (carregando && chamados.length === 0 && !erro) {
    return (
      <main className={container}>
        <Carregamento mensagem="Buscando chamados..." />
      </main>
    );
  }

  return (
    <main className={container}>
      <h1 className="mb-7 text-3xl font-bold text-slate-900 md:text-4xl">
        Painel do agente público
      </h1>

      <div className="mb-7">
        <ResumoChamados chamados={chamados} />
      </div>

      <p className="mb-6 leading-7 text-slate-600">
        Consulte os chamados disponíveis e escolha
        quais deseja atender.
      </p>

      <div className="mb-7">
        <BotaoAtualizar
          atualizar={carregarChamados}
          carregando={carregando}
        />
      </div>

      {erro && (
        <div className="mb-6" role="alert">
          <MensagemErro mensagem={erro} />
        </div>
      )}

      {sucesso && (
        <p
          className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800"
          role="status"
        >
          {sucesso}
        </p>
      )}

      <h2 className="mb-3 text-2xl font-bold text-slate-900">
        Chamados disponíveis
      </h2>

      <p className="mb-6 text-slate-600">
        Total de chamados disponíveis:{" "}
        <strong>{chamadosDisponiveis.length}</strong>
      </p>

      {chamadosDisponiveis.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-100 p-7">
          <h3 className="mb-3 text-xl font-bold text-slate-900">
            Nenhum chamado disponível
          </h3>

          <p className="text-slate-600">
            Não existem chamados abertos aguardando
            atendimento no momento.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {chamadosDisponiveis.map((chamado) => (
            <article
              key={chamado.cdChamado}
              className="flex min-w-0 flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="break-all text-xs font-semibold text-slate-500">
                {chamado.nrProtocolo}
              </span>

              <h3 className="text-xl font-bold text-teal-700">
                Chamado #{chamado.cdChamado}
              </h3>

              <p className="break-words leading-7 text-slate-600">
                {chamado.dsDescricao}
              </p>

              <div className="space-y-3 text-sm text-slate-600">
                <p className="break-words">
                  <strong className="text-slate-900">
                    Endereço:
                  </strong>{" "}
                  {chamado.dsEndereco}
                </p>

                <p>
                  <strong className="text-slate-900">
                    Status:
                  </strong>{" "}
                  Aberto
                </p>
              </div>

              <button
                type="button"
                onClick={() => assumir(chamado.cdChamado)}
                disabled={assumindoId !== null}
                className="mt-auto self-start rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
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
