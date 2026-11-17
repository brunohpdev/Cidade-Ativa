
export function validarEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function campoObrigatorio(valor: string): boolean {
  return valor.trim().length > 0;
}

export function validarDescricao(descricao: string): boolean {
  return (
    descricao.trim().length > 0 &&
    descricao.length <= 1000
  );
}
