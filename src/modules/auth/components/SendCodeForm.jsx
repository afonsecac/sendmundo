import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link as LinkR } from "react-router-dom";
import AuthContext from "context/auth/AuthContext";
import UnelevatedButton from "common/buttons/UnelevatedButton";
import { useFormik } from "formik";
import { sendCodeSchema } from "modules/auth/validations/SendCodeValidations";

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
    marginTop: theme.spacing(1),
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

export default function SendCodeForm() {
  const classes = useStyles();

  const { sendCode, loadingSendCode } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
    },
    onSubmit: (values) => {
      sendCode(values);
    },
    validationSchema: sendCodeSchema,
  });
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Verificacion de usuario
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          className={classes.form}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="User or Email"
            name="usernameOrEmail"
            value={formik.values.usernameOrEmail || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              !!(
                formik.touched.usernameOrEmail && formik.errors.usernameOrEmail
              )
            }
            helperText={
              formik.touched.usernameOrEmail && formik.errors.usernameOrEmail
                ? formik.errors.usernameOrEmail
                : ""
            }
          />
          <UnelevatedButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            withProgress={loadingSendCode}
          >
            Enviar
          </UnelevatedButton>
          <Grid container>
            <Grid item>
              <Link component={LinkR} to="/register" variant="body2">
                {"No tienes usuario aun? Registrate"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
