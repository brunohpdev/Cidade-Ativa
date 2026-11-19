
import { Link } from "react-router-dom";
import { obterUsuario } from "../services/usuarioLogado";

function Administracao() {
  const usuario = obterUsuario();

  if (!usuario || usuario.tpUsuario !== "ADMIN") {
    return (
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          Acesso restrito
        </h1>

        <p className="mb-6 text-slate-600">
          Somente administradores podem acessar esta página.
        </p>

        <Link
          to="/"
          className="inline-flex rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
        >
          Voltar para o início
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
        Painel administrativo
      </h1>

      <p className="mb-3 text-slate-600">
        Bem-vindo, {usuario.nmUsuario}!
      </p>

      <p className="mb-8 text-slate-600">
        Escolha uma das opções abaixo para gerenciar os cadastros
        do CidadeAtiva.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-teal-700">
            Categorias
          </h2>

          <p className="mb-7 flex-1 leading-7 text-slate-600">
            Cadastre, consulte, altere e exclua as categorias dos
            chamados urbanos.
          </p>

          <Link
            to="/admin/categorias"
            className="inline-flex self-start rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
          >
            Gerenciar categorias
          </Link>
        </article>

        <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-teal-700">
            Regiões
          </h2>

          <p className="mb-7 flex-1 leading-7 text-slate-600">
            Cadastre, consulte, altere e exclua bairros e regiões
            do município.
          </p>

          <Link
            to="/admin/regioes"
            className="inline-flex self-start rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800"
          >
            Gerenciar regiões
          </Link>
        </article>
      </div>
    </main>
  );
}

export default Administracao;
