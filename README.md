# CidadeAtiva — Front-end

**Global Solution 2026/2 — CitizenTech | FIAP**  
**Equipe:** DevForce  
**Turma:** 1TDSPY  
**Curso:** Análise e Desenvolvimento de Sistemas

## 1. Sobre o projeto

O **CidadeAtiva** é uma plataforma web voltada ao registro e ao acompanhamento de problemas de infraestrutura urbana. Cidadãos podem comunicar ocorrências, como buracos, problemas de iluminação pública, lixo acumulado, calçadas danificadas, enchentes, falhas de sinalização e árvores caídas. Agentes públicos podem assumir chamados disponíveis e registrar a conclusão do atendimento.

A proposta está relacionada ao **ODS 11 — Cidades e Comunidades Sustentáveis**, por incentivar a participação cidadã e a melhoria dos espaços urbanos.

## 2. Objetivo

Desenvolver uma **Single Page Application (SPA)** responsiva em React e TypeScript, integrada a uma API REST em Java, com páginas e ações específicas para visitantes, cidadãos, agentes públicos e administradores.

## 3. Funcionalidades implementadas

### Área pública

- Página inicial, Sobre, Integrantes, FAQ e Contato.
- Consulta da lista de chamados e detalhes de cada ocorrência.
- Filtros por categoria, região, status e protocolo na listagem pública.
- Cadastro e login de usuários.
- Página de acesso negado e tratamento de rotas inexistentes.
- Formulário de contato que abre o aplicativo de e-mail do visitante para confirmar o envio da mensagem.

### Cidadão

- Abertura de chamado com categoria, região, endereço e descrição.
- Campo opcional de URL da fotografia da ocorrência.
- Consulta e acompanhamento dos próprios chamados.
- Edição de chamados enquanto estiverem abertos, conforme as regras do backend.

### Agente público

- Painel para consultar chamados disponíveis.
- Possibilidade de assumir chamados abertos.
- Consulta dos atendimentos sob sua responsabilidade.
- Registro da resolução com descrição obrigatória e URL de fotografia opcional.

### Administrador

- Acesso à área administrativa.
- Listagem, cadastro, edição e exclusão de categorias.
- Listagem, cadastro, edição e exclusão de regiões.

### Status dos chamados

| Status | Significado |
|---|---|
| ABERTO | Ocorrência registrada e aguardando atendimento |
| EM_ANDAMENTO | Chamado assumido por um agente público |
| RESOLVIDO | Atendimento concluído pelo agente responsável |

## 4. Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| React | Componentes e interface web |
| TypeScript | Tipagem e organização do código |
| Vite | Servidor de desenvolvimento e build |
| React Router DOM | Rotas públicas e protegidas |
| CSS e Tailwind CSS | Estilização e responsividade |
| Lucide React | Ícones da interface |
| Fetch API | Comunicação com a API Java |
| Vitest | Testes automatizados |
| Oxlint | Análise estática do código |
| Git e GitHub | Versionamento |
| Vercel | Hospedagem do frontend |
| Java, Spring Boot e JDBC | Desenvolvimento do backend |
| Oracle Database | Persistência dos dados |
| Render | Hospedagem da API Java |

## 5. Estrutura do projeto

O frontend está organizado em diretórios específicos para componentes, páginas, serviços, tipos e funções auxiliares.

```text
Cidade-Ativa/
├── .gitignore
├── README.md
└── cidadeativa-frontend/
    ├── .gitignore
    ├── .oxlintrc.json
    ├── index.html
    ├── public/
    │   └── img/
    │       ├── Bruno.png
    │       ├── Murilo.png
    │       ├── Nicolas.png
    │       └── Rodrigo.png
    ├── src/
    │   ├── components/
    │   │   ├── BotaoAtualizar.tsx
    │   │   ├── Carregamento.tsx
    │   │   ├── Footer.tsx
    │   │   ├── FormularioChamado.tsx
    │   │   ├── Header.tsx
    │   │   ├── MensagemErro.tsx
    │   │   ├── ResumoChamados.tsx
    │   │   └── RotaProtegida.tsx
    │   ├── pages/
    │   ├── services/
    │   │   ├── agenteService.ts
    │   │   ├── api.ts
    │   │   ├── sessao.ts
    │   │   └── usuarioLogado.ts
    │   ├── types/
    │   ├── utils/
    │   │   ├── validacoes.ts
    │   │   └── validacoes.test.ts
    │   ├── App.tsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.tsx
    ├── package.json
    ├── package-lock.json
    ├── vite.config.ts
    ├── vercel.json
    └── tsconfig.json
```

### Organização dos diretórios

- `components/`: componentes reutilizáveis, incluindo cabeçalho, rodapé, formulários e proteção de rotas.
- `pages/`: páginas públicas, institucionais e áreas específicas de cada perfil.
- `services/`: comunicação com a API, gerenciamento da sessão e operações dos agentes.
- `types/`: interfaces e definições TypeScript.
- `utils/`: funções de validação e testes automatizados.
- `public/img/`: fotografias dos integrantes.
- `App.tsx`: definição das rotas da aplicação.
- `main.tsx`: inicialização do React.
- `App.css` e `index.css`: estilização e responsividade.

## 6. Como executar localmente

### Pré-requisitos

- Node.js e npm instalados.
- Git instalado.
- Conexão com a internet para acessar a API remota.

### 6.1. Clonar o repositório

```bash
git clone https://github.com/brunohpdev/Cidade-Ativa.git
cd Cidade-Ativa/cidadeativa-frontend
```

### 6.2. Instalar as dependências

```bash
npm install
```

### 6.3. Configurar a API

O frontend utiliza a variável de ambiente `VITE_API_URL` para definir o endereço da API Java.

O arquivo `src/services/api.ts` já contém o endereço público do backend como padrão:

```text
https://cidadeativa-gs.onrender.com
```

Por isso, não é obrigatório criar um arquivo `.env` para utilizar a API publicada.

Caso seja necessário configurar outro endereço, crie um arquivo `.env` na pasta `cidadeativa-frontend`:

```env
VITE_API_URL=http://localhost:8080
```

Reinicie o servidor do Vite após modificar a variável.

Não armazene senhas ou informações confidenciais em variáveis `VITE_`, pois seus valores podem ficar disponíveis no navegador.

### 6.4. Iniciar o projeto

```bash
npm run dev
```

O Vite disponibilizará um endereço local, normalmente:

```text
http://localhost:5173/
```

No Windows PowerShell, caso a execução do `npm.ps1` esteja bloqueada, utilize:

```bash
npm.cmd run dev
```

### 6.5. Gerar a versão de produção

```bash
npm run build
```

O comando verifica o TypeScript e gera os arquivos de produção na pasta `dist`.

### 6.6. Executar os testes

```bash
npm run lint
npx vitest run
```

O projeto utiliza Oxlint para análise estática e Vitest para testes de funções de validação.

Os testes contemplam situações como campos obrigatórios, formatos de e-mail e limites de caracteres.

## 7. Rotas da aplicação

| Rota | Acesso | Finalidade |
|---|---|---|
| `/` | Público | Página inicial |
| `/sobre` | Público | Apresentação do projeto |
| `/integrantes` | Público | Informações da equipe |
| `/faq` | Público | Perguntas frequentes |
| `/contato` | Público | Página de contato |
| `/login` | Público | Autenticação |
| `/cadastro` | Público | Cadastro de usuário |
| `/chamados` | Público | Listagem dos chamados |
| `/chamados/:id` | Público | Detalhes de um chamado |
| `/novo-chamado` | Cidadão | Abertura de chamado |
| `/meus-chamados` | Cidadão | Consulta dos próprios chamados |
| `/editar-chamado/:id` | Cidadão | Edição de chamado |
| `/painel-agente` | Agente | Painel de atendimento |
| `/meus-atendimentos` | Agente | Chamados assumidos |
| `/resolver-chamado/:id` | Agente | Registro da resolução |
| `/administracao` | Administrador | Painel administrativo |
| `/admin/categorias` | Administrador | Gerenciamento de categorias |
| `/admin/regioes` | Administrador | Gerenciamento de regiões |
| `/acesso-negado` | Público | Aviso de acesso negado |

A aplicação também possui tratamento para rotas inexistentes.

## 8. Integração com a API Java

A comunicação entre o frontend e o backend é realizada por meio de `src/services/api.ts`, utilizando a Fetch API.

A aplicação consome os serviços REST desenvolvidos em Java e Spring Boot, permitindo:

- Consultar chamados registrados.
- Cadastrar novas ocorrências.
- Editar chamados abertos.
- Consultar chamados por usuário.
- Realizar cadastro e autenticação.
- Consultar e gerenciar categorias e regiões.
- Assumir chamados disponíveis.
- Registrar a conclusão dos atendimentos.
- Consultar históricos de resolução.

O backend é responsável pela aplicação das regras de negócio e persistência dos dados em Oracle Database, utilizando JDBC.

### Autenticação e perfis

A aplicação possui três perfis de acesso:

- **CIDADAO:** abertura e acompanhamento de ocorrências.
- **AGENTE:** atendimento e resolução de chamados.
- **ADMIN:** gerenciamento dos cadastros administrativos.

Os dados da sessão são armazenados no `sessionStorage`, e a navegação é apresentada conforme o perfil do usuário.

A proteção de rotas no frontend organiza o acesso às páginas, mas as operações também precisam ser autorizadas pelo backend.

### Inteligência artificial

O CidadeAtiva também contempla uma solução de inteligência artificial desenvolvida em Python para classificação de riscos urbanos e identificação de regiões críticas.

Esse módulo é desenvolvido separadamente e não possui integração direta com o frontend React.

**API publicada:**  
https://cidadeativa-gs.onrender.com

## 9. Responsividade e acessibilidade

O CidadeAtiva utiliza estilos responsivos para adaptação da interface a diferentes dispositivos, incluindo computadores, tablets e smartphones.

A aplicação contempla:

- Layouts flexíveis.
- Formulários com identificação dos campos.
- Mensagens de erro.
- Indicadores de carregamento.
- Estados visuais de interação.
- Indicadores de foco para navegação por teclado.
- Organização da interface por perfil de usuário.

A conformidade integral com normas de acessibilidade depende de validações específicas.

## 10. Integrantes

| Nome | RM | Turma |
|---|---|---|
| Bruno Henrique Pizzo | 572362 | 1TDSPY |
| Murilo Castellano Bernardes | 569757 | 1TDSPY |
| Nicolas Kristman Perini | 573541 | 1TDSPY |
| Rodrigo Bertolla Silveira | 570141 | 1TDSPY |

### GitHub e LinkedIn

**Bruno Henrique Pizzo**
- GitHub: https://github.com/brunohpdev
- LinkedIn: https://www.linkedin.com/in/bruno-pizzo-72b74138b/

**Murilo Castellano Bernardes**
- GitHub: https://github.com/mucastellano
- LinkedIn: https://www.linkedin.com/in/murilo-castellano-bernardes-27b430324/

**Nicolas Kristman Perini**
- GitHub: https://github.com/nicolaskp14
- LinkedIn: https://www.linkedin.com/in/nicolas-kristman-perini-8b780a380/

**Rodrigo Bertolla Silveira**
- GitHub: https://github.com/rodrigobertolla
- LinkedIn: https://www.linkedin.com/in/rodrigo-bertolla-silveira-4475a43b5/

## 11. Links do projeto

| Recurso | Endereço |
|---|---|
| Frontend — Vercel | https://cidade-ativa-gs.vercel.app/ |
| Backend — Render | https://cidadeativa-gs.onrender.com |
| Repositório — GitHub | https://github.com/brunohpdev/Cidade-Ativa |
| Vídeo de demonstração — YouTube | https://youtu.be/b0JhY2cvRwQ |

## 12. Contato

A página de Contato permite que o visitante prepare uma mensagem para a equipe DevForce utilizando seu aplicativo de e-mail.

**Página de Contato:**  
https://cidade-ativa-gs.vercel.app/contato

**Instituição:** FIAP  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Turma:** 1TDSPY

---

**CidadeAtiva — Global Solution 2026/2 | FIAP — DevForce**
