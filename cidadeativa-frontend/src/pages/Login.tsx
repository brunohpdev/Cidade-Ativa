
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import type { Usuario } from "../types/Usuario";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const usuario: Usuario = await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          dsEmail: email,
          dsSenha: senha,
        }),
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

  return (
    <main className="auth-container">
      <form className="auth-card" onSubmit={entrar}>
        <h1>Bem-vindo de volta!</h1>

        <p className="auth-description">
          Entre na sua conta CidadeAtiva.
        </p>

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          placeholder="seuemail@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {erro && <p className="erro">{erro}</p>}

        <button
          className="btn btn-primary btn-full"
          type="submit"
          disabled={carregando}
        >
          {carregando ? "Entrando..." : "Entrar"}
        </button>

        <p className="auth-bottom">
          Ainda não tem conta?{" "}
          <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </form>
    </main>
  );
}

export default Login;
