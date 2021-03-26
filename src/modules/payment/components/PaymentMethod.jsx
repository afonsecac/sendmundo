import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import UnelevatedButton from "common/buttons/UnelevatedButton";

const useStyles = makeStyles((theme) => ({
  "@global": {
    form: {
      width: "30vw",
      alignSelf: "center",
      boxShadow:
        "0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)",
      borderRadius: 7,
      padding: 40,
      minWidth: 550,
    },
    input: {
      borderRadius: 6,
      marginBottom: 6,
      padding: 12,
      border: "1px solid rgba(50, 50, 93, 0.1)",
      maxHeight: 44,
      fontSize: 16,
      width: "100%",
      background: "white",
      boxSizing: "border-box",
    },
    ".result-message": {
      lineHeight: 22,
      fontSize: 16,
    },
    ".result-message a": {
      color: "rgb(89, 111, 214)",
      fontWeight: 600,
      textDecoration: "none",
    },
    ".hidden": {
      display: "none",
    },
    "#card-error": {
      color: "rgb(105, 115, 134)",
      fontSize: 16,
      lineHeight: 20,
      marginTop: 12,
      textAlign: "center",
    },
    "#card-element": {
      borderRadius: "4px 4px 0 0",
      padding: 12,
      border: "1px solid rgba(50, 50, 93, 0.1)",
      maxHeight: 44,
      width: "100%",
      background: "white",
      boxSizing: "border-box",
    },
    "#payment-request-button": {
      marginBottom: 32,
    },
    /* Buttons and links */
    // button: {
    //   background: "#5469d4",
    //   fontFamily: "Arial, sans-serif",
    //   color: "#ffffff",
    //   borderRadius: "0 0 4px 4px",
    //   border: 0,
    //   padding: "12px 16px",
    //   fontSize: 16,
    //   fontWeight: 600,
    //   cursor: "pointer",
    //   display: "block",
    //   transition: "all 0.2s ease",
    //   boxShadow: "0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)",
    //   width: "100%",
    //   "&:hover": {
    //     filter: "contrast(115%)",
    //   },
    //   "&:disabled": {
    //     opacity: 0.5,
    //     cursor: "default",
    //   },
    // },
  },
}));

export default function PaymentMethod() {
  const classes = useStyles();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <React.Fragment>
      <form id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <UnelevatedButton
          disabled={processing || disabled || succeeded}
          id="submit"
          color="primary"
          variant="contained"
        >
          Pagar
        </UnelevatedButton>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
      </form>
    </React.Fragment>
  );
}
