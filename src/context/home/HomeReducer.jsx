import {
  LOADING_PROMOTIONS,
  GET_PROMOTIONS,
  GET_PROMOTIONS_FAIL,
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
    case GET_PROMOTIONS_FAIL:
      return {
        ...state,
        loadingPromotions: false,
      };

    default:
      return state;
  }
}
