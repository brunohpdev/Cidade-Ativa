
import { Link } from "react-router-dom";
import {
  MapPin,
  ClipboardList,
  CheckCircle,
  ArrowRight
} from "lucide-react";

function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="tag">
            Tecnologia para cidades melhores
          </span>

          <h1>
            Sua cidade melhor começa
            <span> com você.</span>
          </h1>

          <p>
            O CidadeAtiva conecta cidadãos e agentes
            públicos para identificar, acompanhar e
            resolver problemas urbanos de maneira
            simples e transparente.
          </p>

          <div className="hero-buttons">
            <Link to="/cadastro" className="btn btn-primary">
              Registrar problema <ArrowRight size={18} />
            </Link>

            <Link to="/chamados" className="btn btn-outline">
              Ver chamados
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Como funciona?</h2>

        <p className="section-description">
          Participe da melhoria da sua cidade
          em três passos.
        </p>

        <div className="cards">
          <article className="card">
            <MapPin size={36} />
            <h3>1. Registre</h3>
            <p>
              Informe o problema, a categoria,
              a região e o endereço da ocorrência.
            </p>
          </article>

          <article className="card">
            <ClipboardList size={36} />
            <h3>2. Acompanhe</h3>
            <p>
              Consulte o protocolo e acompanhe
              o andamento do chamado.
            </p>
          </article>

          <article className="card">
            <CheckCircle size={36} />
            <h3>3. Veja a resolução</h3>
            <p>
              Agentes públicos assumem os chamados
              e registram as soluções realizadas.
            </p>
          </article>
        </div>
      </section>

      <section className="cta">
        <h2>Ajude a transformar sua cidade</h2>

        <p>
          Faça parte de uma comunidade que contribui
          para melhorar os espaços públicos.
        </p>

        <Link to="/cadastro" className="btn btn-light">
          Começar agora
        </Link>
      </section>
    </main>
  );
}

export default Home;
