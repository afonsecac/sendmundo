import React from "react";
import Header from "components/headers/Header";
import Footer from "components/footer/Footer";
import ModulesRoutes from "modules/ModulesRoutes";

export default function UserLayout() {
  return (
    <React.Fragment>
      <Header title="Recarga celular" />
      <main>
        <ModulesRoutes />
      </main>
      <Footer />
    </React.Fragment>
  );
}
