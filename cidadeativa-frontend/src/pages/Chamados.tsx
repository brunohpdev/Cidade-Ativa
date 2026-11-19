
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  ClipboardList,
  CalendarDays,
  Search,
  RefreshCw
} from "lucide-react";

import { api } from "../services/api";
import type { Chamado, Categoria, Regiao } from "../types/Chamado";

const campo =
  "mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-slate-800 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100";

const statusClasses: Record<string, string> = {
  ABERTO: "bg-amber-100 text-amber-800",
  EM_ANDAMENTO: "bg-blue-100 text-blue-800",
  RESOLVIDO: "bg-green-100 text-green-800"
};

function Chamados() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [regioes, setRegioes] = useState<Regiao[]>([]);

  const [categoria, setCategoria] = useState("");
  const [regiao, setRegiao] = useState("");
  const [status, setStatus] = useState("");
  const [protocolo, setProtocolo] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarDados() {
    setCarregando(true);
    setErro("");

    try {
      const [listaChamados, listaCategorias, listaRegioes] =
        await Promise.all([
          api("/api/chamados"),
          api("/api/categorias"),
          api("/api/regioes")
        ]);

      setChamados(listaChamados);
      setCategorias(listaCategorias);
      setRegioes(listaRegioes);
    } catch {
      setErro("Não foi possível carregar os chamados.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function nomeCategoria(id: number) {
    const item = categorias.find((c) => c.cdCategoria === id);
    return item?.nmCategoria || "Não informada";
  }

  function nomeRegiao(id: number) {
    const item = regioes.find((r) => r.cdRegiao === id);

    if (!item) return "Não informada";

    return `${item.nmBairro} - ${item.nmCidade}`;
  }

  function nomeStatus(valor: string) {
    if (valor === "ABERTO") return "Aberto";
    if (valor === "EM_ANDAMENTO") return "Em andamento";
    if (valor === "RESOLVIDO") return "Resolvido";
    return valor;
  }

  function formatarData(data: string | null) {
    if (!data) return "Não informada";

    const dataFormatada = new Date(data);

    if (Number.isNaN(dataFormatada.getTime())) return data;

    return dataFormatada.toLocaleDateString("pt-BR");
  }

  const chamadosFiltrados = chamados.filter((chamado) => {
    const filtroCategoria =
      !categoria || chamado.cdCategoria === Number(categoria);

    const filtroRegiao =
      !regiao || chamado.cdRegiao === Number(regiao);

    const filtroStatus =
      !status || chamado.stChamado === status;

    const filtroProtocolo =
      !protocolo.trim() ||
      chamado.nrProtocolo
        .toLowerCase()
        .includes(protocolo.trim().toLowerCase());

    return (
      filtroCategoria &&
      filtroRegiao &&
      filtroStatus &&
      filtroProtocolo
    );
  });

  function limparFiltros() {
    setCategoria("");
    setRegiao("");
    setStatus("");
    setProtocolo("");
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      <section className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <h1 className="mb-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Chamados da cidade
          </h1>

          <p className="max-w-2xl text-slate-600">
            Acompanhe os problemas urbanos registrados e o andamento
            das ocorrências.
          </p>
        </div>

        <Link
          to="/novo-chamado"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
        >
          Registrar problema
        </Link>
      </section>

      <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900">
          <Search size={20} className="text-teal-700" />
          Filtrar chamados
        </h2>

        <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          <div>
            <label htmlFor="categoria" className="font-semibold text-slate-700">
              Categoria
            </label>
            <select
              id="categoria"
              className={campo}
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Todas as categorias</option>
              {categorias.map((item) => (
                <option key={item.cdCategoria} value={item.cdCategoria}>
                  {item.nmCategoria}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="regiao" className="font-semibold text-slate-700">
              Região
            </label>
            <select
              id="regiao"
              className={campo}
              value={regiao}
              onChange={(e) => setRegiao(e.target.value)}
            >
              <option value="">Todas as regiões</option>
              {regioes.map((item) => (
                <option key={item.cdRegiao} value={item.cdRegiao}>
                  {item.nmBairro} - {item.nmCidade}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="status" className="font-semibold text-slate-700">
              Status
            </label>
            <select
              id="status"
              className={campo}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Todos os status</option>
              <option value="ABERTO">Aberto</option>
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="RESOLVIDO">Resolvido</option>
            </select>
          </div>
        </div>

        <div className="mb-6 max-w-md">
          <label htmlFor="protocolo" className="font-semibold text-slate-700">
            Pesquisar por protocolo
          </label>

          <div className="mt-2 flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-3 focus-within:ring-2 focus-within:ring-teal-100">
            <Search size={19} className="shrink-0 text-slate-400" />
            <input
              id="protocolo"
              type="text"
              className="min-w-0 w-full bg-transparent py-3 text-slate-900 outline-none"
              placeholder="Digite o protocolo do chamado"
              value={protocolo}
              onChange={(e) => setProtocolo(e.target.value)}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={limparFiltros}
          className="rounded-lg border border-slate-300 bg-slate-50 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Limpar filtros
        </button>
      </section>

      <section>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900">
            Ocorrências registradas
          </h2>

          <button
            type="button"
            onClick={carregarDados}
            disabled={carregando}
            className="inline-flex items-center gap-2 rounded-lg border border-teal-700 px-4 py-3 font-semibold text-teal-700 hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw size={17} />
            Atualizar
          </button>
        </div>

        {carregando && (
          <p className="py-6 text-slate-600" role="status">
            Carregando chamados...
          </p>
        )}

        {erro && !carregando && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-800" role="alert">
            <p className="mb-4">{erro}</p>
            <button
              type="button"
              onClick={carregarDados}
              className="rounded-lg border border-red-600 bg-white px-4 py-2 font-semibold text-red-700"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {!carregando && !erro && (
          <>
            <p className="mb-5 text-sm text-slate-500">
              {chamadosFiltrados.length} chamado(s) encontrado(s)
            </p>

            {chamadosFiltrados.length === 0 ? (
              <div className="rounded-xl bg-slate-100 p-9 text-center">
                <ClipboardList
                  size={40}
                  className="mx-auto mb-4 text-teal-700"
                />
                <h3 className="mb-2 text-xl font-bold text-slate-900">
                  Nenhum chamado encontrado
                </h3>
                <p className="text-slate-600">
                  Não existem ocorrências para os filtros selecionados.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {chamadosFiltrados.map((chamado) => (
                  <article
                    key={chamado.cdChamado}
                    className="flex min-w-0 flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <span className="break-all text-xs font-semibold text-slate-500">
                        {chamado.nrProtocolo}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          statusClasses[chamado.stChamado] ??
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {nomeStatus(chamado.stChamado)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-teal-700">
                      {nomeCategoria(chamado.cdCategoria)}
                    </h3>

                    <p className="break-words leading-7 text-slate-600">
                      {chamado.dsDescricao}
                    </p>

                    <div className="space-y-3 text-sm text-slate-600">
                      <p className="flex items-start gap-2">
                        <MapPin size={17} className="mt-0.5 shrink-0 text-teal-700" />
                        {nomeRegiao(chamado.cdRegiao)}
                      </p>

                      <p className="flex items-start gap-2">
                        <MapPin size={17} className="mt-0.5 shrink-0 text-teal-700" />
                        {chamado.dsEndereco}
                      </p>

                      <p className="flex items-start gap-2">
                        <CalendarDays size={17} className="mt-0.5 shrink-0 text-teal-700" />
                        {formatarData(chamado.dtAbertura)}
                      </p>
                    </div>

                    <Link
                      to={`/chamados/${chamado.cdChamado}`}
                      className="mt-auto inline-block self-start pt-3 font-bold text-teal-700 hover:underline"
                    >
                      Ver detalhes
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Chamados;
