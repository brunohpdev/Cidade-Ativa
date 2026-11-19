
import { Link } from "react-router-dom";
import { Building2, ClipboardList, Users, CheckCircle } from "lucide-react";

function Sobre() {
  return (
    <main className="institucional">
      <section className="institucional-topo">
        <span className="institucional-tag">Sobre o projeto</span>
        <h1>Conheça o CidadeAtiva</h1>
        <p>
          Uma plataforma que aproxima cidadãos e agentes públicos
          para melhorar os espaços urbanos.
        </p>
      </section>

      <section className="institucional-conteudo">
        <h2>Nossa proposta</h2>
        <p>
          O CidadeAtiva foi desenvolvido para facilitar o registro
          e o acompanhamento de problemas urbanos, como buracos,
          iluminação pública, lixo acumulado, enchentes e calçadas
          danificadas.
        </p>
        <p>
          Pelo sistema, os cidadãos podem registrar ocorrências e
          acompanhar o andamento das solicitações. Os agentes públicos
          podem assumir chamados e registrar a conclusão dos atendimentos.
        </p>

        <div className="institucional-grid">
          <article className="institucional-card">
            <Building2 size={32} />
            <h3>Objetivo</h3>
            <p>
              Contribuir para cidades mais organizadas e acessíveis,
              facilitando a comunicação com a população.
            </p>
          </article>

          <article className="institucional-card">
            <ClipboardList size={32} />
            <h3>Organização</h3>
            <p>
              Centralizar ocorrências por categoria, região e status,
              permitindo acompanhar cada atendimento.
            </p>
          </article>

          <article className="institucional-card">
            <Users size={32} />
            <h3>Participação</h3>
            <p>
              Incentivar os cidadãos a participarem da identificação
              e comunicação de problemas urbanos.
            </p>
          </article>

          <article className="institucional-card">
            <CheckCircle size={32} />
            <h3>ODS 11</h3>
            <p>
              O projeto está relacionado ao Objetivo de Desenvolvimento
              Sustentável 11: Cidades e Comunidades Sustentáveis.
            </p>
          </article>
        </div>

        <div className="institucional-destaque">
          <h2>Faça parte dessa iniciativa</h2>
          <p>
            Registre ocorrências e acompanhe as melhorias da sua cidade.
          </p>
          <Link to="/cadastro" className="institucional-botao">
            Criar uma conta
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Sobre;
