import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import SendMundo from "styles/imgs/SendMUNDO_LOGO_Fabicon.png";

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage: `url(${SendMundo})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: 180,
    backgroundPositionX: "100%",
    backgroundPositionY: "30%",
    width: "70%",
    padding: "40px 0 40px 0",
  },
  title: {
    fontWeight: 600,
    color: "#828282",
    "&::before": {
      content: "'          '",
      width: 25,
      display: "inline-block",
      height: 4,
      backgroundColor: "#0073a7",
      marginRight: 5,
    },
  },
  titleWWA: {
    fontWeight: 600,
    color: "#0073a7",
  },
}));

export default function WhoWeAre() {
  const classes = useStyles();
  return (
    <Grid container justify="center">
      <Grid container direction="column" className={classes.root} spacing={2}>
        <Grid item>
          <Typography variant="h6" className={classes.title}>
            Quienes somos
          </Typography>
        </Grid>
        <Grid item>
          <Grid item container spacing={5}>
            <Grid item xs={12} sm={5} style={{ marginLeft: 22 }}>
              <Typography variant="h4" className={classes.titleWWA}>
                La via mas facil para enviar recargas
              </Typography>
            </Grid>
            <Grid item item xs={12} sm={6}>
              <Typography
                variant="body1"
                style={{ color: "#828282", fontWeight: 500 }}
              >
                We are able to help you with the latest hight tech solutions,
                thanks to our company culture, which is built an everyday
                learning and self - improvement from each and single task.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
