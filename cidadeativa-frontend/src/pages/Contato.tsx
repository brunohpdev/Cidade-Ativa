
import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, MessageCircle } from "lucide-react";

function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");

  function enviarContato(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro("");
    setAviso("");

    if (nome.trim().length < 3) {
      setErro("Digite um nome com pelo menos 3 caracteres.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setErro("Informe um e-mail válido.");
      return;
    }

    if (!assunto.trim() || mensagem.trim().length < 10) {
      setErro("Informe um assunto e uma mensagem com pelo menos 10 caracteres.");
      return;
    }

    const destinatario = "devforce22fiap@gmail.com";

    const corpo = [
      `Nome: ${nome}`,
      `E-mail: ${email}`,
      "",
      mensagem
    ].join("\n");

    const url = `mailto:${destinatario}?subject=${encodeURIComponent(
      assunto
    )}&body=${encodeURIComponent(corpo)}`;

    window.location.href = url;

    setAviso(
      "Seu aplicativo de e-mail será aberto. Confira e envie a mensagem por ele."
    );
  }

  return (
    <main className="institucional">
      <section className="institucional-topo">
        <span className="institucional-tag">Fale conosco</span>
        <h1>Entre em contato</h1>
        <p>
          Tem alguma dúvida ou sugestão sobre o CidadeAtiva?
          Envie uma mensagem para nossa equipe.
        </p>
      </section>

      <section className="institucional-conteudo contato-layout">
        <div className="contato-info">
          <Mail size={38} />
          <h2>Estamos à disposição</h2>
          <p>
            Este canal é destinado a dúvidas e sugestões
            relacionadas ao projeto CidadeAtiva.
          </p>

          <div className="contato-detalhe">
            <MessageCircle size={22} />
            <span>Equipe DevForce — FIAP</span>
          </div>
        </div>

        <form className="contato-formulario" onSubmit={enviarContato}>
          <h2>Envie sua mensagem</h2>

          <label htmlFor="contato-nome">Nome completo</label>
          <input
            id="contato-nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            required
          />

          <label htmlFor="contato-email">E-mail</label>
          <input
            id="contato-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@exemplo.com"
            required
          />

          <label htmlFor="contato-assunto">Assunto</label>
          <input
            id="contato-assunto"
            type="text"
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            placeholder="Assunto da mensagem"
            required
          />

          <label htmlFor="contato-mensagem">Mensagem</label>
          <textarea
            id="contato-mensagem"
            rows={6}
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Escreva sua mensagem..."
            required
          />

          {erro && <p className="contato-erro" role="alert">{erro}</p>}
          {aviso && <p className="contato-aviso" role="status">{aviso}</p>}

          <button type="submit" className="institucional-botao">
            Preparar e-mail
          </button>
        </form>
      </section>
    </main>
  );
}

export default Contato;
