
import { api } from "./api";
import type {
  ChamadoAgente,
  ResolucaoChamado
} from "../types/Agente";

// Lista todos os chamados
export async function listarChamados(): Promise<ChamadoAgente[]> {
  return api("/api/chamados");
}

// Busca um chamado pelo ID
export async function buscarChamado(id: number): Promise<ChamadoAgente> {
  return api(`/api/chamados/${id}`);
}

// Agente assume um chamado
export async function assumirChamado(
  chamadoId: number,
  agenteId: number
): Promise<ChamadoAgente> {
  return api(`/api/chamados/${chamadoId}/iniciar/${agenteId}`, {
    method: "PUT"
  });
}

// Agente registra a resolucao
export async function resolverChamado(
  chamadoId: number,
  dados: ResolucaoChamado
): Promise<ChamadoAgente> {
  return api(`/api/chamados/${chamadoId}/resolver`, {
    method: "PUT",
    body: JSON.stringify(dados)
  });
}
