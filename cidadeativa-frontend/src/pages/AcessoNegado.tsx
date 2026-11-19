
import { Link } from "react-router-dom";

function AcessoNegado() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="mb-5 text-3xl font-bold text-slate-900 md:text-4xl">
        Acesso negado
      </h1>

      <p className="mb-8 text-base leading-7 text-slate-600">
        Você não possui permissão para acessar esta página.
      </p>

      <Link
        to="/"
        className="inline-flex rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800"
      >
        Voltar para o início
      </Link>
    </main>
  );
}

export default AcessoNegado;
