import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "components/headers/Header";
import Footer from "components/footer/Footer";
import ModulesRoutes from "modules/ModulesRoutes";
import AuthState from "context/auth/AuthState";

export default function UserLayout() {
  return (
    <React.Fragment>
      <Router>
        <AuthState>
          <Header title="Recarga celular" />
          <main>
            <Switch>
              <ModulesRoutes />
            </Switch>
          </main>
          <Footer />
        </AuthState>
      </Router>
    </React.Fragment>
  );
}
