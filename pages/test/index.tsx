import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";

const stripePromise = loadStripe("pk_test_gktDH2EZfKhkRYLkJGwjQQuQ00O15ZHjaO");

export default function App() {
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const { data: response } = await axios.post(
          "/api/payment/create-payment-intent"
        );

        setClientSecret(response.client_secret);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClientSecret();
  }, []);

  const options = {
    clientSecret: clientSecret,
  };

  return (
    clientSecret && (
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    )
  );
}
