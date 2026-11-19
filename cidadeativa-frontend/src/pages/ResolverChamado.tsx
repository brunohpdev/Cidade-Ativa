
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

  const container =
    "mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14";

  const card =
    "mb-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8";

  const campo =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100";

  if (!usuario || usuario.tpUsuario !== "AGENTE") {
    return (
      <main className={container}>
        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          Acesso restrito
        </h1>
        <p className="text-slate-600">
          Somente agentes podem resolver chamados.
        </p>
      </main>
    );
  }

  if (carregando) {
    return (
      <main className={container}>
        <p role="status" className="text-slate-600">
          Carregando...
        </p>
      </main>
    );
  }

  if (
    !chamado ||
    chamado.stChamado !== "EM_ANDAMENTO" ||
    chamado.cdAgente !== usuario.cdUsuario
  ) {
    return (
      <main className={container}>
        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          Resolução indisponível
        </h1>

        <p className="mb-6 text-slate-600">
          {erro || "Este chamado não está sob sua responsabilidade."}
        </p>

        <Link
          to="/meus-atendimentos"
          className="inline-flex rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
        >
          Voltar
        </Link>
      </main>
    );
  }

  async function salvar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (!usuario || !chamado) return;

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
    <main className={container}>
      <header className="mb-9">
        <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
          Resolver chamado
        </h1>

        <p className="max-w-3xl leading-7 text-slate-600">
          Registre as informações do atendimento realizado
          para concluir esta ocorrência.
        </p>
      </header>

      <section className={card}>
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Informações da ocorrência
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="min-w-0 rounded-xl border border-teal-100 bg-teal-50/60 p-5">
            <span className="mb-2 block text-sm text-slate-500">
              Protocolo
            </span>
            <strong className="break-all text-slate-900">
              {chamado.nrProtocolo}
            </strong>
          </div>

          <div className="rounded-xl border border-teal-100 bg-teal-50/60 p-5">
            <span className="mb-2 block text-sm text-slate-500">
              Status
            </span>
            <strong className="text-slate-900">
              Em andamento
            </strong>
          </div>

          <div className="rounded-xl border border-teal-100 bg-teal-50/60 p-5 sm:col-span-2">
            <span className="mb-2 block text-sm text-slate-500">
              Descrição do problema
            </span>
            <p className="break-words leading-7 text-slate-800">
              {chamado.dsDescricao}
            </p>
          </div>

          <div className="rounded-xl border border-teal-100 bg-teal-50/60 p-5 sm:col-span-2">
            <span className="mb-2 block text-sm text-slate-500">
              Endereço
            </span>
            <p className="break-words leading-7 text-slate-800">
              {chamado.dsEndereco}
            </p>
          </div>
        </div>
      </section>

      <section className={card}>
        <h2 className="mb-3 text-2xl font-bold text-slate-900">
          Registrar resolução
        </h2>

        <p className="mb-7 text-slate-600">
          Descreva como o problema foi resolvido.
          A foto de comprovação é opcional.
        </p>

        <form onSubmit={salvar} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="descricao-resolucao"
              className="font-semibold text-slate-700"
            >
              Descrição da resolução *
            </label>

            <textarea
              id="descricao-resolucao"
              className={`${campo} min-h-40 resize-y`}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={5}
              maxLength={1000}
              required
              placeholder="Descreva o serviço realizado pela equipe"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="foto-resolucao"
              className="font-semibold text-slate-700"
            >
              URL da foto (opcional)
            </label>

            <input
              id="foto-resolucao"
              className={campo}
              type="url"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              placeholder="https://exemplo.com/foto.jpg"
            />
          </div>

          {erro && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
            >
              {erro}
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={salvando}
              className="rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {salvando ? "Salvando..." : "Concluir atendimento"}
            </button>

            <Link
              to="/meus-atendimentos"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-slate-100 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-200"
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
