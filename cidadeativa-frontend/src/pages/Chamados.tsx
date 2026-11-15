
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
import type {
  Chamado,
  Categoria,
  Regiao
} from "../types/Chamado.ts";
function Chamados() {
  const [chamados, setChamados] = useState<Chamado[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [regioes, setRegioes] = useState<Regiao[]>([]);

  const [categoria, setCategoria] = useState("");
  const [regiao, setRegiao] = useState("");
  const [status, setStatus] = useState("");

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
    const item = categorias.find(
      (c) => c.cdCategoria === id
    );

    return item?.nmCategoria || "Não informada";
  }

  function nomeRegiao(id: number) {
    const item = regioes.find(
      (r) => r.cdRegiao === id
    );

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

    if (Number.isNaN(dataFormatada.getTime())) {
      return data;
    }

    return dataFormatada.toLocaleDateString("pt-BR");
  }

  const chamadosFiltrados = chamados.filter((chamado) => {
    const filtroCategoria =
      !categoria ||
      chamado.cdCategoria === Number(categoria);

    const filtroRegiao =
      !regiao ||
      chamado.cdRegiao === Number(regiao);

    const filtroStatus =
      !status || chamado.stChamado === status;

    return filtroCategoria && filtroRegiao && filtroStatus;
  });

  return (
    <main className="chamados-container">
      <section className="chamados-topo">
        <div>
          <h1>Chamados da cidade</h1>
          <p>
            Acompanhe os problemas urbanos registrados
            e o andamento das ocorrências.
          </p>
        </div>

        <Link to="/novo-chamado" className="btn btn-primary">
          Registrar problema
        </Link>
      </section>

      <section className="filtros">
        <h2>
          <Search size={20} />
          Filtrar chamados
        </h2>

        <div className="filtros-grid">
          <div>
            <label htmlFor="categoria">Categoria</label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Todas as categorias</option>

              {categorias.map((item) => (
                <option
                  key={item.cdCategoria}
                  value={item.cdCategoria}
                >
                  {item.nmCategoria}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="regiao">Região</label>
            <select
              id="regiao"
              value={regiao}
              onChange={(e) => setRegiao(e.target.value)}
            >
              <option value="">Todas as regiões</option>

              {regioes.map((item) => (
                <option
                  key={item.cdRegiao}
                  value={item.cdRegiao}
                >
                  {item.nmBairro} - {item.nmCidade}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Todos os status</option>
              <option value="ABERTO">Aberto</option>
              <option value="EM_ANDAMENTO">
                Em andamento
              </option>
              <option value="RESOLVIDO">Resolvido</option>
            </select>
          </div>
        </div>
      </section>

      <section className="lista-chamados">
        <div className="lista-topo">
          <h2>Ocorrências registradas</h2>

          <button
            className="btn-atualizar"
            onClick={carregarDados}
            disabled={carregando}
          >
            <RefreshCw size={17} />
            Atualizar
          </button>
        </div>

        {carregando && (
          <p>Carregando chamados...</p>
        )}

        {erro && !carregando && (
          <div className="mensagem-erro">
            <p>{erro}</p>
            <button onClick={carregarDados}>
              Tentar novamente
            </button>
          </div>
        )}

        {!carregando && !erro && (
          <>
            <p className="total-chamados">
              {chamadosFiltrados.length} chamado(s) encontrado(s)
            </p>

            {chamadosFiltrados.length === 0 ? (
              <div className="lista-vazia">
                <ClipboardList size={40} />
                <h3>Nenhum chamado encontrado</h3>
                <p>
                  Não existem ocorrências para os
                  filtros selecionados.
                </p>
              </div>
            ) : (
              <div className="chamados-grid">
                {chamadosFiltrados.map((chamado) => (
                  <article
                    className="chamado-card"
                    key={chamado.cdChamado}
                  >
                    <div className="chamado-card-topo">
                      <span className="protocolo">
                        {chamado.nrProtocolo}
                      </span>

                      <span
                        className={`status status-${chamado.stChamado.toLowerCase()}`}
                      >
                        {nomeStatus(chamado.stChamado)}
                      </span>
                    </div>

                    <h3>
                      {nomeCategoria(chamado.cdCategoria)}
                    </h3>

                    <p className="chamado-descricao">
                      {chamado.dsDescricao}
                    </p>

                    <div className="chamado-informacoes">
                      <p>
                        <MapPin size={16} />
                        {nomeRegiao(chamado.cdRegiao)}
                      </p>

                      <p>
                        <MapPin size={16} />
                        {chamado.dsEndereco}
                      </p>

                      <p>
                        <CalendarDays size={16} />
                        {formatarData(chamado.dtAbertura)}
                      </p>
                    </div>

                    <Link
                      to={`/chamados/${chamado.cdChamado}`}
                      className="link-detalhes"
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
