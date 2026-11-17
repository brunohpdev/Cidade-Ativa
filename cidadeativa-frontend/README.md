
# CidadeAtiva — Global Solution FIAP

## Sobre o projeto

O CidadeAtiva é uma plataforma desenvolvida para facilitar
a comunicação entre cidadãos e agentes públicos sobre
problemas de infraestrutura urbana.

Por meio do sistema, os cidadãos podem registrar ocorrências,
acompanhar o andamento dos chamados e consultar problemas
registrados na cidade.

Os agentes públicos podem assumir chamados disponíveis e
registrar a resolução dos problemas.

Os administradores são responsáveis pelo gerenciamento
dos cadastros de categorias e regiões.

## Integrantes

**Turma: 1TDSPY**

- Bruno Henrique Pizzo — RM 572362
- Murilo Castellano Bernardes — RM 569757
- Nicolas Kristman Perini — RM 573541
- Rodrigo Bertolla Silveira — RM 570141

## Tecnologias utilizadas

### Front-end
- React
- TypeScript
- Vite
- React Router
- CSS

### Back-end
- Java
- Spring Boot
- API REST
- JDBC

### Banco de dados
- Oracle Database

### Inteligência artificial
- Python
- Classificação de riscos urbanos
- Identificação de regiões críticas

A inteligência artificial é desenvolvida separadamente
da API Java.

## Funcionalidades

### Cidadão
- Cadastro e login
- Abertura de chamados
- Consulta de chamados
- Acompanhamento de ocorrências
- Edição de chamados com status ABERTO
- Inclusão opcional de URL de foto

### Agente público
- Visualização de chamados disponíveis
- Filtro de chamados abertos
- Assumir chamados sem agente responsável
- Acompanhamento dos próprios atendimentos
- Registro da resolução dos chamados
- Descrição obrigatória da resolução

### Administrador
- Gerenciamento de categorias
- Gerenciamento de regiões
- Consulta dos registros do sistema

### Recursos adicionais
- Proteção de rotas por perfil na interface
- Atualização manual dos chamados
- Indicadores de chamados por status
- Mensagens de carregamento e erro
- Validação dos formulários
- Layout responsivo
- Melhorias de acessibilidade
- Testes automatizados com Vitest

## Status dos chamados

O CidadeAtiva trabalha com três status:

- ABERTO
- EM_ANDAMENTO
- RESOLVIDO

O cidadão registra o chamado com status ABERTO.

O agente público pode assumir um chamado disponível,
alterando o status para EM_ANDAMENTO.

Após concluir o atendimento, o agente responsável
registra uma descrição obrigatória da resolução
e o chamado passa para RESOLVIDO.

## Como executar o projeto

### Requisitos

- Node.js
- npm

### 1. Clonar o repositório

```bash
git clone https://github.com/brunohpdev/Cidade-Ativa.git
```

### 2. Entrar na pasta do front-end

```bash
cd Cidade-Ativa/cidadeativa-frontend
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar a API

Crie um arquivo `.env` na pasta do front-end e adicione:

```env
VITE_API_URL=https://cidadeativa-gs.onrender.com
```

### 5. Iniciar o projeto

```bash
npm run dev
```

Acesse o endereço informado pelo Vite, normalmente:

http://localhost:5173/

## Testes automatizados

O projeto utiliza Vitest para testar funções de validação.

Executar os testes:

```bash
npx vitest run
```

Os testes verificam:

- E-mails válidos e inválidos
- Campos obrigatórios
- Descrições vazias
- Descrições acima de 1000 caracteres
- Descrições com exatamente 1000 caracteres

## Compilação

Para verificar se o projeto compila:

```bash
npm run build
```

## Organização do front-end

```text
src/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── RotaProtegida.tsx
│   ├── BotaoAtualizar.tsx
│   ├── Carregamento.tsx
│   ├── MensagemErro.tsx
│   ├── ResumoChamados.tsx
│   └── FormularioChamado.tsx
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Cadastro.tsx
│   ├── Chamados.tsx
│   ├── DetalhesChamado.tsx
│   ├── NovoChamado.tsx
│   ├── MeusChamados.tsx
│   ├── EditarChamado.tsx
│   ├── PainelAgente.tsx
│   ├── MeusAtendimentos.tsx
│   ├── ResolverChamado.tsx
│   ├── Administracao.tsx
│   ├── AdminCategorias.tsx
│   └── AdminRegioes.tsx
├── services/
├── types/
├── utils/
├── App.tsx
└── index.css
```

## Repositório

https://github.com/brunohpdev/Cidade-Ativa

## Observações

A proteção de rotas no React controla a navegação
pela interface, mas a autenticação e a autorização
também precisam ser validadas pelo back-end.

As informações pessoais dos usuários não devem ser
exibidas na consulta pública de chamados.

Os resultados da inteligência artificial em Python
não dependem de integração direta com o Java.
