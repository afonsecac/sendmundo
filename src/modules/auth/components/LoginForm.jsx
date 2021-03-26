import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
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
import PasswordInput from "common/inputs/PasswordInput";
import UnelevatedButton from "common/buttons/UnelevatedButton";
import { useFormik } from "formik";
import { userLoginSchema } from "modules/auth/validations/LoginValidations";

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

export default function LoginForm() {
  const classes = useStyles();

  const { login, loading } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      login(values);
    },
    validationSchema: userLoginSchema,
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Acceder
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
            id="email"
            label="User or Email"
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
          <UnelevatedButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            withProgress={loading}
          >
            Acceder
          </UnelevatedButton>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Has olvidado la contrasenna?
              </Link>
            </Grid>
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
