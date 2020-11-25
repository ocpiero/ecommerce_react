import React, { createContext, useState, useContext } from "react";
import * as services from "../services/products";

interface prod {
  id: string;
  slug: string;
  nome: string;
  imagem: string;
  preco: string;
  descricao: string;
  estoque: number;
  categoria: string;
}

interface paypal {
  name: string;
  description: string;
  currency: string;
  quantity: number;
  sku: string;
  price: string;
}

interface Pagination {
  anterior: string | null;
  proxima: string | null;
  ultima: string;
  atual: string;
}

interface CartContextData {
  produtosLista: any;
  addCarrinho(produto: prod): void;
  removeItemCarrinho(produtoId: string): void;
  carrinhoItens: prod;
  pagar(payPal: any): Promise<any>;
  valorTotal(carrinhoItens: any): void;
  link: string | null;
  pagina: Pagination;
  listaProdutos(pagina: any): Promise<void>;
  categoria: any;
  categorias: any;
}

const ProductContext = createContext<CartContextData>({} as CartContextData);

export const ProductProvider: React.FC = ({ children }) => {
  const [produtosLista, setProdutosLista] = useState<any | null>(null);
  const [pagina, setPagina] = useState<any | null>(null);
  const [categoria, setCategoria] = useState<string | null>("Geral");
  const [categorias, setCategorias] = useState<any | null>(["Geral"]);

  async function listaCategorias() {
    const res = await services.pegaCategoria();
    res.data.push("Geral");
    setCategorias(res.data);
  }

  async function listaProdutos(
    pagina: any = 1,
    categoria: any = "Geral"
  ): Promise<void> {
    if (categoria === "Geral") {
      const response = await services.pegaProdutoPorPagina(pagina);

      let paginacao = {
        anterior: response.prev || null,
        proxima: response.next || null,
        primeira: response.first,
        ultima: response.last,
        atual: pagina,
      };

      setPagina(paginacao);
      setProdutosLista(response.data);
      setCategoria("Geral");
    } else {
      const response = await services.pegaProdutoPorCategoria(categoria);
      let paginacao = {
        anterior: response.prev || null,
        proxima: response.next || null,
        primeira: response.first,
        ultima: response.last,
        atual: pagina,
      };

      setPagina(paginacao);
      setProdutosLista(response.data);
      setCategoria(categoria);
    }
  }

  if (!produtosLista) {
    listaProdutos(1, categoria);
    listaCategorias();
  }

  const [carrinhoItens, addItemCarrinho] = useState<any>({});
  const [paypal1, setPayPal] = useState<any>({
    items: [],
    amount: {
      currency: "BRL",
      total: 0,
    },
  });

  function valorTotal(carrinhoItens: any) {
    return Object.keys(carrinhoItens).reduce(function (acc, produtoId) {
      return (
        acc +
        carrinhoItens[produtoId].preco * carrinhoItens[produtoId].quantidade
      );
    }, 0);
  }

  function addCarrinho(produto: prod) {
    if (!carrinhoItens[produto.id]) {
      addItemCarrinho({
        ...carrinhoItens,
        [produto.id]: {
          ...produto,
          quantidade: 1,
        },
      });
      setPayPal({
        items: [
          ...paypal1.items,
          {
            name: produto.nome,
            description: produto.descricao,
            currency: "BRL",
            quantity: 1,
            sku: produto.id,
            price: produto.preco,
          },
        ],
        amount: {
          currency: "BRL",
          total: valorTotal(carrinhoItens) + parseInt(produto.preco),
        },
        description: "O melhor do mundo",
      });
    } else {
      addItemCarrinho({
        ...carrinhoItens,
        [produto.id]: {
          ...produto,
          quantidade: ++carrinhoItens[produto.id].quantidade,
        },
      });
      setPayPal({
        ...paypal1,
        items: Object.keys(carrinhoItens).reduce((acc: any, produtoId) => {
          acc.push({
            name: carrinhoItens[produtoId].nome,
            description: carrinhoItens[produtoId].descricao,
            currency: "BRL",
            quantity: carrinhoItens[produtoId].quantidade,
            sku: carrinhoItens[produtoId].id,
            price: carrinhoItens[produtoId].preco,
          });
          return acc;
        }, []),
        amount: {
          currency: "BRL",
          total: valorTotal(carrinhoItens),
        },
      });
    }
  }

  function removeItemCarrinho(produtoId: string) {
    if (carrinhoItens[produtoId].quantidade <= 1) {
      delete carrinhoItens[produtoId];
      addItemCarrinho({ ...carrinhoItens });

      setPayPal({
        ...paypal1,
        items: Object.keys(carrinhoItens).reduce((acc: any, produtoId) => {
          acc.push({
            name: carrinhoItens[produtoId].nome,
            description: carrinhoItens[produtoId].descricao,
            currency: "BRL",
            quantity: carrinhoItens[produtoId].quantidade,
            sku: carrinhoItens[produtoId].id,
            price: carrinhoItens[produtoId].preco,
          });
          return acc;
        }, []),
        amount: {
          currency: "BRL",
          total: valorTotal(carrinhoItens),
        },
      });
    } else {
      addItemCarrinho({
        ...carrinhoItens,
        [produtoId]: {
          ...carrinhoItens[produtoId],
          quantidade: --carrinhoItens[produtoId].quantidade,
        },
      });

      setPayPal({
        ...paypal1,
        items: Object.keys(carrinhoItens).reduce((acc: any, produtoId) => {
          acc.push({
            name: carrinhoItens[produtoId].nome,
            description: carrinhoItens[produtoId].descricao,
            currency: "BRL",
            quantity: carrinhoItens[produtoId].quantidade,
            sku: carrinhoItens[produtoId].id,
            price: carrinhoItens[produtoId].preco,
          });
          return acc;
        }, []),
        amount: {
          currency: "BRL",
          total: valorTotal(carrinhoItens),
        },
      });
    }
  }

  const [link, addLink] = useState<any>(null);

  async function pagar() {
    return services.enviaPayPal(paypal1).then((res) => addLink(res));
  }

  console.log(link);
  return (
    <ProductContext.Provider
      value={{
        produtosLista,
        addCarrinho,
        removeItemCarrinho,
        carrinhoItens,
        pagar,
        valorTotal,
        link,
        pagina,
        listaProdutos,
        categoria,
        categorias,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export function useProduct() {
  const productContext = useContext(ProductContext);

  return productContext;
}
