
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, CalendarDays } from "lucide-react";

import { api } from "../services/api";
import type { Chamado, Categoria, Regiao } from "../types/Chamado";
import type { Historico } from "../types/Historico";

const statusClasses: Record<string, string> = {
  ABERTO: "bg-amber-100 text-amber-800",
  EM_ANDAMENTO: "bg-blue-100 text-blue-800",
  RESOLVIDO: "bg-green-100 text-green-800"
};

function DetalhesChamado() {
  const { id } = useParams();

  const [chamado, setChamado] = useState<Chamado | null>(null);
  const [categoria, setCategoria] = useState("");
  const [regiao, setRegiao] = useState("");
  const [historico, setHistorico] = useState<Historico[]>([]);

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      setCarregando(true);
      setErro("");

      try {
        const [dadosChamado, categorias, regioes, dadosHistorico] =
          await Promise.all([
            api(`/api/chamados/${id}`),
            api("/api/categorias"),
            api("/api/regioes"),
            api(`/api/chamados/${id}/historico`)
          ]);

        const chamadoAtual = dadosChamado as Chamado;

        const categoriaAtual = (categorias as Categoria[]).find(
          (item) => item.cdCategoria === chamadoAtual.cdCategoria
        );

        const regiaoAtual = (regioes as Regiao[]).find(
          (item) => item.cdRegiao === chamadoAtual.cdRegiao
        );

        setChamado(chamadoAtual);
        setCategoria(categoriaAtual?.nmCategoria ?? "Não informada");
        setRegiao(
          regiaoAtual
            ? `${regiaoAtual.nmBairro} - ${regiaoAtual.nmCidade}`
            : "Não informada"
        );
        setHistorico(dadosHistorico);
      } catch {
        setErro("Não foi possível carregar os detalhes do chamado.");
      } finally {
        setCarregando(false);
      }
    }

    if (id) {
      carregar();
    } else {
      setCarregando(false);
      setErro("Identificador do chamado não informado.");
    }
  }, [id]);

  function nomeStatus(status: string) {
    if (status === "ABERTO") return "Aberto";
    if (status === "EM_ANDAMENTO") return "Em andamento";
    if (status === "RESOLVIDO") return "Resolvido";
    return status;
  }

  function formatarData(data: string | null) {
    if (!data) return "Não informada";

    const dataConvertida = new Date(data);

    if (Number.isNaN(dataConvertida.getTime())) return data;

    return dataConvertida.toLocaleDateString("pt-BR");
  }

  const container = "mx-auto w-full max-w-5xl px-4 py-10 sm:px-6";
  const voltar =
    "mb-7 inline-flex items-center gap-2 font-semibold text-teal-700 hover:underline";
  const card =
    "mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8";

  if (carregando) {
    return (
      <main className={container}>
        <p role="status" className="text-slate-600">
          Carregando chamado...
        </p>
      </main>
    );
  }

  if (erro || !chamado) {
    return (
      <main className={container}>
        <p role="alert" className="mb-5 rounded-lg bg-red-50 p-4 text-red-700">
          {erro || "Chamado não encontrado."}
        </p>

        <Link to="/chamados" className={voltar}>
          <ArrowLeft size={18} />
          Voltar para chamados
        </Link>
      </main>
    );
  }

  return (
    <main className={container}>
      <Link to="/chamados" className={voltar}>
        <ArrowLeft size={18} />
        Voltar para chamados
      </Link>

      <section className={card}>
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="mb-2 break-all text-sm font-semibold text-slate-500">
              Protocolo: {chamado.nrProtocolo}
            </p>

            <h1 className="text-3xl font-bold text-slate-900">
              {categoria}
            </h1>
          </div>

          <span
            className={`rounded-full px-3 py-2 text-sm font-bold ${
              statusClasses[chamado.stChamado] ??
              "bg-slate-100 text-slate-700"
            }`}
          >
            {nomeStatus(chamado.stChamado)}
          </span>
        </div>

        <h2 className="mb-4 text-xl font-bold text-slate-900">
          Descrição do problema
        </h2>

        <p className="mb-8 break-words leading-8 text-slate-600">
          {chamado.dsDescricao}
        </p>

        <div className="space-y-5 border-t border-slate-200 pt-6 text-slate-600">
          <p className="flex flex-wrap items-start gap-2">
            <MapPin size={18} className="mt-1 shrink-0 text-teal-700" />
            <strong className="text-slate-900">Região:</strong>
            {regiao}
          </p>

          <p className="flex flex-wrap items-start gap-2">
            <MapPin size={18} className="mt-1 shrink-0 text-teal-700" />
            <strong className="text-slate-900">Endereço:</strong>
            {chamado.dsEndereco}
          </p>

          <p className="flex flex-wrap items-start gap-2">
            <CalendarDays size={18} className="mt-1 shrink-0 text-teal-700" />
            <strong className="text-slate-900">Abertura:</strong>
            {formatarData(chamado.dtAbertura)}
          </p>

          {chamado.dtConclusao && (
            <p className="flex flex-wrap items-start gap-2">
              <CalendarDays size={18} className="mt-1 shrink-0 text-teal-700" />
              <strong className="text-slate-900">Conclusão:</strong>
              {formatarData(chamado.dtConclusao)}
            </p>
          )}
        </div>
      </section>

      <section className={card}>
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Histórico de resolução
        </h2>

        {historico.length === 0 ? (
          <p className="text-slate-600">
            Ainda não há resolução registrada.
          </p>
        ) : (
          <div className="space-y-4">
            {historico.map((item) => (
              <article
                key={item.cdHistorico}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <p className="mb-3">
                  <strong className="text-slate-900">Status:</strong>{" "}
                  {nomeStatus(item.stNovo)}
                </p>

                <p className="break-words text-slate-600">
                  {item.dsObservacao}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default DetalhesChamado;
