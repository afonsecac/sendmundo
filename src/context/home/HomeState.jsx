import React, { useReducer, useMemo, useCallback, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import HomeReducer from "context/home/HomeReducer";
import HomeContext from "context/home/HomeContext";
import axios from "axios-or";
import {
  LOADING_PROMOTIONS,
  GET_PROMOTIONS,
  GET_PROMOTIONS_FAIL,
  SELECT_PROMOTION,
  CLEAR_PROMOTIONS,
  GET_PHONE_NUMBER,
  SET_COUNTRY,
} from "context/home/types";

export default function HomeState({ children }) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const initialState = useMemo(
    () => ({
      loadingPromotions: false,
      promotions: [],
      promotionSelected: "",
      phoneNumber: "",
      country: "",
    }),
    []
  );

  const [state, dispatch] = useReducer(HomeReducer, initialState);

  const getPromotions = useCallback(
    async (params) => {
      try {
        dispatch({ type: LOADING_PROMOTIONS });
        const resp = await axios.get("/offer", {
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
    localStorage.setItem("promotionSelected", JSON.stringify(promotion));
  }, []);

  const clearPromotions = useCallback(() => {
    dispatch({ type: CLEAR_PROMOTIONS });
  }, []);

  const navigateToPayFor = (phoneNumber) => {
    dispatch({ type: GET_PHONE_NUMBER, payload: phoneNumber });
    localStorage.setItem("phoneNumber", phoneNumber);
    history.push("/pay-stepp");
  };

  const handleCountry = (country) => {
    dispatch({ type: SET_COUNTRY, payload: country });
  };

  useEffect(() => {
    if (localStorage.getItem("promotionSelected")) {
      dispatch({
        type: SELECT_PROMOTION,
        payload: JSON.parse(localStorage.getItem("promotionSelected")),
      });
    }
    if (localStorage.getItem("phoneNumber")) {
      dispatch({
        type: GET_PHONE_NUMBER,
        payload: localStorage.getItem("phoneNumber"),
      });
    }
  }, []);

  return (
    <HomeContext.Provider
      value={{
        loadingPromotions: state.loadingPromotions,
        promotions: state.promotions,
        promotionSelected: state.promotionSelected,
        phoneNumber: state.phoneNumber,
        country: state.country,
        getPromotions,
        selectPromotion,
        clearPromotions,
        navigateToPayFor,
        handleCountry,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
