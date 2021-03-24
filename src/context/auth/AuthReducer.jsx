import {
  LOADING,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  LOADING_REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOADING_COUNTRIES,
  COUNTRIES_SUCCESS,
  COUNTRIES_FAIL,
} from "context/auth/types";

export default (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case LOADING_REGISTER:
      return {
        ...state,
        loadingRegister: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loadingRegister: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loadingRegister: false,
      };
    case LOADING_COUNTRIES:
      return {
        ...state,
        loadingCountries: true,
      };
    case COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: payload,
        loadingCountries: false,
      };
    case COUNTRIES_FAIL:
      return {
        ...state,
        loadingCountries: false,
      };

    default:
      return state;
  }
};
