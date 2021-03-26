import React, { useReducer, useMemo, useCallback } from "react";
import { useSnackbar } from "notistack";
import HomeReducer from "context/home/HomeReducer";
import HomeContext from "context/home/HomeContext";
import axios from "axios-or";
import {
  LOADING_PROMOTIONS,
  GET_PROMOTIONS,
  GET_PROMOTIONS_FAIL,
  SELECT_PROMOTION,
} from "context/home/types";

export default function HomeState({ children }) {
  const { enqueueSnackbar } = useSnackbar();
  const initialState = useMemo(
    () => ({
      loadingPromotions: false,
      promotions: [],
      promotionSelected: "",
      selectedCountryCodePH: "",
      phoneNumber: "",
    }),
    []
  );

  const [state, dispatch] = useReducer(HomeReducer, initialState);

  const getPromotions = useCallback(
    async (params) => {
      try {
        dispatch({ type: LOADING_PROMOTIONS });
        const resp = await axios.get("https://api.sendmundo.com/offer", {
          params: params,
        });
        dispatch({ type: GET_PROMOTIONS, payload: resp.data.data });
      } catch (error) {
        dispatch({ type: GET_PROMOTIONS_FAIL });
        enqueueSnackbar("Ops algo ha ido mal :(", {
          variant: "error",
        });
      }
    },
    [enqueueSnackbar]
  );

  const selectPromotion = useCallback((promotion) => {
    dispatch({ type: SELECT_PROMOTION, payload: promotion });
  }, []);

  return (
    <HomeContext.Provider
      value={{
        loadingPromotions: state.loadingPromotions,
        promotions: state.promotions,
        promotionSelected: state.promotionSelected,
        selectedCountryCodePH: state.selectedCountryCodePH,
        phoneNumber: state.phoneNumber,
        getPromotions,
        selectPromotion,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
