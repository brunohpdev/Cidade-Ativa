
export interface Usuario {
  cdUsuario: number;
  nmUsuario: string;
  nmLogin: string;
  dsEmail: string;
  tpUsuario: "CIDADAO" | "AGENTE" | "ADMIN";
  stAtivo: string;
}
