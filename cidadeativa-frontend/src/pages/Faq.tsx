
import { Link } from "react-router-dom";

const perguntas = [
  {
    pergunta: "O que é o CidadeAtiva?",
    resposta:
      "É uma plataforma para registrar e acompanhar problemas de infraestrutura urbana."
  },
  {
    pergunta: "Como posso registrar uma ocorrência?",
    resposta:
      "Crie uma conta, faça login e acesse a opção Abrir chamado. Informe a categoria, a região, o endereço e a descrição do problema."
  },
  {
    pergunta: "Preciso enviar uma foto?",
    resposta: "Não. O envio de fotografia é opcional."
  },
  {
    pergunta: "Como acompanho meus chamados?",
    resposta:
      "Após entrar na sua conta, acesse Meus chamados para consultar as solicitações registradas."
  },
  {
    pergunta: "Quais são os status dos chamados?",
    resposta:
      "ABERTO significa que a ocorrência aguarda atendimento. EM_ANDAMENTO indica que foi assumida por um agente. RESOLVIDO significa que o atendimento foi concluído."
  },
  {
    pergunta: "Posso editar uma ocorrência?",
    resposta:
      "Sim, enquanto o chamado estiver com o status ABERTO."
  },
  {
    pergunta: "Quem pode resolver um chamado?",
    resposta:
      "O agente público responsável pelo atendimento pode registrar a resolução e descrever o serviço realizado."
  },
  {
    pergunta: "É possível consultar ocorrências sem login?",
    resposta:
      "A plataforma disponibiliza uma área pública de consulta de chamados."
  }
];

function FAQ() {
  return (
    <main className="min-h-[70vh] bg-slate-50">
      <section className="bg-gradient-to-br from-teal-700 to-teal-900 px-5 py-16 text-center text-white">
        <span className="mb-5 inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
          Central de ajuda
        </span>

        <h1 className="mb-5 text-3xl font-bold text-white md:text-5xl">
          Perguntas frequentes
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-teal-50">
          Tire suas dúvidas sobre o funcionamento do CidadeAtiva.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="space-y-4">
          {perguntas.map((item) => (
            <details
              key={item.pergunta}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <summary className="cursor-pointer px-5 py-5 font-semibold text-slate-900 transition hover:text-teal-700 group-open:border-b group-open:border-slate-200 group-open:text-teal-700">
                {item.pergunta}
              </summary>

              <p className="px-5 py-5 leading-7 text-slate-600">
                {item.resposta}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-teal-50 px-5 py-10 text-center sm:px-8">
          <h2 className="mb-4 text-2xl font-bold text-teal-900">
            Ainda tem dúvidas?
          </h2>

          <p className="mb-6 text-slate-600">
            Entre em contato com a equipe do projeto.
          </p>

          <Link
            to="/contato"
            className="inline-flex rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800"
          >
            Ir para contato
          </Link>
        </div>
      </section>
    </main>
  );
}

export default FAQ;
