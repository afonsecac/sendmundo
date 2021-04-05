import React, {useCallback, useMemo, useReducer} from "react";
import PaymentReducer from "context/payment/PaymentReducer";
import PaymentContext from "context/payment/PaymentContext";
import {
    CHECK_ADD_CONTACT,
    LOADING_CARD_SETTINGS,
    LOADING_METHODS_TYPE,
    LOADING_PAY_CARD,
    LOADING_RATES,
    METHODS_CARD,
    METHODS_CARD_FAIL,
    METHODS_PAY_CC,
    METHODS_PAY_CC_FAIL,
    METHODS_RATES,
    METHODS_RATES_FAIL,
    METHODS_TYPE,
    METHODS_TYPE_FAIL,
    PAYMENT_COMPLETED,
    PAYMENT_FAILED,
    PAYMENT_RESET,
    PROCESSING_PAYMENT,
    SELECT_CONFIRM_CHARGE_PHONE,
    SELECT_OWN_PHONE,
    LOADING_PAY_CARD_ORDER,
    METHODS_PAY_CC_ORDER,
    METHODS_PAY_CC_ORDER_FAIL,
    CARD_SETTINGS_UPLOAD
} from "context/payment/types";
import {useSnackbar} from "notistack";
import axios from "../../axios-or";
import * as axiosOutput from 'axios';

export default function PaymentState({children}) {
    const {enqueueSnackbar} = useSnackbar();
    const initialState = useMemo(
        () => ({
            ownPhoneNumber: "",
            confirmOwnPhoneNumber: "",
            checkAddContact: true,
            methods: [],
            paymentStatus: null,
            paymentOrder: null,
            paymentCompleted: false,
            rate: null,
            cardSettings: null,
            cardPaymentOut: null,
            order: null,
            methodCard: null
        }),
        []
    );

    const [state, dispatch] = useReducer(PaymentReducer, initialState);

    const handleChangeOwnPHNumber = useCallback((value) => {
        dispatch({type: SELECT_OWN_PHONE, payload: value});
    }, []);
    const handleChangeConfirmOwnPHNumber = useCallback((value) => {
        dispatch({type: SELECT_CONFIRM_CHARGE_PHONE, payload: value});
    }, []);
    const handleChangeAddContact = useCallback((value) => {
        dispatch({type: CHECK_ADD_CONTACT, payload: value});
    }, []);
    const handleResetAndClear = useCallback(() => {
        dispatch({type: PAYMENT_RESET});
    }, []);

    const handleCardSettings = useCallback((value) => {
        dispatch({type: CARD_SETTINGS_UPLOAD, payload: value});
    }, []);

    const getPaymentsMethod = useCallback(async (params) => {
        try {
            dispatch({type: LOADING_METHODS_TYPE});
            const {
                data: {
                    data: payments
                }
            } = await axios.get("/payment/type-country", {
                params: params,
            });
            dispatch({type: METHODS_TYPE, payload: payments});
        } catch (e) {
            dispatch({type: METHODS_TYPE_FAIL});
            enqueueSnackbar("Ops algo ha ido mal :(", {
                variant: "error",
            });
        }
    }, [enqueueSnackbar]);

    const generateOrderPayment = useCallback(async (offer, contact, type, paymentType, payUsed, rates) => {
        try {
            dispatch({type: PROCESSING_PAYMENT});
            const {
                data: {
                    data: payment
                }
            } = await axios.post("/payment/create", {
                offer,
                contact,
                type,
                paymentType,
                payUsed,
                rates
            });
            dispatch({type: PAYMENT_COMPLETED, payload: payment});
        } catch (e) {
            dispatch({type: PAYMENT_FAILED});
            enqueueSnackbar("Ops algo ha ido mal :(", {
                variant: "error",
            });
        }
    }, [enqueueSnackbar]);

    const getRate = useCallback(async () => {
        try {
            dispatch({type: LOADING_RATES});
            const {
                data: {
                    data: rates
                }
            } = await axios.get("/payment/rates");
            dispatch({type: METHODS_RATES, payload: rates});
        } catch (e) {
            dispatch({type: METHODS_RATES_FAIL});
            enqueueSnackbar("Ops algo ha ido mal :(", {
                variant: "error",
            });
        }
    }, [enqueueSnackbar]);

    const getCardSettings = useCallback(async (id) => {
        try {
            dispatch({type: LOADING_CARD_SETTINGS});
            const {
                data: {
                    data: settings
                }
            } = await axios.post("/payment/card-settings", {
                id
            });
            dispatch({type: METHODS_CARD, payload: settings});
        } catch (e) {
            dispatch({type: METHODS_CARD_FAIL});
            enqueueSnackbar("Ops algo ha ido mal :(", {
                variant: "error",
            });
        }
    }, [enqueueSnackbar]);

    const createPaymentWidthCard = useCallback(async (card, offer, order, userInfo) => {
        try {
            dispatch({type: LOADING_PAY_CARD});
            const result = await axiosOutput.default.post(`${state.cardSettings.environment}/services/2/transactions`,
                {
                    cardTransactionType: 'AUTH_CAPTURE',
                    softDescriptor: order.invoiceCode,
                    amount: offer.promotionalPrice ? offer.promotionalPrice : offer.basePrice,
                    currency: offer.currency,
                    cardHolderInfo: {
                        firstName: `${userInfo.firstName || 'Alexander'}`,
                        lastName: `${userInfo.lastName || 'Fonseca'}`
                    },
                    creditCard: card
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Basic ${state.cardSettings.key}`
                    }
                });
            dispatch({type: METHODS_PAY_CC, payload: result});
        } catch (e) {
            dispatch({type: METHODS_PAY_CC_FAIL});
            enqueueSnackbar("Ops algo ha ido mal :(", {
                variant: "error",
            });
        }
    }, [enqueueSnackbar]);

    const createOrUpdate = useCallback(async (params) => {
        try {
            dispatch({type: LOADING_PAY_CARD_ORDER});
            const {
                data: {
                    data: order
                }
            } = await axios.patch("/order", params);
            dispatch({type: METHODS_PAY_CC_ORDER, payload: order});
        } catch (e) {
            dispatch({type: METHODS_PAY_CC_ORDER_FAIL});
            enqueueSnackbar("Ops algo ha ido mal :(", {
                variant: "error",
            });
        }
    }, [enqueueSnackbar]);

    return (
        <PaymentContext.Provider
            value={{
                ownPhoneNumber: state.ownPhoneNumber,
                confirmOwnPhoneNumber: state.confirmOwnPhoneNumber,
                checkAddContact: state.checkAddContact,
                methods: state.methods,
                paymentStatus: state.paymentStatus,
                paymentOrder: state.paymentOrder,
                paymentCompleted: state.paymentCompleted,
                rate: state.rate,
                cardSettings: state.cardSettings,
                cardPaymentOut: state.cardPaymentOut,
                order: state.order,
                methodCard: state.methodCard,
                handleResetAndClear,
                handleChangeOwnPHNumber,
                handleChangeConfirmOwnPHNumber,
                handleChangeAddContact,
                getPaymentsMethod,
                generateOrderPayment,
                getRate,
                getCardSettings,
                createPaymentWidthCard,
                createOrUpdate,
                handleCardSettings
            }}
        >
            {children}
        </PaymentContext.Provider>
    );
}
