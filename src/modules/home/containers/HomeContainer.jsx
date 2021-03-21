import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import Promorion from "modules/home/components/Promotion";
import BanerPromotion from "styles/imgs/Banner_1.png";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${BanerPromotion})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    padding: 20,
  },
}));

export default function HomeContainer() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid
        container
        direction="column"
        alignItems="stretch"
        className={classes.root}
      >
        <Promorion />
      </Grid>
    </React.Fragment>
  );
}
