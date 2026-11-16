
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Chamados from "./pages/Chamados";
import DetalhesChamado from "./pages/DetalhesChamado";

import NovoChamado from "./pages/NovoChamado";
import MeusChamados from "./pages/MeusChamados";
import EditarChamado from "./pages/EditarChamado";

function EmConstrucao() {
  return (
    <main className="auth-container">
      <div className="auth-card">
        <h1>Página em desenvolvimento</h1>
        <p>
          Esta funcionalidade será implementada em breve.
        </p>
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        {/* PÁGINAS PRINCIPAIS */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* CONSULTA PÚBLICA DE CHAMADOS */}
        <Route path="/chamados" element={<Chamados />} />
        <Route
          path="/chamados/:id"
          element={<DetalhesChamado />}
        />

        {/* FUNCIONALIDADES DO CIDADÃO */}
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

        {/* FUNCIONALIDADES FUTURAS */}
        <Route
          path="/painel-agente"
          element={<EmConstrucao />}
        />
        <Route
          path="/administracao"
          element={<EmConstrucao />}
        />

        {/* PÁGINAS NÃO ENCONTRADAS */}
        <Route
          path="*"
          element={
            <main className="auth-container">
              <div className="auth-card">
                <h1>Página não encontrada</h1>
                <p>O endereço informado não existe.</p>
              </div>
            </main>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
