import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "components/headers/Header";
import Footer from "components/footer/Footer";
import ModulesRoutes from "modules/ModulesRoutes";

export default function UserLayout() {
  return (
    <React.Fragment>
      <Router>
        <Header title="Recarga celular" />
        <main>
          <Switch>
            <ModulesRoutes />
          </Switch>
        </main>
        <Footer />
      </Router>
    </React.Fragment>
  );
}
