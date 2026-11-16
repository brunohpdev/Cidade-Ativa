
export interface ChamadoCidadao {
  cdChamado: number;
  nrProtocolo: string;
  cdUsuario: number;
  cdCategoria: number;
  cdRegiao: number;
  dsEndereco: string;
  dsDescricao: string;
  dsFoto: string | null;
  stChamado: "ABERTO" | "EM_ANDAMENTO" | "RESOLVIDO";
  dtAbertura: string;
}

export interface CategoriaChamado {
  cdCategoria: number;
  nmCategoria: string;
}

export interface RegiaoChamado {
  cdRegiao: number;
  nmBairro: string;
  nmCidade: string;
  sgEstado: string;
}

export interface DadosChamado {
  cdCategoria: number;
  cdRegiao: number;
  dsEndereco: string;
  dsDescricao: string;
  dsFoto: string | null;
}
