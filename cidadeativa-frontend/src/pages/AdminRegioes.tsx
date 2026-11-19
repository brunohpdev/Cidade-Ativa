
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { obterUsuario } from "../services/usuarioLogado";

interface Regiao {
  cdRegiao: number;
  nmBairro: string;
  nmCidade: string;
  sgEstado: string;
}

function AdminRegioes() {
  const usuario = obterUsuario();

  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [id, setId] = useState<number | null>(null);
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("SP");
  const [erro, setErro] = useState("");

  async function carregar() {
    try {
      const dados = await api("/api/regioes");
      setRegioes(dados);
    } catch {
      setErro("Erro ao carregar regiões.");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  function editar(item: Regiao) {
    setId(item.cdRegiao);
    setBairro(item.nmBairro);
    setCidade(item.nmCidade);
    setEstado(item.sgEstado);
  }

  function limpar() {
    setId(null);
    setBairro("");
    setCidade("");
    setEstado("SP");
  }

  async function salvar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");

    if (
      !bairro.trim() ||
      !cidade.trim() ||
      estado.trim().length !== 2
    ) {
      setErro("Preencha os dados corretamente.");
      return;
    }

    try {
      await api(
        id === null ? "/api/regioes" : `/api/regioes/${id}`,
        {
          method: id === null ? "POST" : "PUT",
          body: JSON.stringify({
            nmBairro: bairro.trim(),
            nmCidade: cidade.trim(),
            sgEstado: estado.trim().toUpperCase()
          })
        }
      );

      limpar();
      await carregar();
    } catch {
      setErro("Não foi possível salvar a região.");
    }
  }

  async function excluir(codigo: number) {
    if (!window.confirm("Deseja excluir esta região?")) return;

    try {
      await api(`/api/regioes/${codigo}`, {
        method: "DELETE"
      });
      await carregar();
    } catch {
      setErro("Não foi possível excluir a região.");
    }
  }

  if (!usuario || usuario.tpUsuario !== "ADMIN") {
    return (
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900">
          Acesso restrito
        </h1>
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
      <h1 className="mb-8 text-3xl font-bold text-slate-900 md:text-4xl">
        Gerenciar regiões
      </h1>

      <form
        className="mb-10 flex max-w-3xl flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
        onSubmit={salvar}
      >
        <h2 className="mb-3 text-2xl font-bold text-slate-900">
          {id === null ? "Nova região" : "Editar região"}
        </h2>

        <label htmlFor="bairro" className="font-semibold text-slate-700">
          Bairro
        </label>
        <input
          id="bairro"
          className={campoClasse}
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
          required
        />

        <label htmlFor="cidade" className="font-semibold text-slate-700">
          Cidade
        </label>
        <input
          id="cidade"
          className={campoClasse}
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          required
        />

        <label htmlFor="estado" className="font-semibold text-slate-700">
          Estado (UF)
        </label>
        <input
          id="estado"
          className={campoClasse}
          maxLength={2}
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          required
        />

        {erro && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
          >
            {erro}
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-3">
          <button className={botaoPrincipal} type="submit">
            Salvar
          </button>

          <button
            className={botaoSecundario}
            type="button"
            onClick={limpar}
          >
            Limpar
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {regioes.map((item) => (
          <article
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            key={item.cdRegiao}
          >
            <h3 className="mb-3 text-xl font-bold text-teal-700">
              {item.nmBairro}
            </h3>

            <p className="mb-6 flex-1 text-slate-600">
              {item.nmCidade} - {item.sgEstado}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                className={botaoPrincipal}
                type="button"
                onClick={() => editar(item)}
              >
                Editar
              </button>

              <button
                className={botaoSecundario}
                type="button"
                onClick={() => excluir(item.cdRegiao)}
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

export default AdminRegioes;
