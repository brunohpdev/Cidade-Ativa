
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Chamados from "./pages/Chamados";
import DetalhesChamado from "./pages/DetalhesChamado";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/chamados" element={<Chamados />} />
        <Route path="/chamados/:id" element={<DetalhesChamado />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
