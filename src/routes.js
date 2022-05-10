import { CarrinhoProvider } from "common/context/Carrinho";
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

      <Route
        path="/feira"
        element={
          <UsuarioProvider>
            <Feira />
          </UsuarioProvider>
        }
      />
      

      <Route
        path="/carrinho"
        element={
          <CarrinhoProvider>
            <Carrinho />
          </CarrinhoProvider>
        }
      />

    </Routes>
  );
}

export default Rotas;
