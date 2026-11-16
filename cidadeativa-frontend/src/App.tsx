
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

// Paginas principais
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

// Paginas publicas
import Chamados from "./pages/Chamados";
import DetalhesChamado from "./pages/DetalhesChamado";

// Paginas do cidadao
import NovoChamado from "./pages/NovoChamado";
import MeusChamados from "./pages/MeusChamados";
import EditarChamado from "./pages/EditarChamado";

// Paginas do agente
import PainelAgente from "./pages/PainelAgente";
import MeusAtendimentos from "./pages/MeusAtendimentos";
import ResolverChamado from "./pages/ResolverChamado";

// Paginas do administrador
import Administracao from "./pages/Administracao";
import AdminCategorias from "./pages/AdminCategorias";
import AdminRegioes from "./pages/AdminRegioes";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* Paginas principais */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Consulta publica */}
        <Route path="/chamados" element={<Chamados />} />

        <Route
          path="/chamados/:id"
          element={<DetalhesChamado />}
        />

        {/* Area do cidadao */}
        <Route
          path="/novo-chamado"
          element={<NovoChamado />}
        />

        <Route
          path="/meus-chamados"
          element={<MeusChamados />}
        />

        <Route
          path="/editar-chamado/:id"
          element={<EditarChamado />}
        />

        {/* Area do agente publico */}
        <Route
          path="/painel-agente"
          element={<PainelAgente />}
        />

        <Route
          path="/meus-atendimentos"
          element={<MeusAtendimentos />}
        />

        <Route
          path="/resolver-chamado/:id"
          element={<ResolverChamado />}
        />

        {/* Area administrativa */}
        <Route
          path="/administracao"
          element={<Administracao />}
        />

        <Route
          path="/admin/categorias"
          element={<AdminCategorias />}
        />

        <Route
          path="/admin/regioes"
          element={<AdminRegioes />}
        />

        {/* Pagina nao encontrada */}
        <Route
          path="*"
          element={
            <main className="ca-pagina">
              <h1>Pagina nao encontrada</h1>
              <p>O endereco informado nao existe.</p>
            </main>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
