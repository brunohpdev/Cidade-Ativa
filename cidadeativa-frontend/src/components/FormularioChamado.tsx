
import { useEffect, useState } from "react";
import { api } from "../services/api";

import {
  campoObrigatorio,
  validarDescricao
} from "../utils/validacoes";

import type {
  CategoriaChamado,
  RegiaoChamado,
  DadosChamado
} from "../types/ChamadoCidadao";

interface Props {
  titulo: string;
  textoBotao: string;
  inicial?: DadosChamado;
  onSalvar: (dados: DadosChamado) => Promise<void>;
}

function FormularioChamado({
  titulo,
  textoBotao,
  inicial,
  onSalvar
}: Props) {

  const [categorias, setCategorias] = useState<CategoriaChamado[]>([]);
  const [regioes, setRegioes] = useState<RegiaoChamado[]>([]);

  const [categoria, setCategoria] = useState(
    String(inicial?.cdCategoria ?? "")
  );

  const [regiao, setRegiao] = useState(
    String(inicial?.cdRegiao ?? "")
  );

  const [endereco, setEndereco] = useState(
    inicial?.dsEndereco ?? ""
  );

  const [descricao, setDescricao] = useState(
    inicial?.dsDescricao ?? ""
  );

  const [foto, setFoto] = useState(
    inicial?.dsFoto ?? ""
  );

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  // Carregar categorias e regioes da API
  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        const [cats, regs] = await Promise.all([
          api("/api/categorias"),
          api("/api/regioes")
        ]);

        if (ativo) {
          setCategorias(cats);
          setRegioes(regs);
        }
      } catch {
        if (ativo) {
          setErro("Erro ao carregar categorias e regiões.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, []);

  // Validar e enviar formulario
  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");

    // Validar categoria e regiao
    if (!categoria || !regiao) {
      setErro("Selecione uma categoria e uma região.");
      return;
    }

    // Validar endereco
    if (!campoObrigatorio(endereco)) {
      setErro("Informe o endereço da ocorrência.");
      return;
    }

    // Validar descricao
    if (!validarDescricao(descricao)) {
      setErro(
        "A descrição é obrigatória e deve ter até 1000 caracteres."
      );
      return;
    }

    setSalvando(true);

    try {
      await onSalvar({
        cdCategoria: Number(categoria),
        cdRegiao: Number(regiao),
        dsEndereco: endereco.trim(),
        dsDescricao: descricao.trim(),
        dsFoto: foto.trim() || null
      });
    } catch {
      setErro("Não foi possível salvar o chamado.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <form className="formulario-chamado" onSubmit={enviar}>
      <h1>{titulo}</h1>

      <p>
        Informe os dados do problema urbano.
        Os campos com * são obrigatórios.
      </p>

      {/* Mensagem de erro acessivel */}
      {erro && (
        <p className="erro" role="alert">
          {erro}
        </p>
      )}

      {carregando ? (
        <p role="status">Carregando opções...</p>
      ) : (
        <>
          {/* Categoria */}
          <label htmlFor="categoria-chamado">
            Categoria *
          </label>

          <select
            id="categoria-chamado"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="">
              Selecione uma categoria
            </option>

            {categorias.map((item) => (
              <option
                key={item.cdCategoria}
                value={item.cdCategoria}
              >
                {item.nmCategoria}
              </option>
            ))}
          </select>

          {/* Regiao */}
          <label htmlFor="regiao-chamado">
            Região *
          </label>

          <select
            id="regiao-chamado"
            value={regiao}
            onChange={(e) => setRegiao(e.target.value)}
            required
          >
            <option value="">
              Selecione uma região
            </option>

            {regioes.map((item) => (
              <option
                key={item.cdRegiao}
                value={item.cdRegiao}
              >
                {item.nmBairro} - {item.nmCidade}
              </option>
            ))}
          </select>

          {/* Endereco */}
          <label htmlFor="endereco-chamado">
            Endereço *
          </label>

          <input
            id="endereco-chamado"
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            placeholder="Rua, número e referência"
            required
          />

          {/* Descricao */}
          <label htmlFor="descricao-chamado">
            Descrição *
          </label>

          <textarea
            id="descricao-chamado"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva o problema encontrado"
            rows={5}
            maxLength={1000}
            required
            aria-describedby="contador-descricao"
          />

          {/* Contador acessivel */}
          <p id="contador-descricao">
            {descricao.length} de 1000 caracteres utilizados.
          </p>

          {/* Foto opcional */}
          <label htmlFor="foto-chamado">
            URL da foto (opcional)
          </label>

          <input
            id="foto-chamado"
            type="url"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
            placeholder="https://exemplo.com/foto.jpg"
          />

          {/* Botao de envio */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={salvando}
            aria-busy={salvando}
          >
            {salvando ? "Salvando..." : textoBotao}
          </button>
        </>
      )}
    </form>
  );
}

export default FormularioChamado;
