import { UsuarioProvider } from "common/context/Usuario";
import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";
import { Routes, Route } from "react-router-dom";

function Rotas() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <UsuarioProvider>
            <Login />
          </UsuarioProvider>
        }
      />

      <Route path="/feira" element={<Feira />} />

      <Route path="/carrinho" element={<Carrinho />} />
    </Routes>
  );
}

export default Rotas;
