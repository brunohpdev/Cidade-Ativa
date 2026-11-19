
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
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          Acesso restrito
        </h1>

        <p className="text-slate-600">
          Somente agentes podem acessar esta página.
        </p>
      </main>
    );
  }

  const meusChamados = chamados.filter(
    (chamado) =>
      chamado.cdAgente === usuario.cdUsuario &&
      chamado.stChamado === "EM_ANDAMENTO"
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
        Meus atendimentos
      </h1>

      <p className="mb-8 text-slate-600">
        Acompanhe os chamados que você assumiu.
      </p>

      {carregando && (
        <p role="status" className="py-5 text-slate-600">
          Carregando...
        </p>
      )}

      {erro && (
        <p
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
        >
          {erro}
        </p>
      )}

      {!carregando && !erro && meusChamados.length === 0 && (
        <p className="rounded-xl bg-slate-100 p-6 text-slate-600">
          Você não possui chamados em andamento.
        </p>
      )}

      {!carregando && !erro && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {meusChamados.map((chamado) => (
            <article
              key={chamado.cdChamado}
              className="flex min-w-0 flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="break-all text-xl font-bold text-teal-700">
                {chamado.nrProtocolo}
              </h3>

              <p className="break-words leading-7 text-slate-600">
                {chamado.dsDescricao}
              </p>

              <p className="break-words text-slate-600">
                <strong className="text-slate-900">Endereço:</strong>{" "}
                {chamado.dsEndereco}
              </p>

              <p className="text-slate-600">
                <strong className="text-slate-900">Status:</strong>{" "}
                Em andamento
              </p>

              <Link
                to={`/resolver-chamado/${chamado.cdChamado}`}
                className="mt-auto inline-flex self-start rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
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
