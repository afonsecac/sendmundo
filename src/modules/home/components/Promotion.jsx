import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  MenuItem,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import CubaFlag from "styles/imgs/flags/cuba.png";

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
}));

const countries = [
  {
    label: "Cuba",
    src: CubaFlag,
    link: " ",
    value: "cu",
    code: "+53",
  },
];

export default function Promotion() {
  const classes = useStyles();

  const [country, setCountry] = useState("cu");

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  const [value, setValue] = useState();
  const handleChangeValue = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Grid container direction="column" alignContent="flex-end" spacing={2}>
        <Grid item>
          <Typography className={classes.title} variant="h4" align="center">
            RECARGA AHORA
          </Typography>
        </Grid>
        <Grid item>
          <Grid container item spacing={1} justify="center">
            <Grid item xs={12} sm={3}>
              <TextField
                name="country"
                size="small"
                value="+53"
                variant="outlined"
                className={classes.textField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <img src={CubaFlag} alt="Flag" width={22} />
                    </InputAdornment>
                  ),
                  className: classes.multilineColor,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                name="phoneNumber"
                size="small"
                value={value}
                label="Numero de telefono"
                onChange={handleChangeValue}
                variant="outlined"
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.inputLabel,
                    focused: "focused",
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircleRoundedIcon />
                    </InputAdornment>
                  ),
                  className: classes.multilineColor,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
