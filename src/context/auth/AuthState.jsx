import React, { useReducer, useMemo, useCallback } from "react";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import AuthReducer from "context/auth/AuthReducer";
import AuthContext from "context/auth/AuthContext";
import axios, { otherInstance } from "axios-or";
import {
  LOADING_REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOADING_COUNTRIES,
  COUNTRIES_SUCCESS,
  COUNTRIES_FAIL,
  LOADING_CONFIRM,
  CONFIRM_SUCCESS,
  CONFIRM_FAIL,
} from "context/auth/types";

export default function AuthState({ children }) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const initialState = useMemo(
    () => ({
      loadingCountries: false,
      countries: [],
      loadingRegister: false,
      loadingConfirm: false,
      user: {},
      token: "",
    }),
    []
  );

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const login = (event) => {
    event.preventDefault();
    console.log("LOGIN");
  };

  const register = useCallback(
    async (payload, setErrors) => {
      try {
        dispatch({ type: LOADING_REGISTER });
        const resp = await axios.post(
          "https://api.sendmundo.com/register",
          payload
        );
        dispatch({ type: REGISTER_SUCCESS, payload: resp.data.user });
        localStorage.setItem("user", resp.data.user);
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

  return (
    <AuthContext.Provider
      value={{
        loadingCountries: state.loadingCountries,
        loadingRegister: state.loadingRegister,
        loadingConfirm: state.loadingConfirm,
        countries: state.countries,
        user: state.user,
        token: state.token,
        login,
        register,
        confirmUser,
        getCountries,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
