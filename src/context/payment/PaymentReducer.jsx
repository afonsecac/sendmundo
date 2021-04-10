import {
  CHECK_ADD_CONTACT,
  SET_NEW_CONTACT_NAME,
  LOADING_METHODS_TYPE,
  METHODS_TYPE,
  METHODS_TYPE_FAIL,
  PAYMENT_COMPLETED,
  PAYMENT_FAILED,
  PROCESSING_PAYMENT,
  SELECT_CONFIRM_CHARGE_PHONE,
  SELECT_OWN_PHONE,
  LOADING_RATES,
  METHODS_RATES,
  METHODS_RATES_FAIL,
  PAYMENT_RESET,
} from "context/payment/types";

export default function PaymentReducer(state, action) {
  const { payload, type } = action;
  switch (type) {
    case SELECT_OWN_PHONE:
      return {
        ...state,
        ownPhoneNumber: payload,
      };
    case SELECT_CONFIRM_CHARGE_PHONE:
      return {
        ...state,
        confirmOwnPhoneNumber: payload,
      };

    case CHECK_ADD_CONTACT:
      return {
        ...state,
        checkAddContact: payload,
      };

    case LOADING_METHODS_TYPE:
      return {
        ...state,
        methods: [],
      };

    case METHODS_TYPE:
      return {
        ...state,
        methods: payload || [],
      };

    case METHODS_TYPE_FAIL:
      return {
        ...state,
        methods: [],
      };

    case PROCESSING_PAYMENT:
      return {
        ...state,
        ...{
          paymentStatus: "",
          paymentOrder: "",
          paymentCompleted: false,
        },
      };

    case PAYMENT_COMPLETED:
      return {
        ...state,
        ...{
          paymentStatus: payload.paymentStatus,
          paymentOrder: payload.paymentOrder,
          paymentCompleted: payload.paymentCompleted,
        },
      };

    case PAYMENT_FAILED:
      return {
        ...state,
        ...{
          paymentStatus: "FAILED",
          paymentOrder: "",
          paymentCompleted: false,
        },
      };

    case LOADING_RATES:
      return {
        ...state,
        rate: null,
      };

    case METHODS_RATES:
      return {
        ...state,
        rate: payload,
      };

    case METHODS_RATES_FAIL:
      return {
        ...state,
        rate: null,
      };

    case PAYMENT_RESET:
      return {
        ...state,
        ...{
          ownPhoneNumber: null,
          confirmOwnPhoneNumber: null,
          checkAddContact: false,
          paymentStatus: null,
          paymentOrder: null,
          paymentCompleted: null,
          rate: null,
        },
      };
    case SET_NEW_CONTACT_NAME:
      return {
        ...state,
        newContactName: payload,
      };

    default:
      return state;
  }
}
