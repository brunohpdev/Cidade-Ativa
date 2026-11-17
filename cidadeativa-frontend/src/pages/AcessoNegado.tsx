
import { Link } from "react-router-dom";

function AcessoNegado() {
  return (
    <main className="pagina-mensagem">
      <h1>Acesso negado</h1>

      <p>
        Você não possui permissão para acessar
        esta página.
      </p>

      <Link to="/" className="btn btn-primary">
        Voltar para o início
      </Link>
    </main>
  );
}

export default AcessoNegado;
