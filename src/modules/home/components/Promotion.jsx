import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  Button,
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
  root: {
    minWidth: 170,
    border: "2px solid #0073a7",
  },
  cardContent: {
    color: "#0073a7",
  },
  promotionCardLetter: {
    color: "#f98400",
  },
  cardFooter: {
    backgroundColor: "#0073a7",
    color: "#fff",
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

const promotionList = [
  { name: "Reciben", price: 1500, balance: 500, bono: 1000, pay: 19.99 },
  { name: "Reciben", price: 3000, balance: 1000, bono: 2000, pay: 39.99 },
  { name: "Reciben", price: 4500, balance: 1500, bono: 3000, pay: 59.99 },
];

export default function Promotion() {
  const classes = useStyles();

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
        <Grid item>
          <Grid container justify="space-between" spacing={1}>
            {promotionList.map((promotion, index) => (
              <Grid item key={index}>
                <Card className={classes.root} elevation={0}>
                  <CardActionArea>
                    <CardContent className={classes.cardContent}>
                      <Typography
                        align="center"
                        variant="body1"
                        style={{ fontWeight: 600 }}
                      >
                        {promotion.name}
                      </Typography>
                      <Grid
                        container
                        justify="center"
                        className={classes.promotionCardLetter}
                      >
                        <Typography
                          align="left"
                          variant="h5"
                          style={{ fontWeight: 500, fontSize: 16 }}
                        >
                          $
                        </Typography>
                        <Typography
                          align="center"
                          variant="h5"
                          style={{ fontWeight: 800 }}
                        >
                          {promotion.price}
                        </Typography>
                        <Typography
                          align="right"
                          variant="h5"
                          style={{
                            fontWeight: 600,
                            fontSize: 14,
                            marginLeft: 5,
                          }}
                        >
                          CUP
                        </Typography>
                      </Grid>
                      <Typography align="center" variant="body1">
                        + {promotion.balance} cup de saldo
                      </Typography>
                      <Typography align="center" variant="body1">
                        + {promotion.bono} cup de bono
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.cardFooter}>
                      <Grid container justify="center">
                        <Typography
                          align="center"
                          variant="body1"
                          style={{ fontWeight: 600 }}
                        >
                          Pagas $ {promotion.pay} USD
                        </Typography>
                      </Grid>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
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
            >
              ENVIAR RECARGA
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
