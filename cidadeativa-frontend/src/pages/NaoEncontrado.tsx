
import { Link } from "react-router-dom";

function NaoEncontrado() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="mb-3 text-6xl font-extrabold text-teal-700">
        Erro 404
      </h1>

      <h2 className="mb-5 text-2xl font-bold text-slate-900 md:text-3xl">
        Página não encontrada
      </h2>

      <p className="mb-8 leading-7 text-slate-600">
        A página que você está procurando não existe.
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

export default NaoEncontrado;

