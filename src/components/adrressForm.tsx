import React, { useRef, useState } from "react";
import { Form } from "@unform/web";
import { SubmitHandler, FormHandles } from "@unform/core";
import * as Yup from "yup";
import cep from "cep-promise";
import Input from "../form/input";
import * as serviceUser from "../services/users";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/auth";

interface Log {
  cep: string;
  city: string;
  neighborhood: string;
  state: string;
  street: string;
  number: number;
  complement: string;
}

interface ServicoCEP {
  cep: string;
  city: string;
  neighborhood: string;
  state: string;
  street: string;
}

const AddressFormComponent: React.FC = () => {
  const [name, setName] = useState("");
  const [servico, setServico] = useState({} as ServicoCEP);
  let history = useHistory();

  const { user } = useAuth();

  let formRefStreet = useRef<FormHandles>(null);

  if (name.length === 9 && JSON.stringify(servico) === "{}") {
    cep(
      name.replace(/[&/\\#,+()$~%.'":*?<>{}-]/g, "").toString()
    ).then((resolve: ServicoCEP) => setServico(resolve));
  }

  function formatar(mascara: string, documento: string) {
    var i = documento.length;
    var saida = mascara.substring(0, 1);
    var texto = mascara.substring(i);
    var trace = "-";

    setName(documento.replace(/[&/\\#,+()$~%.'":*?<>{}]/g, ""));

    if (texto.substring(0, 1) !== saida) {
      if (documento.length <= 5) {
        documento = documento + trace;

        setName(documento);
      } else {
        setName(documento.replace(/[&/\\#,+()$~%.'":*?<>{}]/g, ""));
      }
    }

    return documento;
  }
  const handleTest: SubmitHandler<Log> = async function (data) {
    console.log("servico AddressForm: ", servico);
    console.log("data AddressForm: ", data);
    const formAddress = {
      email: user?.email,
      address: {
        street: servico.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: servico.city,
        state: servico.state,
        country: "Brasil",
        zipcode: servico.cep,
      },
    };
    await serviceUser.ppk(formAddress);

    history.push("/buySuccess");
  };

  const handleAddress: SubmitHandler<Log> = async function (data) {
    try {
      const schema = Yup.object().shape({
        cep: Yup.string().length(9).required("CEP obrigatorio"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError && formRefStreet.current) {
        const errorMessages: any = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRefStreet.current.setErrors(errorMessages);
      }
    }
  };

  return (
    <div className="cadastro">
      <div className="formulario">
        <a
          href="http://www.buscacep.correios.com.br/sistemas/buscacep/buscaCep.cfm"
          target="blank"
        >
          {" "}
          Encontrar meu CEP
        </a>
        <Form ref={formRefStreet} onSubmit={() => {}}>
          <label>CEP</label>
          <Input
            type="text"
            name="cep"
            value={name}
            placeholder="XXXXX-XXX"
            pattern="[0-9]{5}-[0-9]{3}"
            mask="[0-9]{5}-[0-9]{3}"
            onChange={(e: any) => formatar("#####-###", e.target.value)}
          />
        </Form>
        <div id="address">
          {name.length >= 9 ? (
            <Form ref={formRefStreet} onSubmit={handleTest}>
              <label>Rua</label>
              <Input type="text" name="rua" value={servico.street} />
              <label>Número</label>
              <Input type="text" name="number" />
              <label>Complemento</label>
              <Input type="text" name="complement" />
              <label>Bairro</label>
              <Input type="text" name="bairro" value={servico.neighborhood} />
              <label>Cidade</label>
              <Input type="text" name="cidade" value={servico.city} />
              <label>Estado</label>
              <Input type="text" name="estado" value={servico.state} />
              <button className="btn btn-dark" type="submit">
                Continuar
              </button>
            </Form>
          ) : (
            <Form ref={formRefStreet} onSubmit={handleAddress}>
              <label>Rua</label>
              <Input type="text" name="rua" placeholder="Digite seu endereço" />
              <label>Bairro</label>
              <Input
                type="text"
                name="bairro"
                placeholder="Digite seu Bairro"
              />
              <label>Cidade</label>
              <Input
                type="text"
                name="cidade"
                placeholder="Digite sua Cidade"
              />
              <label>Estado</label>
              <Input
                type="text"
                name="estado"
                placeholder="Digite seu Estado"
              />
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressFormComponent;
