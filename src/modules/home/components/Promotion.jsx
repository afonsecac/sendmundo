import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Button,
  LinearProgress,
} from "@material-ui/core";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import PromotionItem from "modules/home/components/PromotionItem";
import PhoneCodeAutoComplete from "components/autocompletes/PhoneCodeAutoComplete";

import HomeContext from "context/home/HomeContext";
import AuthContext from "context/auth/AuthContext";

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
  } = useContext(HomeContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { navigateToPayFor } = useContext(HomeContext);

  const [value, setValue] = useState();
  const handleChangeValue = (event) => {
    setValue(event.target.value);
  };

  const [callingCode, setCallingCode] = useState("");

  const handlePhoneCodeSelect = (country) => {
    if (country) {
      setCallingCode(country.callingCodes[0]);
      getPromotions({ isHome: true, countryCode: country.alpha3Code });
    } else {
      setCallingCode("");
      clearPromotions();
    }
  };

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
        <Grid item>
          <Grid container item spacing={1} justify="center">
            <Grid item xs={12} sm={4}>
              <PhoneCodeAutoComplete handleChange={handlePhoneCodeSelect} />
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                fullWidth
                name="phoneNumber"
                size="small"
                value={value || ""}
                placeholder="Numero de telefono"
                onChange={handleChangeValue}
                variant="outlined"
                className={classes.textField}
                // InputLabelProps={{
                //   classes: {
                //     root: classes.inputLabel,
                //     focused: "focused",
                //   },
                // }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircleRoundedIcon style={{ color: "#0073a7" }} />
                    </InputAdornment>
                  ),
                  // className: classes.multilineColor,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            {promotions.map((promotion, index) => (
              <PromotionItem promotion={promotion} key={index} />
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <Typography
            variant="body1"
            align="center"
            style={{ color: "#0073a7" }}
          >
            * El bono es transferible y tiene una vigencia de 30 dias
          </Typography>
        </Grid>
        <Grid item>
          <Grid container justify="center">
            <Button
              variant="outlined"
              size="large"
              className={classes.buttonSend}
              onClick={() =>
                navigateToPayFor(`+${callingCode || "53"}${value || ""}`)
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
