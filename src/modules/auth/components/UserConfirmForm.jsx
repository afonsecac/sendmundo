import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Avatar,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
} from "@material-ui/core";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import { Link as LinkR } from "react-router-dom";
import { useFormik } from "formik";
import { userConfirmSchema } from "modules/auth/validations/UserConfirmValidation";
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

export default function UserConfirmForm() {
  const classes = useStyles();
  const { loadingConfirm, confirmUser, user } = useContext(AuthContext);

  const formik = useFormik({
    enableReinitialize: user,
    initialValues: {
      username: user?.email || JSON.parse(localStorage.getItem("user")).email,
      code: "",
    },
    onSubmit: (values) => {
      confirmUser(values);
    },
    validationSchema: userConfirmSchema,
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ConfirmationNumberIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Validar Usuario
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="code"
                variant="outlined"
                required
                fullWidth
                label="Codigo"
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
          </Grid>

          <UnelevatedButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            withProgress={loadingConfirm}
          >
            Validar
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
