
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
      setErro(
        "Não foi possível excluir. A categoria pode estar em uso."
      );
    }
  }

  if (!usuario || usuario.tpUsuario !== "ADMIN") {
    return (
      <main className="chamados-container">
        <h1>Acesso restrito</h1>
        <p>Somente administradores podem acessar esta página.</p>
      </main>
    );
  }

  return (
  <main className="chamados-container ca-editor-page">
    <h1>Gerenciar categorias</h1>

      <p>Cadastre, consulte, altere e exclua categorias.</p>

      <form onSubmit={salvar} className="ca-formulario">
        <h2>
          {id === null ? "Nova categoria" : "Editar categoria"}
        </h2>

        <label htmlFor="nome-categoria">Nome</label>

        <input
          id="nome-categoria"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label htmlFor="descricao-categoria">
          Descrição
        </label>

        <textarea
          id="descricao-categoria"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={3}
        />

        <div className="ca-acoes">
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>

          <button type="button" onClick={limpar}>
            Limpar
          </button>
        </div>
      </form>

      {erro && <p className="erro">{erro}</p>}

      {sucesso && (
        <p className="mensagem-sucesso">{sucesso}</p>
      )}

      <h2>Categorias cadastradas</h2>

      {categorias.length === 0 && (
        <p>Nenhuma categoria cadastrada.</p>
      )}

      <div className="chamados-grid">
        {categorias.map((categoria) => (
          <article
            className="chamado-card"
            key={categoria.cdCategoria}
          >
            <h3>{categoria.nmCategoria}</h3>

            <p>
              {categoria.dsCategoria || "Sem descrição"}
            </p>

            <div className="ca-acoes">
              <button
                type="button"
                onClick={() => editar(categoria)}
              >
                Editar
              </button>

              <button
                type="button"
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
