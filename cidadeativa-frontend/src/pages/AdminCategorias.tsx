
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { obterUsuario } from "../services/usuarioLogado";

interface Categoria {
  cdCategoria: number;
  nmCategoria: string;
  dsCategoria: string | null;
}

function AdminCategorias() {
  const usuario = obterUsuario();

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [id, setId] = useState<number | null>(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function carregar() {
    try {
      const dados = await api("/api/categorias");
      setCategorias(dados);
      setErro("");
    } catch {
      setErro("Erro ao carregar categorias.");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  function editar(categoria: Categoria) {
    setId(categoria.cdCategoria);
    setNome(categoria.nmCategoria);
    setDescricao(categoria.dsCategoria || "");
    setSucesso("");
  }

  function limpar() {
    setId(null);
    setNome("");
    setDescricao("");
  }

  async function salvar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (!nome.trim()) {
      setErro("Informe o nome da categoria.");
      return;
    }

    setErro("");
    setSucesso("");

    try {
      const url =
        id === null
          ? "/api/categorias"
          : `/api/categorias/${id}`;

      await api(url, {
        method: id === null ? "POST" : "PUT",
        body: JSON.stringify({
          nmCategoria: nome.trim(),
          dsCategoria: descricao.trim()
        })
      });

      limpar();
      await carregar();
      setSucesso("Categoria salva com sucesso.");
    } catch {
      setErro("Não foi possível salvar a categoria.");
    }
  }

  async function excluir(codigo: number) {
    const confirmou = window.confirm(
      "Deseja realmente excluir esta categoria?"
    );

    if (!confirmou) return;

    setErro("");
    setSucesso("");

    try {
      await api(`/api/categorias/${codigo}`, {
        method: "DELETE"
      });

      await carregar();
      setSucesso("Categoria excluída com sucesso.");
    } catch {
      setErro("Não foi possível excluir. A categoria pode estar em uso.");
    }
  }

  if (!usuario || usuario.tpUsuario !== "ADMIN") {
    return (
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          Acesso restrito
        </h1>
        <p className="text-slate-600">
          Somente administradores podem acessar esta página.
        </p>
      </main>
    );
  }

  const campoClasse =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100";

  const botaoPrincipal =
    "rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800";

  const botaoSecundario =
    "rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100";

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <h1 className="mb-3 text-3xl font-bold text-slate-900 md:text-4xl">
        Gerenciar categorias
      </h1>

      <p className="mb-8 text-slate-600">
        Cadastre, consulte, altere e exclua categorias.
      </p>

      <form
        onSubmit={salvar}
        className="mb-10 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
      >
        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          {id === null ? "Nova categoria" : "Editar categoria"}
        </h2>

        <label
          htmlFor="nome-categoria"
          className="font-semibold text-slate-700"
        >
          Nome
        </label>

        <input
          id="nome-categoria"
          type="text"
          className={campoClasse}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label
          htmlFor="descricao-categoria"
          className="font-semibold text-slate-700"
        >
          Descrição
        </label>

        <textarea
          id="descricao-categoria"
          className={campoClasse}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={3}
        />

        <div className="mt-3 flex flex-wrap gap-3">
          <button type="submit" className={botaoPrincipal}>
            Salvar
          </button>

          <button
            type="button"
            onClick={limpar}
            className={botaoSecundario}
          >
            Limpar
          </button>
        </div>
      </form>

      {erro && (
        <p
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
        >
          {erro}
        </p>
      )}

      {sucesso && (
        <p
          role="status"
          className="mb-5 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700"
        >
          {sucesso}
        </p>
      )}

      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Categorias cadastradas
      </h2>

      {categorias.length === 0 && (
        <p className="mb-5 text-slate-600">
          Nenhuma categoria cadastrada.
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {categorias.map((categoria) => (
          <article
            key={categoria.cdCategoria}
            className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="mb-3 text-xl font-bold text-teal-700">
              {categoria.nmCategoria}
            </h3>

            <p className="mb-6 flex-1 text-slate-600">
              {categoria.dsCategoria || "Sem descrição"}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className={botaoPrincipal}
                onClick={() => editar(categoria)}
              >
                Editar
              </button>

              <button
                type="button"
                className={botaoSecundario}
                onClick={() => excluir(categoria.cdCategoria)}
              >
                Excluir
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default AdminCategorias;
