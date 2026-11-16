
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { api } from "../services/api";
import { obterCidadao } from "../services/sessao";
import FormularioChamado from "../components/FormularioChamado";

import type {
  ChamadoCidadao,
  DadosChamado
} from "../types/ChamadoCidadao";

function EditarChamado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const usuario = obterCidadao();

  const [chamado, setChamado] = useState<ChamadoCidadao | null>(
    null
  );
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        const dados: ChamadoCidadao = await api(
          `/api/chamados/${id}`
        );

        if (ativo) {
          setChamado(dados);
        }
      } catch {
        if (ativo) {
          setErro("Não foi possível carregar o chamado.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    if (id && usuario) {
      carregar();
    } else {
      setCarregando(false);
    }

    return () => {
      ativo = false;
    };
  }, [id, usuario?.cdUsuario]);

  if (!usuario) {
    return (
      <main className="auth-container">
        <div className="auth-card">
          <h1>Acesso necessário</h1>
          <p>Entre na sua conta para editar um chamado.</p>
          <Link to="/login" className="btn btn-primary">
            Fazer login
          </Link>
        </div>
      </main>
    );
  }

  if (carregando) {
    return (
      <main className="auth-container">
        <p>Carregando chamado...</p>
      </main>
    );
  }

  if (erro || !chamado) {
    return (
      <main className="auth-container">
        <div className="auth-card">
          <p className="erro">
            {erro || "Chamado não encontrado."}
          </p>

          <Link to="/meus-chamados">
            Voltar para meus chamados
          </Link>
        </div>
      </main>
    );
  }

  if (
    chamado.cdUsuario !== usuario.cdUsuario ||
    chamado.stChamado !== "ABERTO"
  ) {
    return (
      <main className="auth-container">
        <div className="auth-card">
          <h1>Edição indisponível</h1>

          <p>
            Somente os chamados criados por você
            e que estejam abertos podem ser editados.
          </p>

          <Link to="/meus-chamados">
            Voltar para meus chamados
          </Link>
        </div>
      </main>
    );
  }

  async function salvar(dados: DadosChamado) {
    await api(`/api/chamados/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados)
    });

    navigate("/meus-chamados");
  }

  return (
    <main>
      <FormularioChamado
        key={chamado.cdChamado}
        titulo="Editar chamado"
        textoBotao="Salvar alterações"
        inicial={{
          cdCategoria: chamado.cdCategoria,
          cdRegiao: chamado.cdRegiao,
          dsEndereco: chamado.dsEndereco,
          dsDescricao: chamado.dsDescricao,
          dsFoto: chamado.dsFoto
        }}
        onSalvar={salvar}
      />
    </main>
  );
}

export default EditarChamado;
