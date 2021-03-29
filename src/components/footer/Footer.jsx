import React from "react";
import { Grid, Typography, Box, Link } from "@material-ui/core";
import visa from "styles/imgs/visa.png";
import mc from "styles/imgs/MC.png";
import ae from "styles/imgs/AE.png";
import dn from "styles/imgs/dn.png";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      style={{ color: "#fff", fontWeight: 600 }}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        SENDMUNDO
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default function Footer() {
  return (
    <div style={{ backgroundColor: "#0073a7", padding: 20 }}>
      <Grid
        container
        spacing={5}
        justify="center"
        alignItems="center"
        style={{ paddingTop: 15 }}
      >
        <Grid item>
          <Typography
            variant="h6"
            style={{ color: "#fff", fontWeight: 600 }}
            gutterBottom
          >
            Politica de privacidad
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="h6"
            style={{ color: "#fff", fontWeight: 600 }}
            color="textPrimary"
            gutterBottom
          >
            Terminos y condiciones
          </Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={1}
            justify="space-around"
            alignItems="center"
          >
            <Grid item>
              <Typography
                variant="h6"
                color="textPrimary"
                gutterBottom
                align="center"
                style={{ color: "#fff", fontWeight: 600 }}
              >
                Aceptamos pagos con:
              </Typography>
            </Grid>
            <Grid item>
              <img src={visa} alt="visa" width={40} />
              <img src={ae} alt="ae" width={40} />
              <img src={dn} alt="dn" width={40} />
              <img src={mc} alt="mc" width={40} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box mt={4}>
        <Copyright />
      </Box>
    </div>
  );
}
