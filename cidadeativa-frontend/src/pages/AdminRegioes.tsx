
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { obterUsuario } from "../services/usuarioLogado";

interface Regiao {
  cdRegiao: number;
  nmBairro: string;
  nmCidade: string;
  sgEstado: string;
}

function AdminRegioes() {
  const usuario = obterUsuario();
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [id, setId] = useState<number | null>(null);
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("SP");
  const [erro, setErro] = useState("");

  async function carregar() {
    try {
      const dados = await api("/api/regioes");
      setRegioes(dados);
    } catch {
      setErro("Erro ao carregar regiões.");
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  function editar(item: Regiao) {
    setId(item.cdRegiao);
    setBairro(item.nmBairro);
    setCidade(item.nmCidade);
    setEstado(item.sgEstado);
  }

  function limpar() {
    setId(null);
    setBairro("");
    setCidade("");
    setEstado("SP");
  }

  async function salvar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");

    if (!bairro.trim() || !cidade.trim() ||
        estado.trim().length !== 2) {
      setErro("Preencha os dados corretamente.");
      return;
    }

    try {
      await api(id === null ? "/api/regioes" : `/api/regioes/${id}`, {
        method: id === null ? "POST" : "PUT",
        body: JSON.stringify({
          nmBairro: bairro.trim(),
          nmCidade: cidade.trim(),
          sgEstado: estado.trim().toUpperCase()
        })
      });

      limpar();
      await carregar();
    } catch {
      setErro("Não foi possível salvar a região.");
    }
  }

  async function excluir(codigo: number) {
    if (!window.confirm("Deseja excluir esta região?")) return;

    try {
      await api(`/api/regioes/${codigo}`, {
        method: "DELETE"
      });
      await carregar();
    } catch {
      setErro("Não foi possível excluir a região.");
    }
  }

  if (!usuario || usuario.tpUsuario !== "ADMIN") {
    return <main className="chamados-container">
      <h1>Acesso restrito</h1>
    </main>;
  }

  return (
    <main className="chamados-container">
      <h1>Gerenciar regiões</h1>

      <form className="formulario-chamado" onSubmit={salvar}>
        <h2>{id === null ? "Nova região" : "Editar região"}</h2>

        <label htmlFor="bairro">Bairro</label>
        <input
          id="bairro"
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
          required
        />

        <label htmlFor="cidade">Cidade</label>
        <input
          id="cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          required
        />

        <label htmlFor="estado">Estado (UF)</label>
        <input
          id="estado"
          maxLength={2}
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          required
        />

        {erro && <p className="erro">{erro}</p>}

        <button className="btn btn-primary" type="submit">
          Salvar
        </button>

        <button type="button" onClick={limpar}>
          Limpar
        </button>
      </form>

      {regioes.map((item) => (
        <article className="chamado-card" key={item.cdRegiao}>
          <h3>{item.nmBairro}</h3>
          <p>{item.nmCidade} - {item.sgEstado}</p>

          <button onClick={() => editar(item)}>Editar</button>
          <button onClick={() => excluir(item.cdRegiao)}>
            Excluir
          </button>
        </article>
      ))}
    </main>
  );
}

export default AdminRegioes;
