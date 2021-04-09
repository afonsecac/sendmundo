import React, { useReducer, useMemo, useCallback } from "react";
import {
  LOADING_ORDERS,
  GET_ORDERS,
  GET_ORDERS_FAIL,
  FILTERS,
  CLEAR_FILTERS,
} from "context/order/types";
import { useSnackbar } from "notistack";
import OrderReducer from "context/order/OrderReducer";
import OrderContext from "context/order/OrderContext";
import axios from "axios-or";

export default function OrderState({ children }) {
  const { enqueueSnackbar } = useSnackbar();

  const initialState = useMemo(
    () => ({
      loadingOrders: false,
      orders: [],
      params: {
        limit: 8,
        page: 1,
        // startDate: "",
        // endDate: "",
        // invoiceCode: "",
        // order: "",
      },
    }),
    []
  );

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  const getOrders = useCallback(async () => {
    try {
      dispatch({ type: LOADING_ORDERS, payload: true });
      const resp = await axios.get("/order", {
        params: state.params,
      });
      dispatch({ type: GET_ORDERS, payload: resp.data });
    } catch (error) {
      dispatch({ type: GET_ORDERS_FAIL });
      enqueueSnackbar("Ops algo ha ido mal :(", {
        variant: "error",
      });
    }
  }, [enqueueSnackbar, state.params]);

  const handleParamsChange = useCallback((event) => {
    const { name, value } = event.target;
    dispatch({ type: FILTERS, payload: value, event: name });
  }, []);

  const handleClearParamsChange = useCallback((event) => {
    dispatch({ type: CLEAR_FILTERS });
  }, []);

  return (
    <OrderContext.Provider
      value={{
        loadingOrders: state.loadingOrders,
        orders: state.orders,
        params: state.params,
        getOrders,
        handleParamsChange,
        handleClearParamsChange,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
