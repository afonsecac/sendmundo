import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import Promorion from "modules/home/components/Promotion";
import WhoWeAre from "modules/home/components/WhoWeAre";
import CommonQuestion from "modules/home/components/CommonQuestion";
import BanerPromotion from "styles/imgs/Banner_1.png";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 8,
  },
  promotionBG: {
    backgroundColor: "#e9f6f8",
    backgroundImage: `url(${BanerPromotion})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    padding: "20px 0 20px 0",
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
        <Grid item className={classes.promotionBG}>
          <Promorion />
        </Grid>
        <Grid item>
          <WhoWeAre />
        </Grid>
        <Grid item>
          <CommonQuestion />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
