
import { Link } from "react-router-dom";
import {
  Building2,
  ClipboardList,
  Users,
  CheckCircle
} from "lucide-react";

function Sobre() {
  return (
    <main className="min-h-[70vh] bg-slate-50">
      <section className="bg-gradient-to-br from-teal-700 to-teal-900 px-5 py-16 text-center text-white">
        <span className="mb-5 inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
          Sobre o projeto
        </span>

        <h1 className="mb-5 text-3xl font-bold text-white md:text-5xl">
          Conheça o CidadeAtiva
        </h1>

        <p className="mx-auto max-w-2xl text-base leading-8 text-teal-50 md:text-lg">
          Uma plataforma que aproxima cidadãos e agentes públicos
          para melhorar os espaços urbanos.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <h2 className="mb-5 text-3xl font-bold text-slate-900">
          Nossa proposta
        </h2>

        <p className="mb-5 leading-8 text-slate-600">
          O CidadeAtiva foi desenvolvido para facilitar o registro
          e o acompanhamento de problemas urbanos, como buracos,
          iluminação pública, lixo acumulado, enchentes e calçadas
          danificadas.
        </p>

        <p className="mb-9 leading-8 text-slate-600">
          Pelo sistema, os cidadãos podem registrar ocorrências e
          acompanhar o andamento das solicitações. Os agentes públicos
          podem assumir chamados e registrar a conclusão dos atendimentos.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <Building2 size={32} className="mb-5 text-teal-700" />
            <h3 className="mb-3 text-xl font-bold text-slate-900">
              Objetivo
            </h3>
            <p className="leading-7 text-slate-600">
              Contribuir para cidades mais organizadas e acessíveis,
              facilitando a comunicação com a população.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <ClipboardList size={32} className="mb-5 text-teal-700" />
            <h3 className="mb-3 text-xl font-bold text-slate-900">
              Organização
            </h3>
            <p className="leading-7 text-slate-600">
              Centralizar ocorrências por categoria, região e status,
              permitindo acompanhar cada atendimento.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <Users size={32} className="mb-5 text-teal-700" />
            <h3 className="mb-3 text-xl font-bold text-slate-900">
              Participação
            </h3>
            <p className="leading-7 text-slate-600">
              Incentivar os cidadãos a participarem da identificação
              e comunicação de problemas urbanos.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <CheckCircle size={32} className="mb-5 text-teal-700" />
            <h3 className="mb-3 text-xl font-bold text-slate-900">
              ODS 11
            </h3>
            <p className="leading-7 text-slate-600">
              O projeto está relacionado ao Objetivo de Desenvolvimento
              Sustentável 11: Cidades e Comunidades Sustentáveis.
            </p>
          </article>
        </div>

        <div className="mt-12 rounded-2xl bg-teal-50 px-5 py-10 text-center sm:px-8">
          <h2 className="mb-4 text-2xl font-bold text-teal-900 md:text-3xl">
            Faça parte dessa iniciativa
          </h2>

          <p className="mb-7 text-slate-600">
            Registre ocorrências e acompanhe as melhorias da sua cidade.
          </p>

          <Link
            to="/cadastro"
            className="inline-flex rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800"
          >
            Criar uma conta
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Sobre;
