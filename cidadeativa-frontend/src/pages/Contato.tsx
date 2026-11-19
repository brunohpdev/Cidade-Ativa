
import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, MessageCircle } from "lucide-react";

const campo =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100";

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
      setErro(
        "Informe um assunto e uma mensagem com pelo menos 10 caracteres."
      );
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
    <main className="min-h-[70vh] bg-slate-50">
      <section className="bg-gradient-to-br from-teal-700 to-teal-900 px-5 py-16 text-center text-white">
        <span className="mb-5 inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
          Fale conosco
        </span>

        <h1 className="mb-5 text-3xl font-bold text-white md:text-5xl">
          Entre em contato
        </h1>

        <p className="mx-auto max-w-2xl leading-7 text-teal-50">
          Tem alguma dúvida ou sugestão sobre o CidadeAtiva?
          Envie uma mensagem para nossa equipe.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1fr_1.4fr]">
        <div className="py-4">
          <Mail size={38} className="mb-5 text-teal-700" />

          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Estamos à disposição
          </h2>

          <p className="leading-8 text-slate-600">
            Este canal é destinado a dúvidas e sugestões relacionadas
            ao projeto CidadeAtiva.
          </p>

          <div className="mt-6 flex items-center gap-3 font-semibold text-teal-700">
            <MessageCircle size={22} />
            <span>Equipe DevForce — FIAP</span>
          </div>
        </div>

        <form
          onSubmit={enviarContato}
          className="flex min-w-0 flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
        >
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Envie sua mensagem
          </h2>

          <label htmlFor="contato-nome" className="font-semibold text-slate-700">
            Nome completo
          </label>
          <input
            id="contato-nome"
            type="text"
            className={campo}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            required
          />

          <label htmlFor="contato-email" className="font-semibold text-slate-700">
            E-mail
          </label>
          <input
            id="contato-email"
            type="email"
            className={campo}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@exemplo.com"
            required
          />

          <label htmlFor="contato-assunto" className="font-semibold text-slate-700">
            Assunto
          </label>
          <input
            id="contato-assunto"
            type="text"
            className={campo}
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            placeholder="Assunto da mensagem"
            required
          />

          <label htmlFor="contato-mensagem" className="font-semibold text-slate-700">
            Mensagem
          </label>
          <textarea
            id="contato-mensagem"
            rows={6}
            className={`${campo} min-h-36 resize-y`}
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Escreva sua mensagem..."
            required
          />

          {erro && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {erro}
            </p>
          )}

          {aviso && (
            <p role="status" className="rounded-lg bg-teal-50 p-3 text-sm text-teal-800">
              {aviso}
            </p>
          )}

          <button
            type="submit"
            className="mt-3 self-start rounded-lg bg-teal-700 px-6 py-3 font-semibold text-white transition hover:bg-teal-800"
          >
            Preparar e-mail
          </button>
        </form>
      </section>
    </main>
  );
}

export default Contato;
