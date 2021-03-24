import React, { useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as LinkR } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "modules/auth/validations/RegisterValidation";
import PasswordInput from "common/inputs/PasswordInput";
import MaterialUiPhoneNumber from "material-ui-phone-number";
import AuthContext from "context/auth/AuthContext";
import CountryAutoComplete from "components/autocompletes/CountryAutoComplete";
import UnelevatedButton from "common/buttons/UnelevatedButton";
import {Checkbox, FormControlLabel} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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

export default function SignUpForm() {
  const classes = useStyles();
  const { loadingRegister, register } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
      fullName: "",
      phone: {
        phoneCode: "",
        phoneNumber: "",
      },
      country: {
        alpha3Code: "",
        alpha2Code: "",
        name: "",
        currency: "",
      },
      isPromotional: false,
    },
    onSubmit: (values, { setErrors }) => {
      register(values, setErrors);
    },
    validationSchema: registerSchema,
  });

  const handleChangeCountry = (country) => {
    if (country) {
      formik.setFieldValue("country.alpha3Code", country.alpha3Code);
      formik.setFieldValue("country.alpha2Code", country.alpha2Code);
      formik.setFieldValue("country.name", country.name);
      formik.setFieldValue("country.currency", country.currencies[0]);
    } else {
      formik.setFieldValue("country.alpha3Code", "");
      formik.setFieldValue("country.alpha2Code", "");
      formik.setFieldValue("country.name", "");
      formik.setFieldValue("country.currency", "");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2} direction={"column"}>
            <Grid item xs={12}>
              <TextField
                name="fullName"
                variant="outlined"
                required
                fullWidth
                label="Nombre completo"
                autoFocus
                value={formik.values.fullName || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!(formik.touched.fullName && formik.errors.fullName)}
                helperText={
                  formik.touched.fullName && formik.errors.fullName
                    ? formik.errors.fullName
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email"
                name="email"
                value={formik.values.email || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!(formik.touched.email && formik.errors.email)}
                helperText={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Usuario"
                name="username"
                value={formik.values.username || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!(formik.touched.username && formik.errors.username)}
                helperText={
                  formik.touched.username && formik.errors.username
                    ? formik.errors.username
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordInput
                variant="outlined"
                required
                fullWidth
                label="Password"
                name="password"
                value={formik.values.password || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!(formik.touched.password && formik.errors.password)}
                helperText={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordInput
                variant="outlined"
                required
                fullWidth
                label="Confirma Password"
                name="passwordConfirm"
                value={formik.values.passwordConfirm || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  !!(
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                  )
                }
                helperText={
                  formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm
                    ? formik.errors.passwordConfirm
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <MaterialUiPhoneNumber
                defaultCountry={"cu"}
                onChange={(e, country) => {
                  formik.setFieldValue(
                    "phone.phoneCode",
                    `+${country.dialCode}`
                  );
                  const phoneNumber = e.replace(`+${country.dialCode}`, "");
                  formik.setFieldValue("phone.phoneNumber", phoneNumber);
                }}
                variant="outlined"
                required
                fullWidth
                autoFormat
                regions={"america"}
                error={
                  !!(
                    formik.touched.phone?.phoneNumber &&
                    formik.errors.phone?.phoneNumber
                  )
                }
                helperText={
                  formik.touched.phone?.phoneNumber &&
                  formik.errors.phone?.phoneNumber
                    ? formik.errors.phone?.phoneNumber
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <CountryAutoComplete
                handleChange={handleChangeCountry}
                error={
                  !!(
                    formik.touched.country?.name && formik.errors.country?.name
                  )
                }
                helperText={
                  formik.touched.country?.name && formik.errors.country?.name
                    ? formik.errors.country?.name
                    : ""
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              <FormControlLabel
                  value="end"
                  control={
                    <Checkbox color="primary"
                              value={formik?.values?.isPromotional}/>
                  }
                  label="Acepto que me envien ofertas y promociones a mi correo registrado en SendMundo"
                  labelPlacement="end"
              />
            </Box>
          </Grid>
          <UnelevatedButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            withProgress={loadingRegister}
          >
            Registrarse
          </UnelevatedButton>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={LinkR} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
