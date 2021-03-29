import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Avatar,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link as LinkR } from "react-router-dom";
import { useFormik } from "formik";
import { recoverPasswordSchema } from "modules/auth/validations/RecoverPasswordValidations";
import PasswordInput from "common/inputs/PasswordInput";
import AuthContext from "context/auth/AuthContext";
import UnelevatedButton from "common/buttons/UnelevatedButton";

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

export default function RecoverPasswordForm() {
  const classes = useStyles();
  const { loadingReconverPassword, recoverPassword } = useContext(AuthContext);

  const formik = useFormik({
    enableReinitialize: localStorage.getItem("usernameOrEmail"),
    initialValues: {
      username: localStorage.getItem("usernameOrEmail"),
      code: "",
      password: "",
      passwordConfirm: "",
    },
    onSubmit: (values) => {
      recoverPassword(values);
    },
    validationSchema: recoverPasswordSchema,
  });

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Codigo"
                name="code"
                value={formik.values.code || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!(formik.touched.code && formik.errors.code)}
                helperText={
                  formik.touched.code && formik.errors.code
                    ? formik.errors.code
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
          </Grid>
          <UnelevatedButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            withProgress={loadingReconverPassword}
          >
            Cambiar
          </UnelevatedButton>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={LinkR} to="/login" variant="body2">
                Ya tienes un usuario? Accede
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
