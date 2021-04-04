import React, {useContext, useEffect} from "react";
import {Box, Checkbox, FormControlLabel, Grid, makeStyles} from "@material-ui/core";
import MaterialUiPhoneNumber from "material-ui-phone-number";
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
    } = useContext(PaymentContext);
    const {phoneNumber} = useContext(HomeContext);

    useEffect(() => {
        if (phoneNumber) {
            handleChangeOwnPHNumber(phoneNumber);
        }
    }, [handleChangeOwnPHNumber, phoneNumber]);

    return (
        <Grid container item spacing={3} xs={12} sm={8}>
            <Grid item xs={12}>
                <MaterialUiPhoneNumber
                    value={phoneNumber}
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
                        handleChangeConfirmOwnPHNumber(e);
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
        </Grid>
    );
}
