import { SELECT_OWN_PHONE, SELECT_CHARGE_PHONE } from "context/payment/types";

export default function PaymentReducer(state, action) {
  const { payload, type } = action;
  switch (type) {
    case SELECT_OWN_PHONE:
      return {
        ...state,
        ownPhoneNumber: payload,
      };
    case SELECT_CHARGE_PHONE:
      return {
        ...state,
        chargePhoneNumber: payload,
      };

    default:
      return state;
  }
}
