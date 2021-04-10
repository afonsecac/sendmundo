import React, { useContext, useEffect } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import PhoneRechargeSelect from "modules/payment/components/PhoneRechargeSelect";

import PaymentContext from "context/payment/PaymentContext";
import HomeContext from "context/home/HomeContext";

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
  const {
    handleChangeOwnPHNumber,
    handleChangeConfirmOwnPHNumber,
    handleChangeAddContact,
    checkAddContact,
    ownPhoneNumber,
    confirmOwnPhoneNumber,
    handleChangeNewContactName,
    newContactName,
  } = useContext(PaymentContext);
  const { phoneNumber } = useContext(HomeContext);

  useEffect(() => {
    if (phoneNumber && !ownPhoneNumber) {
      handleChangeOwnPHNumber(phoneNumber);
    }
  }, [handleChangeOwnPHNumber, ownPhoneNumber, phoneNumber]);

  return (
    <Grid container item spacing={3} xs={12} sm={8}>
      <Grid item xs={12}>
        <Grid item container alignItems="center">
          <Grid item>
            <MaterialUiPhoneNumber
              value={ownPhoneNumber || phoneNumber}
              defaultCountry={"cu"}
              onChange={(e) => {
                handleChangeOwnPHNumber(e);
              }}
              variant="outlined"
              label="Teléfono Cubacel "
              required
              autoFormat
              size="small"
              className={classes.textField}
            />
          </Grid>
          <Grid item>
            <PhoneRechargeSelect />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <MaterialUiPhoneNumber
          value={confirmOwnPhoneNumber || phoneNumber}
          defaultCountry={"cu"}
          onChange={(e) => {
            handleChangeConfirmOwnPHNumber(e);
          }}
          variant="outlined"
          label="Confirme número de teléfono "
          required
          autoFormat
          size="small"
          className={classes.textField}
        />
      </Grid>
      <Grid item xs={12}>
        <Box mt={2}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="add-contact"
                checked={checkAddContact}
              />
            }
            label="Deseo agregar este numero a mis contactos"
            labelPlacement="end"
            onChange={(e) => handleChangeAddContact(e.target.checked)}
          />
        </Box>
      </Grid>
      {checkAddContact && (
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            name="name"
            size="small"
            required
            variant="outlined"
            label="Nombre"
            value={newContactName}
            onChange={handleChangeNewContactName}
            helperText={
              <span>
                Nombre del <b>contacto</b>
              </span>
            }
          />
        </Grid>
      )}
    </Grid>
  );
}
