
const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://cidadeativa-gs.onrender.com"
).replace(/\/$/, "");

export async function api<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  try {
    const resposta = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const texto = await resposta.text();

    let dados: any = null;

    if (texto) {
      try {
        dados = JSON.parse(texto);
      } catch {
        dados = texto;
      }
    }

    if (!resposta.ok) {
      let mensagem = `Erro HTTP ${resposta.status}`;

      if (dados && typeof dados === "object") {
        mensagem =
          dados.message ||
          dados.mensagem ||
          mensagem;
      }

      if (resposta.status === 401) {
        mensagem = "Usuario nao autenticado.";
      }

      if (resposta.status === 403) {
        mensagem = "Acesso nao permitido.";
      }

      if (resposta.status === 404) {
        mensagem = "Recurso nao encontrado.";
      }

      if (resposta.status === 500) {
        mensagem = "Erro interno do servidor.";
      }

      throw new Error(mensagem);
    }

    if (resposta.status === 204 || !texto) {
      return null as T;
    }

    return dados as T;

  } catch (erro) {
    console.error("Erro ao acessar a API:", url, erro);

    if (erro instanceof TypeError) {
      throw new Error(
        "Nao foi possivel conectar ao servidor. Verifique sua conexao."
      );
    }

    throw erro;
  }
}
