import React, { useReducer, useMemo, useCallback } from "react";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import AuthReducer from "context/auth/AuthReducer";
import AuthContext from "context/auth/AuthContext";
import axios from "axios-or";
import {
  LOADING_REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOADING_COUNTRIES,
  COUNTRIES_SUCCESS,
  COUNTRIES_FAIL,
} from "context/auth/types";

export default function AuthState({ children }) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const initialState = useMemo(
    () => ({
      loadingCountries: false,
      countries: [],
      loadingRegister: false,
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

  const register = useCallback(async (payload) => {
    try {
      dispatch({ type: LOADING_REGISTER });
      await axios.post("https://api.sendmundo.com/register", payload);
      dispatch({ type: REGISTER_SUCCESS });
      enqueueSnackbar("El usuario se ha registrado correctamente", {
        variant: "success",
      });
      history.push("/confirm-user");
    } catch (error) {
      dispatch({ type: REGISTER_FAIL });
      enqueueSnackbar("Ops algo ha ido mal :(", {
        variant: "error",
      });
    }
  }, []);

  const getCountries = useCallback(async (name) => {
    try {
      dispatch({ type: LOADING_COUNTRIES });
      const resp = await axios.get(
        `https://restcountries.eu/rest/v2/name/${name}`
      );
      dispatch({ type: COUNTRIES_SUCCESS, payload: resp.data });
    } catch (error) {
      dispatch({ type: COUNTRIES_FAIL });
      enqueueSnackbar("Ops algo ha ido mal :(", {
        variant: "error",
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loadingCountries: state.loadingCountries,
        loadingRegister: state.loadingRegister,
        countries: state.countries,
        user: state.user,
        token: state.token,
        login,
        register,
        getCountries,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
