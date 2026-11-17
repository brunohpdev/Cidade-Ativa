
interface Props {
  mensagem: string;
}

function MensagemErro({ mensagem }: Props) {
  return (
    <div className="ca-mensagem-erro" role="alert">
      <p>{mensagem}</p>
    </div>
  );
}

export default MensagemErro;
