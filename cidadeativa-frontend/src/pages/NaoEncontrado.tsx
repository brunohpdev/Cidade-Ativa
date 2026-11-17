
import { Link } from "react-router-dom";

function NaoEncontrado() {
  return (
    <main className="pagina-mensagem">
      <h1>Erro 404</h1>

      <h2>Página não encontrada</h2>

      <p>
        A página que você está procurando não existe.
      </p>

      <Link to="/" className="btn btn-primary">
        Voltar para o início
      </Link>
    </main>
  );
}

export default NaoEncontrado;
