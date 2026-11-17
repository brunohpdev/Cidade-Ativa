
interface Props {
  mensagem?: string;
}

function Carregamento({ mensagem = "Carregando..." }: Props) {
  return (
    <div className="ca-carregamento" role="status">
      <p>{mensagem}</p>
    </div>
  );
}

export default Carregamento;
