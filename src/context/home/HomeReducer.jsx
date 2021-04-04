import {
  LOADING_PROMOTIONS,
  GET_PROMOTIONS,
  GET_PROMOTIONS_FAIL,
  SELECT_PROMOTION,
  CLEAR_PROMOTIONS,
  GET_PHONE_NUMBER,
  SET_COUNTRY,
} from "context/home/types";
import isEmpty from "validations/is-empty";

export default function HomeReducer(state, action) {
  const { payload, type } = action;
  switch (type) {
    case LOADING_PROMOTIONS:
      return {
        ...state,
        loadingPromotions: true,
      };
    case GET_PROMOTIONS:
      return {
        ...state,
        promotions: payload,
        loadingPromotions: false,
      };
    case CLEAR_PROMOTIONS:
      return {
        ...state,
        ...{
          promotions: [],
          promotionSelected: null,
        },
      };
    case GET_PROMOTIONS_FAIL:
      return {
        ...state,
        loadingPromotions: false,
      };
    case SELECT_PROMOTION:
      return {
        ...state,
        promotionSelected: payload,
      };
    case GET_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: payload,
      };
    case SET_COUNTRY:
      return {
        ...state,
        country: payload,
      };

    default:
      return state;
  }
}
