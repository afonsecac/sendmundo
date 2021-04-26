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
    LOADING_CARD_SETTINGS,
    METHODS_CARD,
    METHODS_CARD_FAIL,
    LOADING_PAY_CARD,
    METHODS_PAY_CC,
    METHODS_PAY_CC_FAIL,
    LOADING_PAY_CARD_ORDER,
    METHODS_PAY_CC_ORDER,
    METHODS_PAY_CC_ORDER_FAIL,
    CARD_SETTINGS_UPLOAD
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
        case LOADING_CARD_SETTINGS:
            return {
                ...state,
                cardSettings: {}
            };
        case METHODS_CARD:
            return {
                ...state,
                cardSettings: payload
            };
        case METHODS_CARD_FAIL:
            return {
                ...state,
                cardSettings: null
            };

        case LOADING_PAY_CARD:
            return {
                ...state,
                cardPaymentOut: null
            };
        case METHODS_PAY_CC:
            return {
                ...state,
                cardPaymentOut: payload
            };
        case METHODS_PAY_CC_FAIL:
            return {
                ...state,
                cardPaymentOut: null
            };
        case LOADING_PAY_CARD_ORDER: return {
            ...state,
            order: null
        };
        case METHODS_PAY_CC_ORDER:
            return {
                ...state,
                order: payload
            };
        case METHODS_PAY_CC_ORDER_FAIL:
            return {
                ...state,
                order: null
            };

        case CARD_SETTINGS_UPLOAD:
            return {
                ...state,
                methodCard: payload
            };

    default:
      return state;
  }
}
