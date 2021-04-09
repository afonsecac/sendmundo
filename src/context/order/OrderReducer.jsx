import {
  LOADING_ORDERS,
  GET_ORDERS,
  GET_ORDERS_FAIL,
  FILTERS,
  CLEAR_FILTERS,
} from "context/order/types";

export default function ContactsReducer(state, action) {
  const { payload, type, event } = action;
  switch (type) {
    case LOADING_ORDERS:
      return {
        ...state,
        loadingOrders: payload,
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: payload,
        loadingOrders: false,
      };
    case GET_ORDERS_FAIL:
      return {
        ...state,
        loadingOrders: false,
      };

    case FILTERS:
      return {
        ...state,
        params: {
          ...state.params,
          page: 1,
          [event]: payload,
        },
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        params: {
          limit: state.params.limit,
          page: state.params.page,
          name: "",
        },
      };

    default:
      return state;
  }
}
