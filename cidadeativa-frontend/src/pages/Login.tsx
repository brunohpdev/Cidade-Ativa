
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import type { Usuario } from "../types/Usuario";
import { validarEmail, campoObrigatorio } from "../utils/validacoes";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");

    if (!validarEmail(email)) {
      setErro("Digite um e-mail válido.");
      return;
    }

    if (!campoObrigatorio(senha)) {
      setErro("Preencha a senha.");
      return;
    }

    setCarregando(true);

    try {
      const usuario: Usuario = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          dsEmail: email.trim(),
          dsSenha: senha
        })
      });

      sessionStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
      );

      if (usuario.tpUsuario === "AGENTE") {
        navigate("/painel-agente");
      } else if (usuario.tpUsuario === "ADMIN") {
        navigate("/administracao");
      } else {
        navigate("/meus-chamados");
      }
    } catch {
      setErro("Não foi possível entrar. Confira seus dados.");
    } finally {
      setCarregando(false);
    }
  }

  const campo =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100";

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-12 sm:px-6">
      <form
        onSubmit={entrar}
        className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9"
      >
        <h1 className="text-center text-3xl font-bold text-slate-900">
          Bem-vindo de volta!
        </h1>

        <p className="mb-3 text-center text-slate-600">
          Entre na sua conta CidadeAtiva.
        </p>

        <label htmlFor="email" className="font-semibold text-slate-700">
          E-mail
        </label>

        <input
          id="email"
          type="email"
          className={campo}
          placeholder="seuemail@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          aria-describedby="ajuda-email"
        />

        <small id="ajuda-email" className="text-sm text-slate-500">
          Digite o e-mail utilizado no cadastro.
        </small>

        <label htmlFor="senha" className="font-semibold text-slate-700">
          Senha
        </label>

        <input
          id="senha"
          type="password"
          className={campo}
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          autoComplete="current-password"
        />

        {erro && (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {erro}
          </p>
        )}

        <button
          type="submit"
          disabled={carregando}
          className="mt-3 w-full rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {carregando ? "Entrando..." : "Entrar"}
        </button>

        <p className="mt-3 text-center text-sm text-slate-600">
          Ainda não tem conta?{" "}
          <Link
            to="/cadastro"
            className="font-semibold text-teal-700 hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Login;
