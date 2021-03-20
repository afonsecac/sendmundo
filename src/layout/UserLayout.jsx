import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container } from "@material-ui/core";
import Header from "components/headers/Header";
import Footer from "components/footer/Footer";

export default function UserLayout() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={false}>
        <Header title="Recarga celular" />
        <main></main>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
