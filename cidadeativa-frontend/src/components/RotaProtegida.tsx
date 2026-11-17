
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { obterUsuario } from "../services/usuarioLogado";

interface Props {
  children: ReactNode;
  perfil: "CIDADAO" | "AGENTE" | "ADMIN";
}

function RotaProtegida({ children, perfil }: Props) {
  const usuario = obterUsuario();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (usuario.tpUsuario !== perfil) {
    return <Navigate to="/acesso-negado" replace />;
  }

  return <>{children}</>;
}

export default RotaProtegida;
