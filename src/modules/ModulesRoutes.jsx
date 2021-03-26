import React from "react";
import { Route } from "react-router-dom";
import HomeContainer from "modules/home/containers/HomeContainer";
import Login from "modules/auth/containers/Login";
import SignUp from "modules/auth/containers/SignUp";
import UserConfirm from "modules/auth/containers/UserConfirm";
import HomeState from "context/home/HomeState";

export default function ModulesRoutes() {
  return (
    <>
      <HomeState>
        <Route path="/" exact component={HomeContainer} />
      </HomeState>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={SignUp} />
      <Route path="/confirm-user" exact component={UserConfirm} />
    </>
  );
}
