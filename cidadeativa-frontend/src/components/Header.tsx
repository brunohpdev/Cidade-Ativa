
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Building2, LogOut } from "lucide-react";
import { useState } from "react";

import { obterCidadao, sair } from "../services/sessao";
import type { Usuario } from "../types/Usuario";

function Header() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<Usuario | null>(
    obterCidadao()
  );

  function fazerLogout() {
    sair();
    setUsuario(null);
    navigate("/login");
  }

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

        {usuario ? (
          <>
            <NavLink to="/novo-chamado">
              Registrar problema
            </NavLink>

            <NavLink to="/meus-chamados">
              Meus chamados
            </NavLink>

            <button
              type="button"
              className="btn btn-outline"
              onClick={fazerLogout}
            >
              <LogOut size={17} />
              Sair
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">
              Entrar
            </NavLink>

            <Link
              to="/cadastro"
              className="btn btn-primary"
            >
              Criar conta
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
