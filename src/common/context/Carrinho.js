import { createContext, useContext, useEffect, useState } from "react";
import { usePagamentoContext } from "./Pagamento";
import { UsuarioContext } from "./Usuario";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [quantidadeProdutos, setQuantidadeProdutos] = useState(0);
  const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        setCarrinho,
        quantidadeProdutos,
        setQuantidadeProdutos,
        valorTotalCarrinho,
        setValorTotalCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinhoContext = () => {
  const {
    carrinho,
    setCarrinho,
    quantidadeProdutos,
    setQuantidadeProdutos,
    valorTotalCarrinho,
    setValorTotalCarrinho,
  } = useContext(CarrinhoContext);

  const { formaPagamento } = usePagamentoContext();

  const { setSaldo } = useContext(UsuarioContext);

  const mudarQuantidade = (id, quantidade) =>
    carrinho.map((itemDoCarrinho) => {
      if (itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
      return itemDoCarrinho;
    });

  function adicinarProduto(novoProduto) {
    const temOProduto = carrinho.some(
      (itemDoCarrinho) => itemDoCarrinho.id === novoProduto.id
    );
    let novoCarrinho = [...carrinho];
    if (!temOProduto) {
      novoProduto.quantidade = 1;
      novoCarrinho.push(novoProduto);
      return setCarrinho(novoCarrinho);
    }
    novoCarrinho = mudarQuantidade(novoProduto.id, 1);
    setCarrinho(novoCarrinho);
  }

  function removerProduto(id) {
    const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
    const ehOUltimo = produto === 1;
    if (ehOUltimo) {
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
      );
    }
    setCarrinho(mudarQuantidade(id, -1));
  }

  function efetuarCompra() {
    setCarrinho([]);
    setSaldo((saldoAtual) => saldoAtual - valorTotalCarrinho);
  }

  useEffect(() => {
    const { novoTotalProduto, novaQuantidadeProduto } = carrinho.reduce(
      (contador, produto) => ({
        novaQuantidadeProduto:
          contador.novaQuantidadeProduto + produto.quantidade,
        novoTotalProduto:
          contador.novoTotalProduto + produto.valor * produto.quantidade,
      }),
      {
        novaQuantidadeProduto: 0,
        novoTotalProduto: 0,
      }
    );
    setQuantidadeProdutos(novaQuantidadeProduto);
    setValorTotalCarrinho(novoTotalProduto * formaPagamento.juros);
  }, [carrinho, setQuantidadeProdutos, setValorTotalCarrinho, formaPagamento]);

  return {
    carrinho,
    setCarrinho,
    adicinarProduto,
    removerProduto,
    quantidadeProdutos,
    setQuantidadeProdutos,
    valorTotalCarrinho,
    efetuarCompra,
  };
};
