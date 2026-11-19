
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FormularioChamado from "../components/FormularioChamado";
import { obterCidadao } from "../services/sessao";
import { api } from "../services/api";

import type {
  DadosChamado,
  ChamadoCidadao
} from "../types/ChamadoCidadao";

function NovoChamado() {
  const navigate = useNavigate();
  const usuario = obterCidadao();
  const [protocolo, setProtocolo] = useState("");

  const container =
    "flex min-h-[70vh] items-center justify-center px-4 py-12 sm:px-6";

  const card =
    "w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9";

  const botao =
    "inline-flex items-center justify-center rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800";

  if (!usuario) {
    return (
      <main className={container}>
        <div className={card}>
          <h1 className="mb-4 text-2xl font-bold text-slate-900">
            Faça login para continuar
          </h1>

          <p className="mb-7 leading-7 text-slate-600">
            Você precisa estar cadastrado para abrir um chamado.
          </p>

          <Link to="/login" className={botao}>
            Entrar
          </Link>
        </div>
      </main>
    );
  }

  async function salvar(dados: DadosChamado) {
    const novo: ChamadoCidadao = await api("/api/chamados", {
      method: "POST",
      body: JSON.stringify({
        ...dados,
        cdUsuario: usuario!.cdUsuario
      })
    });

    setProtocolo(novo.nrProtocolo);
  }

  if (protocolo) {
    return (
      <main className={container}>
        <div className={card}>
          <h1 className="mb-5 text-3xl font-bold text-teal-800">
            Chamado registrado!
          </h1>

          <p className="mb-3 text-slate-600">
            Guarde seu número de protocolo:
          </p>

          <h2 className="mb-6 break-all rounded-lg bg-teal-50 p-4 text-xl font-bold text-teal-800">
            {protocolo}
          </h2>

          <p className="mb-7 leading-7 text-slate-600">
            Você poderá acompanhar a ocorrência
            na página Meus Chamados.
          </p>

          <button
            type="button"
            className={botao}
            onClick={() => navigate("/meus-chamados")}
          >
            Ver meus chamados
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <FormularioChamado
        titulo="Registrar problema urbano"
        textoBotao="Abrir chamado"
        onSalvar={salvar}
      />
    </main>
  );
}

export default NovoChamado;
