
export interface ChamadoAgente {
  cdChamado: number;
  nrProtocolo: string;
  cdCategoria: number;
  cdRegiao: number;
  cdAgente: number | null;
  dsEndereco: string;
  dsDescricao: string;
  stChamado: "ABERTO" | "EM_ANDAMENTO" | "RESOLVIDO";
  dtAbertura: string;
}

export interface ResolucaoChamado {
  cdUsuario: number;
  dsObservacao: string;
  dsFoto: string | null;
}
