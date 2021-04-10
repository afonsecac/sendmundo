import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, LinearProgress, Typography } from "@material-ui/core";
import PromotionItem from "modules/home/components/PromotionItem";
import PhoneCodeAutoComplete from "components/autocompletes/PhoneCodeAutoComplete";

import HomeContext from "context/home/HomeContext";
import isEmpty from "validations/is-empty";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 600,
    color: "#3d3078",
  },
  formControl: {
    minWidth: 120,
  },
  textField: {
    [`& fieldset`]: {
      borderRadius: 15,
      border: "2px solid #0073a7",
    },
  },
  multilineColor: {
    color: "#0073a7",
  },
  inputLabel: {
    color: "#0073a7",
    "&.focused": {
      color: "#0073a7",
    },
  },
  buttonSend: {
    color: "#fff",
    backgroundColor: "#ff9300",
    fontWeight: 600,
    width: 260,
    "&:hover": {
      color: "#fff",
      backgroundColor: "#ff9300",
    },
  },
}));

export default function Promotion() {
  const classes = useStyles();
  const {
    loadingPromotions,
    promotions,
    getPromotions,
    clearPromotions,
    country,
    handleCountry,
  } = useContext(HomeContext);
  const { navigateToPayFor } = useContext(HomeContext);

  const handlePhoneCodeSelect = (countryP) => {
    handleCountry(countryP);
  };

  useEffect(() => {
    if (!isEmpty(country)) {
      getPromotions({ isHome: true, countryCode: country.alpha3Code });
    } else {
      clearPromotions();
    }
  }, [clearPromotions, country, getPromotions]);

  return (
    <>
      <Grid container direction="column" alignContent="flex-end" spacing={2}>
        <Grid item style={{ height: 5 }}>
          <LinearProgress hidden={!loadingPromotions} />
        </Grid>
        <Grid item>
          <Typography className={classes.title} variant="h4" align="center">
            RECARGA AHORA
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container justify="flex-start">
            <Grid item xs style={{ maxWidth: 400 }}>
              <PhoneCodeAutoComplete
                handleChange={handlePhoneCodeSelect}
                country={country}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} justify="flex-start">
            {promotions.length > 0 &&
              promotions.map((promotion, index) => (
                <PromotionItem promotion={promotion} key={index} />
              ))}
            <Grid item xs>
              {promotions.length === 0 && (
                <Typography
                  variant="body1"
                  align="center"
                  style={{ color: "#0073a7" }}
                >
                  Seleccione un país para mostrar las ofertas correspondientes.
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justify="center">
            <Button
              variant="outlined"
              size="large"
              className={classes.buttonSend}
              onClick={() =>
                navigateToPayFor(
                  !isEmpty(country) ? `+${country?.callingCodes[0]}` : "+53"
                )
              }
            >
              ENVIAR RECARGA
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
