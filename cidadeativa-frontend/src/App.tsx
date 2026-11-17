
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import RotaProtegida from "./components/RotaProtegida";
import NaoEncontrado from "./pages/NaoEncontrado";
import AcessoNegado from "./pages/AcessoNegado";

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
    element={
      <RotaProtegida perfil="CIDADAO">
        <NovoChamado />
      </RotaProtegida>
    }
  />

  <Route
    path="/meus-chamados"
    element={
      <RotaProtegida perfil="CIDADAO">
        <MeusChamados />
      </RotaProtegida>
    }
  />

  <Route
    path="/editar-chamado/:id"
    element={
      <RotaProtegida perfil="CIDADAO">
        <EditarChamado />
      </RotaProtegida>
    }
  />

  {/* Area do agente publico */}
  <Route
    path="/painel-agente"
    element={
      <RotaProtegida perfil="AGENTE">
        <PainelAgente />
      </RotaProtegida>
    }
  />

  <Route
    path="/meus-atendimentos"
    element={
      <RotaProtegida perfil="AGENTE">
        <MeusAtendimentos />
      </RotaProtegida>
    }
  />

  <Route
    path="/resolver-chamado/:id"
    element={
      <RotaProtegida perfil="AGENTE">
        <ResolverChamado />
      </RotaProtegida>
    }
  />

  {/* Area administrativa */}
  <Route
    path="/administracao"
    element={
      <RotaProtegida perfil="ADMIN">
        <Administracao />
      </RotaProtegida>
    }
  />

  <Route
    path="/admin/categorias"
    element={
      <RotaProtegida perfil="ADMIN">
        <AdminCategorias />
      </RotaProtegida>
    }
  />

  <Route
    path="/admin/regioes"
    element={
      <RotaProtegida perfil="ADMIN">
        <AdminRegioes />
      </RotaProtegida>
    }
  />

  {/* Acesso negado */}
  <Route
    path="/acesso-negado"
    element={<AcessoNegado />}
  />

  {/* Pagina nao encontrada */}
  <Route
    path="*"
    element={<NaoEncontrado />}
  />
</Routes>


      <Footer />
    </BrowserRouter>
  );
}

export default App;
