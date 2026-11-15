
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  CalendarDays
} from "lucide-react";

import { api } from "../services/api";

import type {
  Chamado,
  Categoria,
  Regiao
} from "../types/Chamado";

import type { Historico } from "../types/Historico";

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
        const [
          dadosChamado,
          categorias,
          regioes,
          dadosHistorico
        ] = await Promise.all([
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

        setCategoria(
          categoriaAtual?.nmCategoria ?? "Não informada"
        );

        setRegiao(
          regiaoAtual
            ? `${regiaoAtual.nmBairro} - ${regiaoAtual.nmCidade}`
            : "Não informada"
        );

        setHistorico(dadosHistorico);
      } catch {
        setErro(
          "Não foi possível carregar os detalhes do chamado."
        );
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
    if (status === "ABERTO") {
      return "Aberto";
    }

    if (status === "EM_ANDAMENTO") {
      return "Em andamento";
    }

    if (status === "RESOLVIDO") {
      return "Resolvido";
    }

    return status;
  }

  function formatarData(data: string | null) {
    if (!data) {
      return "Não informada";
    }

    const dataConvertida = new Date(data);

    if (Number.isNaN(dataConvertida.getTime())) {
      return data;
    }

    return dataConvertida.toLocaleDateString("pt-BR");
  }

  if (carregando) {
    return (
      <main className="detalhes-container">
        <p>Carregando chamado...</p>
      </main>
    );
  }

  if (erro || !chamado) {
    return (
      <main className="detalhes-container">
        <p className="erro">
          {erro || "Chamado não encontrado."}
        </p>

        <Link to="/chamados" className="link-voltar">
          <ArrowLeft size={18} />
          Voltar para chamados
        </Link>
      </main>
    );
  }

  return (
    <main className="detalhes-container">
      <Link to="/chamados" className="link-voltar">
        <ArrowLeft size={18} />
        Voltar para chamados
      </Link>

      <section className="detalhes-card">
        <div className="detalhes-topo">
          <div>
            <p className="protocolo">
              Protocolo: {chamado.nrProtocolo}
            </p>

            <h1>{categoria}</h1>
          </div>

          <span
            className={`status status-${chamado.stChamado.toLowerCase()}`}
          >
            {nomeStatus(chamado.stChamado)}
          </span>
        </div>

        <h2>Descrição do problema</h2>

        <p>{chamado.dsDescricao}</p>

        <div className="detalhes-informacoes">
          <p>
            <MapPin size={18} />
            <strong>Região:</strong> {regiao}
          </p>

          <p>
            <MapPin size={18} />
            <strong>Endereço:</strong> {chamado.dsEndereco}
          </p>

          <p>
            <CalendarDays size={18} />
            <strong>Abertura:</strong>{" "}
            {formatarData(chamado.dtAbertura)}
          </p>

          {chamado.dtConclusao && (
            <p>
              <CalendarDays size={18} />
              <strong>Conclusão:</strong>{" "}
              {formatarData(chamado.dtConclusao)}
            </p>
          )}
        </div>
      </section>

      <section className="detalhes-card">
        <h2>Histórico de resolução</h2>

        {historico.length === 0 ? (
          <p>Ainda não há resolução registrada.</p>
        ) : (
          historico.map((item) => (
            <article
              className="historico-item"
              key={item.cdHistorico}
            >
              <p>
                <strong>Status:</strong>{" "}
                {nomeStatus(item.stNovo)}
              </p>

              <p>{item.dsObservacao}</p>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default DetalhesChamado;
