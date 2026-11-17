
import { describe, it, expect } from "vitest";

import {
  validarEmail,
  campoObrigatorio,
  validarDescricao
} from "./validacoes";

describe("Testes de validacao do CidadeAtiva", () => {

  // Testes de e-mail
  it("deve aceitar um e-mail valido", () => {
    expect(validarEmail("teste@email.com")).toBe(true);
  });

  it("deve rejeitar um e-mail invalido", () => {
    expect(validarEmail("emailinvalido")).toBe(false);
  });

  // Testes de campos obrigatorios
  it("deve aceitar um campo preenchido", () => {
    expect(campoObrigatorio("Rua das Flores")).toBe(true);
  });

  it("deve rejeitar um campo vazio", () => {
    expect(campoObrigatorio("")).toBe(false);
  });

  it("deve rejeitar um campo somente com espacos", () => {
    expect(campoObrigatorio("   ")).toBe(false);
  });

  // Testes de descricao
  it("deve aceitar uma descricao valida", () => {
    expect(
      validarDescricao("Buraco na rua causando acidentes")
    ).toBe(true);
  });

  it("deve rejeitar uma descricao vazia", () => {
    expect(validarDescricao("")).toBe(false);
  });

  it("deve rejeitar uma descricao maior que 1000 caracteres", () => {
    const descricao = "A".repeat(1001);

    expect(validarDescricao(descricao)).toBe(false);
  });

  it("deve aceitar uma descricao com exatamente 1000 caracteres", () => {
    const descricao = "A".repeat(1000);

    expect(validarDescricao(descricao)).toBe(true);
  });

});
