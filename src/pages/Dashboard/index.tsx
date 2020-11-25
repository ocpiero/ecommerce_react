import React from "react";
import { useAuth } from "../../contexts/auth";
import { useProduct } from "../../contexts/cartContext";
import { useHistory } from "react-router-dom";
import ProdutoComponent from "../../components/product";
import ListaProdutosComponent from "../../components/productsList";
import CarrinhoComponent from "../../components/cart";
import PaginationComponent from "../../components/pagination";
import CategoriaComponent from "../../components/categories";
import "./loja.css";

interface prod {
  categoria: string;
  descricao: string;
  estoque: number;
  id: string;
  imagem: string;
  nome: string;
  preco: string;
  slug: string;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  let history = useHistory();

  function handleSignOut() {
    history.push("/");

    signOut();
  }

  const {
    produtosLista,
    addCarrinho,
    removeItemCarrinho,
    carrinhoItens,
    pagar,
    valorTotal,
    pagina,
    listaProdutos,
    categoria,
    categorias,
  } = useProduct();

  const MaiaBing = {
    categoria: categoria,
    categorias: categorias,
  };

  return (
    <>
      <React.Fragment>
        <div className="loja">
          <div className="logOut">
            <div className="col-sm-3 ">
              <div className="card-body">
                <small>Seja bem vindo,</small>
                <h5 className="card-title">{user?.name}</h5>
                <button className="btn btn-danger" onClick={handleSignOut}>
                  Log off
                </button>
              </div>
            </div>
          </div>
          <br />
          <CategoriaComponent {...MaiaBing} onClick={listaProdutos} />
          <PaginationComponent
            {...pagina}
            {...MaiaBing}
            onClick={listaProdutos}
          />
          <div className="row">
            <div className="col-sm-8">
              <ListaProdutosComponent>
                {!produtosLista ? (
                  <h1>Aguarde...</h1>
                ) : (
                  produtosLista.map((produto: prod, index: number) => (
                    <ProdutoComponent
                      item={produto}
                      onAddCarrinho={addCarrinho}
                      key={`produto-${index}`}
                    />
                  ))
                )}
              </ListaProdutosComponent>
            </div>
            <div className="col-sm-4">
              <CarrinhoComponent
                itens={carrinhoItens}
                onRemoveItemCarrinho={removeItemCarrinho}
                onComprar={pagar}
                onValorTotal={valorTotal}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    </>
  );
};

export default Dashboard;
