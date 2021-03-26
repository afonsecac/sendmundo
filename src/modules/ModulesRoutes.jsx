import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "components/private-route/PrivateRoute";
import HomeContainer from "modules/home/containers/HomeContainer";
import Login from "modules/auth/containers/Login";
import SignUp from "modules/auth/containers/SignUp";
import Payment from "modules/payment/containers/Payment";
import UserConfirm from "modules/auth/containers/UserConfirm";
import HomeState from "context/home/HomeState";
import PaymentState from "context/payment/PaymentState";

export default function ModulesRoutes() {
  return (
    <>
      <HomeState>
        <Route path="/" exact component={HomeContainer} />
        <Switch>
          <PaymentState>
            <PrivateRoute path="/pay-stepp" exact component={Payment} />
          </PaymentState>
        </Switch>
      </HomeState>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={SignUp} />
      <Route path="/confirm-user" exact component={UserConfirm} />
    </>
  );
}
