
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { api } from "../services/api";
import { obterCidadao } from "../services/sessao";

import type { ChamadoCidadao } from "../types/ChamadoCidadao";

const statusClasses: Record<string, string> = {
  ABERTO: "bg-amber-100 text-amber-800",
  EM_ANDAMENTO: "bg-blue-100 text-blue-800",
  RESOLVIDO: "bg-green-100 text-green-800"
};

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
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h1 className="mb-4 text-2xl font-bold text-slate-900">
            Acesso necessário
          </h1>

          <p className="mb-7 text-slate-600">
            Entre na sua conta para consultar seus chamados.
          </p>

          <Link
            to="/login"
            className="inline-flex rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
          >
            Fazer login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h1 className="mb-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Meus chamados
          </h1>

          <p className="text-slate-600">
            Acompanhe suas ocorrências registradas.
          </p>
        </div>

        <Link
          to="/novo-chamado"
          className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
        >
          Novo chamado
        </Link>
      </div>

      {carregando && (
        <p role="status" className="py-5 text-slate-600">
          Carregando chamados...
        </p>
      )}

      {erro && (
        <p
          role="alert"
          className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
        >
          {erro}
        </p>
      )}

      {!carregando && !erro && chamados.length === 0 && (
        <div className="rounded-xl bg-slate-100 p-8 text-center">
          <h2 className="mb-3 text-xl font-bold text-slate-900">
            Nenhum chamado cadastrado
          </h2>

          <p className="text-slate-600">
            Registre uma ocorrência para começar.
          </p>
        </div>
      )}

      {!carregando && !erro && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {chamados.map((chamado) => (
            <article
              key={chamado.cdChamado}
              className="flex min-w-0 flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="break-all text-xs font-semibold text-slate-500">
                {chamado.nrProtocolo}
              </span>

              <h3 className="break-words text-xl font-bold text-teal-700">
                {chamado.dsEndereco}
              </h3>

              <p className="break-words leading-7 text-slate-600">
                {chamado.dsDescricao}
              </p>

              <p className="flex flex-wrap items-center gap-2">
                <strong className="text-slate-900">
                  Status:
                </strong>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    statusClasses[chamado.stChamado] ??
                    "bg-slate-100 text-slate-700"
                  }`}
                >
                  {chamado.stChamado === "ABERTO"
                    ? "Aberto"
                    : chamado.stChamado === "EM_ANDAMENTO"
                      ? "Em andamento"
                      : "Resolvido"}
                </span>
              </p>

              <Link
                to={`/chamados/${chamado.cdChamado}`}
                className="font-semibold text-teal-700 hover:underline"
              >
                Ver detalhes
              </Link>

              {chamado.stChamado === "ABERTO" && (
                <Link
                  to={`/editar-chamado/${chamado.cdChamado}`}
                  className="inline-flex self-start rounded-lg border-2 border-teal-700 px-5 py-3 font-semibold text-teal-700 transition hover:bg-teal-50"
                >
                  Editar chamado
                </Link>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default MeusChamados;
