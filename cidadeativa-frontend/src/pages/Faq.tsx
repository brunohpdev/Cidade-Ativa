
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
    resposta:
      "Não. O envio de fotografia é opcional."
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
    <main className="institucional">
      <section className="institucional-topo">
        <span className="institucional-tag">Central de ajuda</span>
        <h1>Perguntas frequentes</h1>
        <p>
          Tire suas dúvidas sobre o funcionamento do CidadeAtiva.
        </p>
      </section>

      <section className="institucional-conteudo">
        <div className="faq-lista">
          {perguntas.map((item) => (
            <details className="faq-item" key={item.pergunta}>
              <summary>{item.pergunta}</summary>
              <p>{item.resposta}</p>
            </details>
          ))}
        </div>

        <div className="institucional-destaque">
          <h2>Ainda tem dúvidas?</h2>
          <p>Entre em contato com a equipe do projeto.</p>
          <Link to="/contato" className="institucional-botao">
            Ir para contato
          </Link>
        </div>
      </section>
    </main>
  );
}

export default FAQ;
