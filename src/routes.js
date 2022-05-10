import { UsuarioContext } from "common/context/Usuario";
import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

function Rotas() {
  const [nome, setNome] = useState("");
  const [saldo, setSaldo] = useState(0);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <UsuarioContext.Provider
            value={{
              nome,
              setNome,
              saldo,
              setSaldo,
            }}
          >
            <Login />
          </UsuarioContext.Provider>
        }
      />

      <Route path="/feira" element={<Feira />} />
      <Route path="/carrinho" element={<Carrinho />} />
    </Routes>
  );
}

export default Rotas;
