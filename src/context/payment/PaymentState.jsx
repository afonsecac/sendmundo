import React, { useCallback, useMemo, useReducer } from "react";
import PaymentReducer from "context/payment/PaymentReducer";
import PaymentContext from "context/payment/PaymentContext";
import {
  CHECK_ADD_CONTACT,
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
import { useSnackbar } from "notistack";
import axios from "../../axios-or";

export default function PaymentState({ children }) {
  const { enqueueSnackbar } = useSnackbar();
  const initialState = useMemo(
    () => ({
      ownPhoneNumber: "",
      confirmOwnPhoneNumber: "",
      checkAddContact: true,
      methods: [],
      paymentStatus: null,
      paymentOrder: null,
      paymentCompleted: false,
      rate: null,
    }),
    []
  );

  const [state, dispatch] = useReducer(PaymentReducer, initialState);

  const handleChangeOwnPHNumber = useCallback((value) => {
    dispatch({ type: SELECT_OWN_PHONE, payload: value });
  }, []);
  const handleChangeConfirmOwnPHNumber = useCallback((value) => {
    dispatch({ type: SELECT_CONFIRM_CHARGE_PHONE, payload: value });
  }, []);
  const handleChangeAddContact = useCallback((value) => {
    dispatch({ type: CHECK_ADD_CONTACT, payload: value });
  }, []);
  const handleResetAndClear = useCallback(() => {
    dispatch({ type: PAYMENT_RESET });
  }, []);

  const getPaymentsMethod = useCallback(
    async (params) => {
      try {
        dispatch({ type: LOADING_METHODS_TYPE });
        const {
          data: { data: payments },
        } = await axios.get("/payment/type-country", {
          params: params,
        });
        dispatch({ type: METHODS_TYPE, payload: payments });
      } catch (e) {
        dispatch({ type: METHODS_TYPE_FAIL });
        enqueueSnackbar("Ops algo ha ido mal :(", {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar]
  );

  const generateOrderPayment = useCallback(
    async (offer, contact, type, paymentType, payUsed, rates) => {
      try {
        dispatch({ type: PROCESSING_PAYMENT });
        const {
          data: { data: payment },
        } = await axios.post("/payment/create", {
          offer,
          contact,
          type,
          paymentType,
          payUsed,
          rates,
        });
        dispatch({ type: PAYMENT_COMPLETED, payload: payment });
      } catch (e) {
        dispatch({ type: PAYMENT_FAILED });
        enqueueSnackbar("Ops algo ha ido mal :(", {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar]
  );

  const getRate = useCallback(async () => {
    try {
      dispatch({ type: LOADING_RATES });
      const {
        data: { data: rates },
      } = await axios.get("/payment/rates");
      dispatch({ type: METHODS_RATES, payload: rates });
    } catch (e) {
      dispatch({ type: METHODS_RATES_FAIL });
      enqueueSnackbar("Ops algo ha ido mal :(", {
        variant: "error",
      });
    }
  }, [enqueueSnackbar]);

  return (
    <PaymentContext.Provider
      value={{
        ownPhoneNumber: state.ownPhoneNumber,
        confirmOwnPhoneNumber: state.confirmOwnPhoneNumber,
        checkAddContact: state.checkAddContact,
        methods: state.methods,
        paymentStatus: state.paymentStatus,
        paymentOrder: state.paymentOrder,
        paymentCompleted: state.paymentCompleted,
        rate: state.rate,
        handleResetAndClear,
        handleChangeOwnPHNumber,
        handleChangeConfirmOwnPHNumber,
        handleChangeAddContact,
        getPaymentsMethod,
        generateOrderPayment,
        getRate,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
