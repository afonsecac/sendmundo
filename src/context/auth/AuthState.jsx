import React, { useReducer } from "react";
import AuthReducer from "context/auth/AuthReducer";
import AuthContext from "context/auth/AuthContext";
import axios from "axios";

export default function AuthState({ children }) {
  const initialState = {
    user: {},
    token: "",
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const login = () => {};
  const register = () => {};

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
