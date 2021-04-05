import React, {useContext, useEffect, useState} from "react";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {Button, Checkbox, FormControlLabel} from "@material-ui/core";
import PaymentContext from "../../../context/payment/PaymentContext";
import HomeContext from "../../../context/home/HomeContext";
import {MonetizationOn} from "@material-ui/icons";

export default function FormStripeElement() {
    const [error, setError] = useState(null);
    const [validCard, setValidCard] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const { getCardSettings, cardSettings, ownPhoneNumber, createPaymentWidthCard, cardPaymentOut, createOrUpdate, order, paymentCompleted, methodCard } = useContext(PaymentContext);
    const { promotionSelected } = useContext(HomeContext);

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            },
            ".card-error": {
                color: "red"
            }
        }
    };

    const handleChange = async (event) => {
        setError(event.error ? event.error.message : "");
        setValidCard(event.complete);
    };

    const handleSubmit = async ev => {
        ev.preventDefault();
        if (order) {
            await createOrUpdate({
                offerId: promotionSelected.id,
                contactInfo: {
                    ownPhoneNumber
                }
            })
        }
        // const card = elements.getElement(CardElement);
        // const payload = await stripe.confirmCardPayment('sk_test_slItGr7mtW0oYkHl8FdZkG4E00N7WnYqCw', {
        //     payment_method: {
        //         card
        //     }
        // });
        // console.log(payload);

        // if (payload.error) {
        //     setValidCard(false);
        //     setError(`Payment failed ${payload.error.message}`);
        //     setProcessing(false);
        // } else {
        //     setError(null);
        //     setProcessing(false);
        //     setSucceeded(true);
        // }
    }

    useEffect(() => {
        (async () => {
            if (methodCard && !cardSettings) {
                await getCardSettings(methodCard.id);
            }
        })();
    }, [methodCard, cardSettings, order]);

    async function createOrderToPay() {
        await createOrUpdate({
            offerId: promotionSelected.id,
            contactInfo: {
                ownPhoneNumber
            }
        })
    }


    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <CardElement id="card-element" options={cardStyle} onChange={handleChange}/>
            {error && (
                <div className="card-error" style={{
                    color: "red"
                }} role="alert">
                    {error}
                </div>
            )}
            <FormControlLabel
                value={false}
                control={<Checkbox color="primary"/>}
                label="Almacenar de forma segura su tarjeta para pagos futuros."
                labelPlacement="end"
            />
            {
                cardSettings && !order && validCard && (
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        endIcon={<MonetizationOn />}
                    >
                        Generar Pago
                    </Button>
                )
            }
        </form>
    );
}
