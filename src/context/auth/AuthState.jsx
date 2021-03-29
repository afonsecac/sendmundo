import React, { useReducer, useMemo, useCallback, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import AuthReducer from "context/auth/AuthReducer";
import AuthContext from "context/auth/AuthContext";
import axios, { otherInstance } from "axios-or";
import setAuthToken from "utils/setAuthToken";
import {
  UPDT_USER_DATA,
  LOADING,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  LOADING_REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOADING_COUNTRIES,
  COUNTRIES_SUCCESS,
  COUNTRIES_FAIL,
  LOADING_CONFIRM,
  CONFIRM_SUCCESS,
  CONFIRM_FAIL,
  LOADING_SEND_CODE,
  SEND_CODE_SUCCESS,
  SEND_CODE_FAIL,
  LOADING_RECOVER_PW,
  RECOVER_PW_SUCCESS,
  RECOVER_PW_FAIL,
} from "context/auth/types";
import jwtDecode from "jwt-decode";

export default function AuthState({ children }) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const initialState = useMemo(
    () => ({
      loadingCountries: false,
      countries: [],
      loadingRegister: false,
      loadingConfirm: false,
      loading: false,
      loadingSendCode: false,
      user: {},
      isAuthenticated: false,
      loadingReconverPassword: false,
    }),
    []
  );

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const recoverPassword = useCallback(
    async (payload) => {
      try {
        dispatch({ type: LOADING_RECOVER_PW });
        await axios.post(
          "https://api.sendmundo.com/security/recovery-password",
          payload
        );
        dispatch({ type: RECOVER_PW_SUCCESS });
        enqueueSnackbar("Ha cambiado el password correctamente", {
          variant: "success",
        });
        localStorage.removeItem("usernameOrEmail");
        history.push("/login");
      } catch (error) {
        dispatch({ type: RECOVER_PW_FAIL });
        enqueueSnackbar("Ops algo ha ido mal :(", {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar, history]
  );

  const sendCode = useCallback(
    async (payload) => {
      try {
        dispatch({ type: LOADING_SEND_CODE });
        await axios.post("https://api.sendmundo.com/code/send", payload);
        dispatch({ type: SEND_CODE_SUCCESS });
        localStorage.setItem("usernameOrEmail", payload.usernameOrEmail);
        enqueueSnackbar(
          "Se ha enviado un codigo a su email para que cambie su password",
          {
            variant: "success",
          }
        );
        history.push("/recover-password");
      } catch (error) {
        dispatch({ type: SEND_CODE_FAIL });
        enqueueSnackbar(
          "Ops algo ha ido mal secciorese que el usuario sea correcto :(",
          {
            variant: "error",
          }
        );
      }
    },
    [enqueueSnackbar, history]
  );

  const login = useCallback(
    async (payload) => {
      try {
        dispatch({ type: LOADING });
        const resp = await axios.post(
          "https://api.sendmundo.com/security/tokens",
          payload
        );
        setAuthToken(resp.data.token);
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("refreshToken", resp.data.refreshToken);
        const userData = jwtDecode(resp.data.token);
        dispatch({ type: SIGNIN_SUCCESS, payload: userData });
        history.push("/");
      } catch (error) {
        dispatch({ type: SIGNIN_FAIL });
        enqueueSnackbar("Ops algo ha ido mal :(", {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar, history]
  );

  const logout = useCallback(() => {
    setAuthToken();
    localStorage.clear();
    dispatch({ type: UPDT_USER_DATA, payload: {} });
    window.location = "/";
  }, []);

  const register = useCallback(
    async (payload, setErrors) => {
      try {
        dispatch({ type: LOADING_REGISTER });
        const resp = await axios.post(
          "https://api.sendmundo.com/register",
          payload
        );
        dispatch({ type: REGISTER_SUCCESS, payload: resp.data.user });
        localStorage.setItem("user", JSON.stringify(resp.data.user));
        enqueueSnackbar("El usuario se ha registrado correctamente", {
          variant: "success",
        });
        history.push("/confirm-user");
      } catch (error) {
        dispatch({ type: REGISTER_FAIL });
        if (+error.response.status === 400) {
          setErrors({
            email:
              error.response.data?.email ||
              "El email introducido ya esta en uso",
          });
        }
        enqueueSnackbar("Ops algo ha ido mal :(", {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar, history]
  );

  const confirmUser = useCallback(
    async (payload) => {
      try {
        dispatch({ type: LOADING_CONFIRM });
        const resp = await axios.post(
          "https://api.sendmundo.com/code/validate",
          payload
        );
        if (resp.data?.isBlocked) {
          dispatch({ type: CONFIRM_FAIL });
          enqueueSnackbar(
            "El usuario ha sido bloqueado por introducir el codigo incorrecto varias veces",
            {
              variant: "error",
            }
          );
        } else if (resp.data?.valid) {
          dispatch({ type: CONFIRM_SUCCESS });
          enqueueSnackbar("El usuario ha sido validado correctamente", {
            variant: "success",
          });
          history.push("/login");
        } else {
          dispatch({ type: CONFIRM_FAIL });
          enqueueSnackbar(
            `El codigo de confirmacion es incorrecto intento numero ${resp.data.attempts}`,
            {
              variant: "warning",
            }
          );
        }
      } catch (error) {
        dispatch({ type: CONFIRM_FAIL });
        enqueueSnackbar(
          error.response.data?.error
            ? error.response.data?.error
            : "Ops algo fue mal :(",
          {
            variant: "error",
          }
        );
      }
    },
    [enqueueSnackbar, history]
  );

  const getCountries = useCallback(
    async (name) => {
      try {
        dispatch({ type: LOADING_COUNTRIES });
        const resp = await otherInstance.get(
          `https://restcountries.eu/rest/v2/name/${name}`
        );
        dispatch({ type: COUNTRIES_SUCCESS, payload: resp.data });
      } catch (error) {
        dispatch({ type: COUNTRIES_FAIL });
        enqueueSnackbar("Ops algo ha ido mal :(", {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar]
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const userData = jwtDecode(localStorage.getItem("token"));
      dispatch({ type: UPDT_USER_DATA, payload: userData });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loadingCountries: state.loadingCountries,
        loadingRegister: state.loadingRegister,
        loadingConfirm: state.loadingConfirm,
        loading: state.loading,
        loadingSendCode: state.loadingSendCode,
        loadingReconverPassword: state.loadingReconverPassword,
        countries: state.countries,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        login,
        logout,
        register,
        confirmUser,
        getCountries,
        sendCode,
        recoverPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
