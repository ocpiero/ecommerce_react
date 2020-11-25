/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { Form } from "@unform/web";
import { SubmitHandler, FormHandles } from "@unform/core";
import * as Yup from "yup";

import Input from "../../form/input";

import "./signIn.css";

interface Log {
  email: string;
  password: string;
}

const initialData = {
  email: "ocpiero@gmail.com",
};

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const formRef = useRef<FormHandles>(null);

  let history = useHistory();
  const handleSignIn: SubmitHandler<Log> = async function (data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Digite um e-mail")
          .required("O email é obrigatorio"),
        password: Yup.string().min(4).required("Senha"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn(data);

      history.push("/dashboard");
    } catch (err) {
      if (err instanceof Yup.ValidationError && formRef.current) {
        const errorMessages: any = {};

        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  };

  return (
    <>
      <div className="login">
        <h5>Login</h5>
        <div className="formulario">
          <Form ref={formRef} initialData={initialData} onSubmit={handleSignIn}>
            <label>E-mail</label>
            <Input type="email" name="email" />
            <label>Senha</label>
            <Input type="password" name="password" />
            <button className="btn btn-dark" type="submit">
              Sign In
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
