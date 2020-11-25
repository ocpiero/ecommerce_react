import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { AuthProvider } from "./contexts/auth";
import { ProductProvider } from "./contexts/cartContext";

import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/aboutUs";
import SignIn from "./pages/SingIn";
import BuySuccess from "./pages/BuySucess";
import Hamburger from "./components/hamburger";
import Header from "./components/header";
import Checkout from "./pages/Checkout";
import "./App.css";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !!localStorage.getItem("@RNAuth:token") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/signIn", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <div className="wrapper">
          <AuthProvider>
            <Switch>
              <Route exact path="/" component={() => <AboutUs />} />
              <Route exact path="/signIn" component={() => <SignIn />} />
              <Route exact path="/hambuger" component={() => <Hamburger />} />
              <Route path="/buySuccess" component={() => <BuySuccess />} />
              <ProductProvider>
                <PrivateRoute
                  path="/dashboard"
                  component={() => <Dashboard />}
                />
                <PrivateRoute path="/checkout" component={() => <Checkout />} />
              </ProductProvider>
            </Switch>
          </AuthProvider>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
