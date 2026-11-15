
import { Link, NavLink } from "react-router-dom";
import { Building2 } from "lucide-react";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <Building2 size={28} />
        <span>CidadeAtiva</span>
      </Link>

      <nav className="menu">
        <NavLink to="/" end>
          Início
        </NavLink>

        <NavLink to="/chamados">
          Chamados
        </NavLink>

        <NavLink to="/login">
          Entrar
        </NavLink>

        <Link to="/cadastro" className="btn btn-primary">
          Criar conta
        </Link>
      </nav>
    </header>
  );
}

export default Header;
