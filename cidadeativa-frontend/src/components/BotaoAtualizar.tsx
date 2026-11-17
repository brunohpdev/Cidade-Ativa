
interface Props {
  atualizar: () => void;
  carregando: boolean;
}

function BotaoAtualizar({ atualizar, carregando }: Props) {
  return (
    <button
      type="button"
      onClick={atualizar}
      disabled={carregando}
      className="btn btn-primary"
    >
      {carregando ? "Atualizando..." : "Atualizar chamados"}
    </button>
  );
}

export default BotaoAtualizar;
