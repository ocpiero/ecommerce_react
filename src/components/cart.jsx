import React from "react";
import { Link } from "react-router-dom";
import "../navbar/styles.css";

export default function CarrinhoComponent(props) {
  return Object.keys(props.itens).length !== 0 ? (
    <div className="carrinho">
      <div className="carrinho__itens">
        {Object.keys(props.itens).map(function (produtoId, index) {
          return (
            <div className="card carrinho__item" key={`item-carrinho-${index}`}>
              <div className="card-body">
                <h5 className="card=title">{props.itens[produtoId].nome}</h5>
                <p className="card-text">
                  Preço unidade: R${props.itens[produtoId].preco} | Quantidade:{" "}
                  {props.itens[produtoId].quantidade}
                </p>
                <p className="card-text">
                  Valor: R$
                  {(
                    props.itens[produtoId].preco *
                    props.itens[produtoId].quantidade
                  ).toFixed(2)}
                </p>
                <button
                  onClick={props.onRemoveItemCarrinho.bind(null, produtoId)}
                  className="btn btn-danger btn-sm"
                >
                  Remover
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="carrinho__total mt-2 p-3">
        <h6>
          Total: <strong>R${props.onValorTotal(props.itens)}</strong>
        </h6>
        <ul className="navbar">
          <li>
            <Link to="/checkout">Finalizar Compra</Link>
          </li>
        </ul>
      </div>
    </div>
  ) : (
    <div className="carrinho">
      <div className="carrinho__itens">
        {Object.keys(props.itens).map(function (produtoId, index) {
          return (
            <div className="card carrinho__item" key={`item-carrinho-${index}`}>
              <div className="card-body">
                <h5 className="card=title">{props.itens[produtoId].nome}</h5>
                <p className="card-text">
                  Preço unidade: R${props.itens[produtoId].preco} | Quantidade:{" "}
                  {props.itens[produtoId].quantidade}
                </p>
                <p className="card-text">
                  Valor: R$
                  {(
                    props.itens[produtoId].preco *
                    props.itens[produtoId].quantidade
                  ).toFixed(2)}
                </p>
                <button
                  onClick={props.onRemoveItemCarrinho.bind(null, produtoId)}
                  className="btn btn-danger btn-sm"
                >
                  Remover
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
