import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import OrdersList from "modules/order/components/OrdersList";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 8,
  },
}));

export default function OrderContainer() {
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
          <OrdersList />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
