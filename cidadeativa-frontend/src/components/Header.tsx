
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { obterUsuario } from "../services/usuarioLogado";

function Header() {
  const navigate = useNavigate();
  useLocation();

  const usuario = obterUsuario();

  function sair() {
    sessionStorage.removeItem("usuario");
    navigate("/login", { replace: true });
  }

  return (
    <header className="ca-header">
      <div className="ca-header-conteudo">

        {/* Logo */}
        <Link to="/" className="ca-logo">
          CidadeAtiva
        </Link>

        {/* Navegacao */}
        <nav className="ca-nav" aria-label="Menu principal">

          <NavLink to="/">
            Inicio
          </NavLink>

          <NavLink to="/chamados">
            Chamados
          </NavLink>

          
          <NavLink to="/sobre">
            Sobre
          </NavLink>

          <NavLink to="/integrantes">
            Integrantes
          </NavLink>

          <NavLink to="/faq">
            FAQ
          </NavLink>

          <NavLink to="/contato">
            Contato
          </NavLink>



          {/* Links do cidadao */}
          {usuario?.tpUsuario === "CIDADAO" && (
            <>
              <NavLink to="/novo-chamado">
                Abrir chamado
              </NavLink>

              <NavLink to="/meus-chamados">
                Meus chamados
              </NavLink>
            </>
          )}

          {/* Links do agente */}
          {usuario?.tpUsuario === "AGENTE" && (
            <>
              <NavLink to="/painel-agente">
                Painel do agente
              </NavLink>

              <NavLink to="/meus-atendimentos">
                Meus atendimentos
              </NavLink>
            </>
          )}

          {/* Link do administrador */}
          {usuario?.tpUsuario === "ADMIN" && (
            <NavLink to="/administracao">
              Administracao
            </NavLink>
          )}

          {/* Visitante */}
          {!usuario && (
            <>
              <NavLink to="/login">
                Entrar
              </NavLink>

              <NavLink to="/cadastro">
                Cadastrar
              </NavLink>
            </>
          )}

          {/* Usuario autenticado */}
          {usuario && (
            <button
              type="button"
              className="ca-sair"
              onClick={sair}
            >
              Sair
            </button>
          )}

        </nav>
      </div>
    </header>
  );
}

export default Header;
