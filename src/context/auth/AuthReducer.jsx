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
import isEmpty from "validations/is-empty";

export default function AuthReducer(state, action) {
  const { payload, type } = action;
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: !isEmpty(payload),
        loading: false,
      };
    case SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
      };
    case LOADING_REGISTER:
      return {
        ...state,
        loadingRegister: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: payload,
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
    case LOADING_CONFIRM:
      return {
        ...state,
        loadingConfirm: true,
      };
    case CONFIRM_SUCCESS:
      return {
        ...state,
        loadingConfirm: false,
      };
    case CONFIRM_FAIL:
      return {
        ...state,
        loadingConfirm: false,
      };
    case UPDT_USER_DATA:
      return {
        ...state,
        user: payload,
        isAuthenticated: !isEmpty(payload),
      };
    case LOADING_SEND_CODE:
      return {
        ...state,
        loadingSendCode: true,
      };
    case SEND_CODE_SUCCESS:
      return {
        ...state,
        loadingSendCode: false,
      };
    case SEND_CODE_FAIL:
      return {
        ...state,
        loadingSendCode: false,
      };
    case LOADING_RECOVER_PW:
      return {
        ...state,
        loadingReconverPassword: true,
      };
    case RECOVER_PW_SUCCESS:
      return {
        ...state,
        loadingReconverPassword: false,
      };
    case RECOVER_PW_FAIL:
      return {
        ...state,
        loadingReconverPassword: false,
      };

    default:
      return state;
  }
}
