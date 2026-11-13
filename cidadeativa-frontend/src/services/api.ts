
const API_URL = import.meta.env.VITE_API_URL;

export async function api(
  endpoint: string,
  options: RequestInit = {}
) {
  const resposta = await fetch(`${API_URL}${endpoint}`, {
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
}
