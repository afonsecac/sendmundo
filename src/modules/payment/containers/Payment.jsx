import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import PaymentStepper from "modules/payment/components/PaymentStepper";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 30,
  },
}));

export default function Paymant() {
  const classes = useStyles();
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
