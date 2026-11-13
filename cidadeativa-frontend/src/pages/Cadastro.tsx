
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

  return (
    <main className="auth-container">
      <form className="auth-card" onSubmit={cadastrar}>
        <h1>Crie sua conta</h1>

        <p className="auth-description">
          Participe da transformação da sua cidade.
        </p>

        <label htmlFor="nome">Nome completo</label>
        <input
          id="nome"
          type="text"
          placeholder="Digite seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label htmlFor="login">Nome de usuário</label>
        <input
          id="login"
          type="text"
          placeholder="Escolha um nome de usuário"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />

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
          placeholder="Mínimo de 6 caracteres"
          minLength={6}
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
          {carregando ? "Cadastrando..." : "Criar conta"}
        </button>

        <p className="auth-bottom">
          Já possui uma conta?{" "}
          <Link to="/login">Entrar</Link>
        </p>
      </form>
    </main>
  );
}

export default Cadastro;
