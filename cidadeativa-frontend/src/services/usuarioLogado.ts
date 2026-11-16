
export interface UsuarioLogado {
  cdUsuario: number;
  nmUsuario: string;
  tpUsuario: string;
}

export function obterUsuario(): UsuarioLogado | null {
  const dados = sessionStorage.getItem("usuario");

  if (!dados) {
    return null;
  }

  try {
    const usuario = JSON.parse(dados) as UsuarioLogado;

    if (
      typeof usuario.cdUsuario !== "number" ||
      typeof usuario.tpUsuario !== "string"
    ) {
      return null;
    }

    return usuario;
  } catch {
    return null;
  }
}
