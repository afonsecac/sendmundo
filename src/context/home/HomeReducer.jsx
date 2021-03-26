import {
  LOADING_PROMOTIONS,
  GET_PROMOTIONS,
  GET_PROMOTIONS_FAIL,
  SELECT_PROMOTION,
  CLEAR_PROMOTIONS,
} from "context/home/types";

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
        promotions: [],
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

    default:
      return state;
  }
}
