
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

function EmConstrucao() {
  return (
    <main className="auth-container">
      <div className="auth-card">
        <h1>Página em desenvolvimento</h1>
        <p>Esta funcionalidade será implementada em breve.</p>
      </div>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/chamados" element={<EmConstrucao />} />
        <Route path="/meus-chamados" element={<EmConstrucao />} />
        <Route path="/painel-agente" element={<EmConstrucao />} />
        <Route path="/administracao" element={<EmConstrucao />} />

        <Route path="*" element={<EmConstrucao />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
