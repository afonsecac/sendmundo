import React from "react";
import { Route } from "react-router-dom";
import HomeContainer from "modules/home/containers/HomeContainer";
import Login from "modules/auth/containers/Login";
import SignUp from "modules/auth/containers/SignUp";
import UserConfirm from "modules/auth/containers/UserConfirm";

import AuthState from "context/auth/AuthState";

export default function ModulesRoutes() {
  return (
    <AuthState>
      <Route path="/" exact component={HomeContainer} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={SignUp} />
      <Route path="/confirm-user" exact component={UserConfirm} />
    </AuthState>
  );
}
