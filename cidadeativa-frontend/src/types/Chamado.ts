
export interface Chamado {
  cdChamado: number;
  nrProtocolo: string;
  cdUsuario: number;
  cdCategoria: number;
  cdRegiao: number;
  cdAgente: number | null;
  dsEndereco: string;
  dsDescricao: string;
  dsFoto: string | null;
  stChamado: string;
  tpRisco: string | null;
  dtAbertura: string;
  dtConclusao: string | null;
}

export interface Categoria {
  cdCategoria: number;
  nmCategoria: string;
  dsCategoria: string;
}

export interface Regiao {
  cdRegiao: number;
  nmBairro: string;
  nmCidade: string;
  sgEstado: string;
}
