import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import PaymentStepper from "modules/payment/components/PaymentStepper";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import "../../../App.css";

const promise = loadStripe("pk_test_TjviJqNXIhnu3tdZg6q0ZyCb003sMZq8dw");

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 30,
  },
}));

export default function Paymant() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Elements stripe={promise}>
        <Grid
          container
          direction="column"
          alignItems="stretch"
          className={classes.root}
        >
          <Grid item>
            <PaymentStepper />
          </Grid>
        </Grid>
      </Elements>
    </React.Fragment>
  );
}
