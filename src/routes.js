import { CarrinhoProvider } from "common/context/Carrinho";
import { PagamentoProvider } from "common/context/Pagamento";
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
            <CarrinhoProvider>
              <PagamentoProvider>
                <Feira />
              </PagamentoProvider>
            </CarrinhoProvider>
          </UsuarioProvider>
        }
      />

      <Route
        path="/carrinho"
        element={
          <UsuarioProvider>
            <CarrinhoProvider>
              <PagamentoProvider>
                <Carrinho />
              </PagamentoProvider>
            </CarrinhoProvider>
          </UsuarioProvider>
        }
      />
    </Routes>
  );
}

export default Rotas;
