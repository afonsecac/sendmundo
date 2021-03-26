import React, { useContext } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import PaymentContext from "context/payment/PaymentContext";

const useStyles = makeStyles((theme) => ({
  textField: {
    [`& fieldset`]: {
      borderRadius: 15,
      border: "2px solid #0073a7",
    },
  },
}));

export default function PhoneRechar() {
  const classes = useStyles();
  const { handleChangeOwnPHNumber, handleChangeChargePHNumber } = useContext(
    PaymentContext
  );

  return (
    <Grid container item spacing={3} xs={12} sm={8}>
      <Grid item xs={12}>
        <MaterialUiPhoneNumber
          defaultCountry={"cu"}
          onChange={(e) => {
            handleChangeOwnPHNumber(e);
          }}
          variant="outlined"
          label="Teléfono Cubacel "
          required
          autoFormat
          regions={"america"}
          size="small"
          className={classes.textField}
        />
      </Grid>
      <Grid item xs={12}>
        <MaterialUiPhoneNumber
          defaultCountry={"cu"}
          onChange={(e) => {
            handleChangeChargePHNumber(e);
          }}
          variant="outlined"
          label="Confirme número de teléfono "
          required
          autoFormat
          regions={"america"}
          size="small"
          className={classes.textField}
        />
      </Grid>
    </Grid>
  );
}