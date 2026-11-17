
const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://cidadeativa-gs.onrender.com"
).replace(/\/$/, "");

export async function api(
  endpoint: string,
  options: RequestInit = {}
) {
  const url = `${API_URL}${endpoint}`;

  try {
    const resposta = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!resposta.ok) {
      throw new Error(`Erro HTTP ${resposta.status}`);
    }

    if (resposta.status === 204) {
      return null;
    }

    return resposta.json();
  } catch (erro) {
    console.error("Erro ao acessar a API:", url, erro);
    throw erro;
  }
}
