import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CardMedia,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { MonetizationOn } from "@material-ui/icons";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import * as moment from "moment";

import FormStripeElement from "./FormStripeElement";
import PaymentContext from "../../../context/payment/PaymentContext";
import HomeContext from "../../../context/home/HomeContext";

const useStyles = makeStyles((theme) => ({
  "@global": {
    form: {
      width: "30vw",
      alignSelf: "center",
      boxShadow:
        "0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)",
      borderRadius: 7,
      padding: 40,
      minWidth: 550,
    },
    ".card": {
      borderRadius: 6,
      border: "1px solid rgba(50, 50, 93, 0.1)",
      padding: 12,
      margin: 10,
      flex: 1,
    },
    input: {
      borderRadius: 6,
      marginBottom: 6,
      padding: 12,
      border: "1px solid rgba(50, 50, 93, 0.1)",
      maxHeight: 44,
      fontSize: 16,
      width: "100%",
      background: "white",
      boxSizing: "border-box",
    },
    ".result-message": {
      lineHeight: 22,
      fontSize: 16,
    },
    ".result-message a": {
      color: "rgb(89, 111, 214)",
      fontWeight: 600,
      textDecoration: "none",
    },
    ".hidden": {
      display: "none",
    },
    "#card-error": {
      color: "rgb(105, 115, 134)",
      fontSize: 16,
      lineHeight: 20,
      marginTop: 12,
      textAlign: "center",
    },
    "#card-element": {
      borderRadius: "4px 4px 0 0",
      padding: 12,
      border: "1px solid rgba(50, 50, 93, 0.1)",
      maxHeight: 44,
      width: "100%",
      background: "white",
      boxSizing: "border-box",
    },
    "#payment-request-button": {
      marginBottom: 32,
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));
let promise = null;

export default function PaymentMethod() {
  const classes = useStyles();
  const [paymentsMethod, setPaymentsMethod] = useState([]);
  const [paymentSelected, setPaymentSelected] = useState(null);
  const [currency, setCurrency] = useState("USD");

  const {
    methods,
    ownPhoneNumber,
    rate,
    paymentStatus,
    paymentOrder,
    getPaymentsMethod,
    generateOrderPayment,
    getRate,
  } = useContext(PaymentContext);
  const { promotionSelected } = useContext(HomeContext);
  const [changeRate, setChangeRate] = useState(null);
  const [rateValue, setRateValue] = useState(0);

  useEffect(() => {
    (async () => {
      await getRate();
      if (!methods || methods.length === 0) {
        await getPaymentsMethod();
      } else {
        setPaymentsMethod(methods);
      }
    })();
  }, [getPaymentsMethod, getRate, methods]);

  useEffect(() => {
    if (methods) {
      if (methods.length > 0) {
        if (methods[0].publicKey) {
          promise = loadStripe(methods[0].publicKey);
        }
        setPaymentSelected(methods[0]);
      }
      setPaymentsMethod(methods);
    }
    if (rate && rate?.bpi) {
      const currencies = Object.keys(rate?.bpi);
      const filters = currencies.filter((it) => it.indexOf("USD") !== 0);
      if (filters.length > 0) {
        setCurrency(rate?.bpi[filters[0]].code);
        setRateValue(
          rate?.bpi[filters[0]].rate_float / rate?.bpi["USD"].rate_float || 1
        );
      }
    }
    setChangeRate(rate);
  }, [methods, rate]);

  const handleRadioChanged = (event) => {
    const valuesSelected = paymentsMethod.filter(
      (it) => it.id.indexOf(event?.target?.value) === 0
    );
    if (valuesSelected.length > 0) {
      if (valuesSelected[0].publicKey) {
        promise = loadStripe(valuesSelected[0].publicKey);
      }
      setPaymentSelected(valuesSelected[0]);
    }
  };

  const createPaymentOrder = async () => {
    await generateOrderPayment(
      promotionSelected,
      {
        ownPhoneNumber,
      },
      "phone",
      paymentSelected,
      null,
      {
        currency,
        rateValue,
      }
    );
  };

  return (
    <React.Fragment>
      <RadioGroup
        aria-label="payment-type"
        name="paymentType"
        value={paymentSelected?.id || null}
        onChange={handleRadioChanged}
      >
        <Grid
          container
          style={{
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          {paymentsMethod.map((payment, index) => {
            return (
              <Grid className="card" item key={index} xs={12} sm={6} md={4}>
                <FormControlLabel
                  value={payment.id}
                  control={<Radio color="primary" />}
                  style={{
                    width: "100%",
                  }}
                  color="primary"
                  label={payment.paymentMethod.name}
                  labelPlacement="end"
                />

                <CardMedia
                  component="img"
                  alt={payment.paymentMethod.name}
                  image={payment.paymentMethod.image}
                  title={payment.paymentMethod.name}
                />
              </Grid>
            );
          })}
        </Grid>
      </RadioGroup>
      <Grid
        container
        style={{
          justifyContent: "center",
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          style={{
            flexDirection: "column",
          }}
        >
          <Grid item xs={12} sm={8} md={6}>
            <p>
              <span
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <strong>Precio a pagar: </strong>${" "}
                {(promotionSelected?.promotionalPrice
                  ? promotionSelected?.promotionalPrice
                  : promotionSelected?.basePrice
                ).toFixed(2)}
                <strong> {promotionSelected?.currency}</strong>
              </span>
            </p>
          </Grid>
          {changeRate && rateValue && (
            <Grid container justify="center">
              <Grid item xs={12} sm={8} md={6}>
                <p>
                  <span
                    style={{
                      backgroundColor: "transparent",
                    }}
                  >
                    <strong>Moneda local: </strong>${" "}
                    {(
                      (promotionSelected?.promotionalPrice
                        ? promotionSelected?.promotionalPrice
                        : promotionSelected?.basePrice) * rateValue
                    ).toFixed(2)}
                    <strong> {currency}</strong>
                  </span>
                </p>
              </Grid>
              <Grid item xs={12} sm={8} md={6}>
                <span
                  style={{
                    backgroundColor: "transparent",
                  }}
                >
                  <strong>Cambio actualizado: </strong>
                  {moment(new Date(changeRate.time.updatedISO)).format(
                    "DD/MM/YYYY HH:mm"
                  )}
                </span>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12} sm={8} md={6}>
            <p>
              <span>
                <strong>Numero a recargar: </strong>
                {ownPhoneNumber}
              </span>
            </p>
          </Grid>
          {!paymentOrder &&
            !paymentStatus &&
            paymentSelected &&
            paymentSelected?.paymentMethod?.code === "CREDIT_CARD" && (
              <Elements stripe={promise}>
                <FormStripeElement />
              </Elements>
            )}
          {!paymentOrder &&
            !paymentStatus &&
            paymentSelected &&
            paymentSelected?.paymentMethod?.code === "PROXY_PAY_ANG" && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={createPaymentOrder}
                  className={classes.button}
                  endIcon={<MonetizationOn />}
                >
                  Generar Referencia
                </Button>
              </>
            )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
