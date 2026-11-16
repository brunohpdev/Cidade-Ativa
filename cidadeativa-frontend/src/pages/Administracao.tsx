
import { Link } from "react-router-dom";
import { obterUsuario } from "../services/usuarioLogado";

function Administracao() {
  const usuario = obterUsuario();

  // Verificar se o usuario e administrador
  if (!usuario || usuario.tpUsuario !== "ADMIN") {
    return (
      <main className="ca-pagina">
        <h1>Acesso restrito</h1>

        <p>
          Somente administradores podem acessar
          esta pagina.
        </p>

        <Link to="/" className="ca-botao">
          Voltar para o inicio
        </Link>
      </main>
    );
  }

  return (
    <main className="ca-pagina">
      <h1>Painel administrativo</h1>

      <p>
        Bem-vindo, {usuario.nmUsuario}!
      </p>

      <p>
        Escolha uma das opcoes abaixo para
        gerenciar os cadastros do CidadeAtiva.
      </p>

      <div className="ca-painel-grid">

        {/* Gerenciamento de categorias */}
        <article className="ca-painel-card">
          <h2>Categorias</h2>

          <p>
            Cadastre, consulte, altere e exclua
            as categorias dos chamados urbanos.
          </p>

          <Link
            to="/admin/categorias"
            className="ca-botao"
          >
            Gerenciar categorias
          </Link>
        </article>

        {/* Gerenciamento de regioes */}
        <article className="ca-painel-card">
          <h2>Regioes</h2>

          <p>
            Cadastre, consulte, altere e exclua
            bairros e regioes do municipio.
          </p>

          <Link
            to="/admin/regioes"
            className="ca-botao"
          >
            Gerenciar regioes
          </Link>
        </article>

      </div>
    </main>
  );
}

export default Administracao;
