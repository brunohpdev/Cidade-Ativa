
import { Link } from "react-router-dom";
import {
  MapPin,
  ClipboardList,
  CheckCircle,
  ArrowRight
} from "lucide-react";

function Home() {
  return (
    <main className="w-full">
      <section className="bg-gradient-to-br from-teal-50 to-white px-5 py-20 text-center md:py-28">
        <div className="mx-auto max-w-4xl">
          <span className="mb-7 inline-block rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-800">
            Tecnologia para cidades melhores
          </span>

          <h1 className="mb-7 text-4xl font-extrabold leading-tight text-teal-950 sm:text-5xl lg:text-6xl">
            Sua cidade melhor começa
            <span className="text-teal-700"> com você.</span>
          </h1>

          <p className="mx-auto mb-9 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            O CidadeAtiva conecta cidadãos e agentes públicos
            para identificar, acompanhar e resolver problemas
            urbanos de maneira simples e transparente.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/cadastro"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-6 py-4 font-semibold text-white transition hover:bg-teal-800 sm:w-auto"
            >
              Registrar problema
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/chamados"
              className="inline-flex w-full items-center justify-center rounded-lg border-2 border-teal-700 bg-white px-6 py-4 font-semibold text-teal-700 transition hover:bg-teal-50 sm:w-auto"
            >
              Ver chamados
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 text-center md:py-20">
        <h2 className="mb-4 text-3xl font-bold text-teal-950 md:text-4xl">
          Como funciona?
        </h2>

        <p className="mb-12 text-lg text-slate-600">
          Participe da melhoria da sua cidade em três passos.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <MapPin size={36} className="mb-6 text-teal-700" />

            <h3 className="mb-4 text-xl font-bold text-teal-950">
              1. Registre
            </h3>

            <p className="leading-7 text-slate-600">
              Informe o problema, a categoria, a região
              e o endereço da ocorrência.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <ClipboardList size={36} className="mb-6 text-teal-700" />

            <h3 className="mb-4 text-xl font-bold text-teal-950">
              2. Acompanhe
            </h3>

            <p className="leading-7 text-slate-600">
              Consulte o protocolo e acompanhe
              o andamento do chamado.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-8 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <CheckCircle size={36} className="mb-6 text-teal-700" />

            <h3 className="mb-4 text-xl font-bold text-teal-950">
              3. Veja a resolução
            </h3>

            <p className="leading-7 text-slate-600">
              Agentes públicos assumem os chamados
              e registram as soluções realizadas.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-gradient-to-br from-teal-700 to-emerald-900 px-5 py-16 text-center text-white md:py-20">
        <h2 className="mb-5 text-3xl font-bold text-white md:text-4xl">
          Ajude a transformar sua cidade
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-emerald-50">
          Faça parte de uma comunidade que contribui
          para melhorar os espaços públicos.
        </p>

        <Link
          to="/cadastro"
          className="inline-flex rounded-lg bg-white px-7 py-4 font-bold text-teal-800 transition hover:bg-teal-50"
        >
          Começar agora
        </Link>
      </section>
    </main>
  );
}

export default Home;
