import React, { useReducer, useMemo, useCallback } from "react";
import { useSnackbar } from "notistack";
import PaymentReducer from "context/payment/PaymentReducer";
import PaymentContext from "context/payment/PaymentContext";
import axios from "axios-or";
import { SELECT_OWN_PHONE, SELECT_CHARGE_PHONE } from "context/payment/types";

export default function PaymentState({ children }) {
  const { enqueueSnackbar } = useSnackbar();
  const initialState = useMemo(
    () => ({
      ownPhoneNumber: "",
      chargePhoneNumber: [],
    }),
    []
  );

  const [state, dispatch] = useReducer(PaymentReducer, initialState);

  const handleChangeOwnPHNumber = useCallback((value) => {
    dispatch({ type: SELECT_OWN_PHONE, payload: value });
  }, []);
  const handleChangeChargePHNumber = useCallback((value) => {
    dispatch({ type: SELECT_CHARGE_PHONE, payload: value });
  }, []);

  return (
    <PaymentContext.Provider
      value={{
        ownPhoneNumber: state.ownPhoneNumber,
        chargePhoneNumber: state.chargePhoneNumber,
        handleChangeOwnPHNumber,
        handleChangeChargePHNumber,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}
