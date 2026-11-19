# CidadeAtiva — Front-end

**Global Solution 2026/2 — CitizenTech | FIAP**

**Equipe:** DevForce  
**Turma:** 1TDSPY

## 1. Sobre o projeto

O **CidadeAtiva** é uma plataforma web desenvolvida para facilitar a comunicação entre cidadãos e agentes públicos na identificação, no registro e no acompanhamento de problemas de infraestrutura urbana.

A solução permite que cidadãos registrem ocorrências relacionadas a buracos, iluminação pública, lixo acumulado, calçadas danificadas, enchentes, sinalização e árvores caídas. Os agentes públicos podem assumir os chamados e registrar a resolução dos problemas.

O projeto busca incentivar a participação cidadã e contribuir para cidades mais organizadas, acessíveis e sustentáveis, estando relacionado ao **Objetivo de Desenvolvimento Sustentável 11 (ODS 11) — Cidades e Comunidades Sustentáveis**.

## 2. Objetivo

Desenvolver uma Single Page Application (SPA) responsiva, utilizando React e TypeScript, integrada a uma API REST Java para consultar, cadastrar e atualizar informações reais sobre ocorrências urbanas.

A aplicação oferece interfaces específicas para cidadãos, agentes públicos e administradores, permitindo o gerenciamento das solicitações conforme o perfil de acesso.

## 3. Funcionalidades

### Área pública
- Página inicial com apresentação da solução.
- Consulta de ocorrências urbanas.
- Cadastro e login de usuários.
- Página Sobre o projeto.
- Página Integrantes.
- Página de perguntas frequentes (FAQ).
- Página de Contato.

### Cidadão
- Cadastro e autenticação.
- Registro de ocorrências com categoria, região, endereço e descrição.
- Inclusão opcional de fotografia.
- Consulta dos próprios chamados.
- Acompanhamento do status das solicitações.
- Edição de chamados enquanto estiverem abertos.

### Agente público
- Acesso ao painel do agente.
- Visualização de chamados disponíveis.
- Possibilidade de assumir ocorrências abertas.
- Consulta dos atendimentos sob sua responsabilidade.
- Registro da resolução com descrição obrigatória e fotografia opcional.

### Administrador
- Acesso à área administrativa.
- Gerenciamento dos cadastros disponibilizados pelo sistema.

### Status dos chamados
- **ABERTO:** ocorrência registrada, aguardando atendimento.
- **EM_ANDAMENTO:** ocorrência assumida por um agente público.
- **RESOLVIDO:** atendimento concluído pelo agente responsável.

## 4. Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| React | Desenvolvimento da interface e componentes |
| TypeScript | Tipagem e organização do código |
| Vite | Ambiente de desenvolvimento e build |
| React Router DOM | Navegação e gerenciamento das rotas |
| CSS3 | Estilização e responsividade |
| Fetch API | Comunicação HTTP com o backend |
| Git e GitHub | Versionamento e hospedagem do código |
| Vercel | Publicação do frontend |
| Java REST API | Backend responsável pelos dados e regras de negócio |
| Oracle Database | Persistência dos dados no backend |
| Render | Hospedagem da API Java |


## 5. Estrutura do projeto

A aplicação está organizada em diretórios específicos para páginas, componentes, serviços e tipos.

```text
Cidade-Ativa/
├── cidadeativa-frontend/
│   ├── public/
│   │   └── img/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── index.css
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.ts
│   ├── vercel.json
│   └── README.md
└── .gitignore
```

**Diretórios principais:**

- `components/`: componentes reutilizáveis, como o cabeçalho.
- `pages/`: páginas da aplicação, incluindo login, cadastro, chamados, painéis e páginas institucionais.
- `services/`: funções responsáveis pela comunicação com a API e gerenciamento de dados de autenticação.
- `types/`: definições de tipos TypeScript.
- `public/`: arquivos estáticos e fotografias dos integrantes.
- `App.tsx`: configuração das rotas.
- `index.css`: estilos e regras de responsividade.

## 6. Execução local

### Pré-requisitos

- Node.js e npm instalados.
- Git instalado.
- Editor de código, como Visual Studio Code.
- Conexão com a internet para acessar a API remota.

### Clonar o repositório

```bash
git clone LINK_DO_REPOSITORIO
cd Cidade-Ativa/cidadeativa-frontend
```

### Instalar as dependências

```bash
npm install
```

### Configurar o ambiente

Configure a URL da API Java conforme a variável de ambiente utilizada pelos serviços do frontend.

A URL pública do backend é:

```text
https://cidadeativa-gs.onrender.com
```

Os arquivos `.env` utilizados para configurações locais não devem ser enviados ao GitHub quando contiverem dados sensíveis.

### Iniciar o projeto

```bash
npm run dev
```

A aplicação será disponibilizada no endereço indicado pelo Vite, normalmente:

```text
http://localhost:5173
```

### Gerar a versão de produção

```bash
npm run build
```

O comando executa a verificação TypeScript e gera os arquivos de produção na pasta `dist`.

## 7. Integração com a API Java

O frontend consome a API REST desenvolvida na disciplina de **Domain Driven Design Using Java**, utilizando a Fetch API.

A integração permite trabalhar com dados reais, sem depender de dados simulados para as funcionalidades principais.

Entre as operações realizadas estão:

- Consulta de chamados por meio de requisições GET.
- Cadastro de ocorrências por meio de requisições POST.
- Atualização de informações e status dos chamados.
- Consulta de categorias e regiões.
- Autenticação de usuários.
- Registro da resolução dos atendimentos.

O backend utiliza Java e Oracle Database e está publicado no Render.

**URL da API:**  
https://cidadeativa-gs.onrender.com

## 8. Responsividade e acessibilidade

O CidadeAtiva foi desenvolvido para oferecer navegação em diferentes dispositivos, utilizando layouts flexíveis, grids e regras de responsividade.

As resoluções previstas para validação são:

- Mobile: 390 × 844 px.
- Tablet: 768 × 1024 px.
- Desktop: 1440 × 900 px.

A interface também contempla identificação de campos de formulário, mensagens de erro, estados de carregamento e indicadores visuais de foco para navegação por teclado.

## 9. Integrantes

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

## 10. Links do projeto

| Recurso | Endereço |
|---|---|
| Frontend — Vercel | https://cidade-ativa-gs.vercel.app |
| Backend — Render | https://cidadeativa-gs.onrender.com |
| GitHub — Frontend | ADICIONAR_LINK_DO_REPOSITORIO |
| Vídeo — YouTube | ADICIONAR_LINK_DO_VIDEO |

O vídeo de demonstração da disciplina de Front-end Design Engineering deverá apresentar a aplicação publicada, sua navegação e a integração com a API Java, respeitando a duração máxima de **3 minutos**.

## 11. Contato

Para dúvidas sobre o projeto, sugestões ou informações relacionadas ao desenvolvimento, entre em contato com a equipe **DevForce** por meio da página de Contato da aplicação ou dos perfis profissionais dos integrantes.

**Página de Contato:**  
https://cidade-ativa-gs.vercel.app/contato

**Instituição:** FIAP  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Turma:** 1TDSPY

---

**CidadeAtiva — Global Solution 2026/2 | FIAP — DevForce**
