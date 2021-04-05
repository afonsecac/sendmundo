import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import UnelevatedButton from "common/buttons/UnelevatedButton";
import ContactContext from "context/contacts/ContactContext";
import { useFormik } from "formik";
import { createContactSchema } from "modules/contact/validations/CreateContactValidation";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#0073a7",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0073a7",
    },
  },
}));

export default function ContactForm() {
  const classes = useStyles();
  const { createContact, loadingCreate } = useContext(ContactContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      isFavorite: false,
      contactInfo: {
        phone: "",
        nautaEmail: "",
      },
    },
    onSubmit: (values, { resetForm }) => {
      createContact(values, resetForm);
    },
    validationSchema: createContactSchema,
  });

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Formulario de Contacto
      </Typography>
      <form onSubmit={formik.handleSubmit} className={classes.form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              variant="outlined"
              required
              fullWidth
              label="Nombre completo"
              value={formik.values.name || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.name && formik.errors.name)}
              helperText={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <MaterialUiPhoneNumber
              defaultCountry={"cu"}
              name="contactInfo.phone"
              value={formik.values.contactInfo.phone || ""}
              onChange={(e) => {
                formik.setFieldValue("contactInfo.phone", e);
              }}
              onBlur={formik.handleBlur}
              variant="outlined"
              required
              fullWidth
              autoFormat
              error={
                !!(
                  formik.touched?.contactInfo?.phone &&
                  formik.errors?.contactInfo?.phone
                )
              }
              helperText={
                formik.touched?.contactInfo?.phone &&
                formik.errors?.contactInfo?.phone
                  ? formik.errors?.contactInfo?.phone
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="contactInfo.nautaEmail"
              variant="outlined"
              required
              fullWidth
              label="Nauta"
              type="email"
              value={formik.values.contactInfo.nautaEmail || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                !!(
                  formik.touched?.contactInfo?.nautaEmail &&
                  formik.errors?.contactInfo?.nautaEmail
                )
              }
              helperText={
                formik.touched?.contactInfo?.nautaEmail &&
                formik.errors?.contactInfo?.nautaEmail
                  ? formik.errors?.contactInfo?.nautaEmail
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name="isFavorite"
                  value={formik.values.isFavorite || false}
                  checked={formik.values.isFavorite}
                  onChange={formik.handleChange}
                />
              }
              label="Es favorito"
              labelPlacement="end"
            />
          </Grid>
          <Grid item container justify="flex-end">
            <UnelevatedButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              withProgress={loadingCreate}
            >
              Crear
            </UnelevatedButton>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
