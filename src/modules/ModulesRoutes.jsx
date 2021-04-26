import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "components/private-route/PrivateRoute";
import HomeContainer from "modules/home/containers/HomeContainer";
import Login from "modules/auth/containers/Login";
import SignUp from "modules/auth/containers/SignUp";
import Payment from "modules/payment/containers/Payment";
import UserConfirm from "modules/auth/containers/UserConfirm";
import SendCode from "modules/auth/containers/SendCode";
import RecoverPassword from "modules/auth/containers/RecoverPassword";
import ContactContainer from "modules/contact/containers/ContactContainer";
import OrderContainer from "modules/order/containers/OrderContainer";

import HomeState from "context/home/HomeState";
import PaymentState from "context/payment/PaymentState";
import ContactState from "context/contacts/ContactState";
import OrderState from "context/order/OrderState";

export default function ModulesRoutes() {
  return (
    <>
      <HomeState>
        <Route path="/" exact component={HomeContainer} />
        <ContactState>
          <Switch>
            <PaymentState>
              <PrivateRoute path="/pay-stepp" exact component={Payment} />
            </PaymentState>
          </Switch>
          <Switch>
            <PrivateRoute path="/contacts" exact component={ContactContainer} />
          </Switch>
        </ContactState>
        <Switch>
          <OrderState>
            <PrivateRoute path="/orders" exact component={OrderContainer} />
          </OrderState>
        </Switch>
      </HomeState>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={SignUp} />
      <Route path="/confirm-user" exact component={UserConfirm} />
      <Route path="/send-code" exact component={SendCode} />
      <Route path="/recover-password" exact component={RecoverPassword} />
    </>
  );
}
