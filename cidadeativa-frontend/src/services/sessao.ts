
import type { Usuario } from "../types/Usuario";

export function obterCidadao(): Usuario | null {
  const salvo = sessionStorage.getItem("usuario");

  if (!salvo) return null;

  try {
    const usuario: Usuario = JSON.parse(salvo);

    if (
      !usuario.cdUsuario ||
      usuario.tpUsuario !== "CIDADAO"
    ) {
      return null;
    }

    return usuario;
  } catch {
    return null;
  }
}

export function sair() {
  sessionStorage.removeItem("usuario");
}
