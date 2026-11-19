
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

  const [chamado, setChamado] = useState<ChamadoCidadao | null>(null);
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

  const container =
    "flex min-h-[65vh] items-center justify-center px-4 py-12";

  const card =
    "w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9";

  const botao =
    "mt-5 inline-flex rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800";

  if (!usuario) {
    return (
      <main className={container}>
        <div className={card}>
          <h1 className="mb-4 text-2xl font-bold text-slate-900">
            Acesso necessário
          </h1>

          <p className="text-slate-600">
            Entre na sua conta para editar um chamado.
          </p>

          <Link to="/login" className={botao}>
            Fazer login
          </Link>
        </div>
      </main>
    );
  }

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
        <div className={card}>
          <p role="alert" className="mb-5 text-red-700">
            {erro || "Chamado não encontrado."}
          </p>

          <Link to="/meus-chamados" className={botao}>
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
      <main className={container}>
        <div className={card}>
          <h1 className="mb-4 text-2xl font-bold text-slate-900">
            Edição indisponível
          </h1>

          <p className="leading-7 text-slate-600">
            Somente os chamados criados por você e que estejam
            abertos podem ser editados.
          </p>

          <Link to="/meus-chamados" className={botao}>
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
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
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
