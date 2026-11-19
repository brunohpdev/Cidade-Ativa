
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function cadastrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      await api("/api/auth/cadastro", {
        method: "POST",
        body: JSON.stringify({
          nmUsuario: nome,
          nmLogin: login,
          dsEmail: email,
          dsSenha: senha,
        }),
      });

      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("409")
      ) {
        setErro("Este e-mail já está cadastrado.");
      } else {
        setErro("Erro ao cadastrar. Verifique os dados.");
      }
    } finally {
      setCarregando(false);
    }
  }

  const campoClasse =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-100";

  return (
    <main className="flex min-h-[75vh] items-center justify-center px-4 py-12 sm:px-6">
      <form
        onSubmit={cadastrar}
        className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9"
      >
        <h1 className="text-center text-3xl font-bold text-slate-900">
          Crie sua conta
        </h1>

        <p className="mb-3 text-center text-slate-600">
          Participe da transformação da sua cidade.
        </p>

        <label htmlFor="nome" className="font-semibold text-slate-700">
          Nome completo
        </label>
        <input
          id="nome"
          type="text"
          className={campoClasse}
          placeholder="Digite seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label htmlFor="login" className="font-semibold text-slate-700">
          Nome de usuário
        </label>
        <input
          id="login"
          type="text"
          className={campoClasse}
          placeholder="Escolha um nome de usuário"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />

        <label htmlFor="email" className="font-semibold text-slate-700">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          className={campoClasse}
          placeholder="seuemail@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="senha" className="font-semibold text-slate-700">
          Senha
        </label>
        <input
          id="senha"
          type="password"
          className={campoClasse}
          placeholder="Mínimo de 6 caracteres"
          minLength={6}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
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
          className="mt-3 w-full rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={carregando}
        >
          {carregando ? "Cadastrando..." : "Criar conta"}
        </button>

        <p className="mt-3 text-center text-sm text-slate-600">
          Já possui uma conta?{" "}
          <Link
            to="/login"
            className="font-semibold text-teal-700 hover:underline"
          >
            Entrar
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Cadastro;
