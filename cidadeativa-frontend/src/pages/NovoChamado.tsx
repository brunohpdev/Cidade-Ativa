
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

  if (!usuario) {
    return (
      <main className="auth-container">
        <div className="auth-card">
          <h1>Faça login para continuar</h1>
          <p>
            Você precisa estar cadastrado para abrir um chamado.
          </p>
          <Link to="/login" className="btn btn-primary">
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
      <main className="auth-container">
        <div className="auth-card">
          <h1>Chamado registrado!</h1>
          <p>Guarde seu número de protocolo:</p>
          <h2>{protocolo}</h2>
          <p>
            Você poderá acompanhar a ocorrência
            na página Meus Chamados.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/meus-chamados")}
          >
            Ver meus chamados
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <FormularioChamado
        titulo="Registrar problema urbano"
        textoBotao="Abrir chamado"
        onSalvar={salvar}
      />
    </main>
  );
}

export default NovoChamado;
