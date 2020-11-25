import React, { useState } from "react";

import * as service from "../../services/users";
import AddressFormComponent from "../../components/adrressForm";
import { useProduct } from "../../contexts/cartContext";


import "./form.css";

interface addreess {
  complement: string;
  country: string;
  number: number;
  city: string;
  state: string;
  street: string;
  zipcode: number;
}

const Checkout: React.FC = () => {
  const [endereco, setEndereco] = useState([{} as addreess]);
  const { pagar } = useProduct();


  async function getAddress() {
    const resolve = await service.address();
    setEndereco(resolve);
  }

  if (Object.keys(endereco[0]).length === 0) {
    getAddress();
  }

  return (
    <>
      <div className="row">
        <div className="col-sm-8">
          <div className="row">
            {Object.keys(endereco).map(function (valor, index) {
              console.log(valor);
              return (
                <div className="col-sm-4 mb-1" key={`address-cart-${index}`}>
                  <div className="card address_user">
                    <div className="card-body">
                      <h5 className="card-title"> Endereço {index + 1}</h5>
                      <small>CEP: {endereco[index].zipcode}</small>
                      <p className="card-text">{endereco[index].street}</p>
                      <p className="card-text">{endereco[index].number}</p>
                      <p className="card-text">{endereco[index].complement}</p>
                      <p className="card-text">{endereco[index].city}</p>
                      <p className="card-text">{endereco[index].state}</p>
                      <p className="card-text">{endereco[index].country}</p>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => {}}
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-sm-4">
          <div className="carrinho__total mt-2 p-3">
            <button onClick={pagar.bind(null)} className="btn btn-dark btn-sm">
              Finalizar Compra
            </button>
          </div>
        </div>
      </div>
      <div className="form-address">
        <h3>Cadastro de Endereço</h3>
        <br />
        <h5> Para cadastrar um novo endereço preencha o formulário abaixo: </h5>
        <AddressFormComponent />
      </div>
      <div className="palmeiras">
        <h1>Palmeiras Campeão Paulista 2020!</h1>
      </div>
    </>
  );
};

export default Checkout;
