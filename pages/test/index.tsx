import axios from "axios";
import { useEffect } from "react";

function CheckoutButton() {
  const handleCheckout = async () => {
    console.log("clickes");
    try {
      // Call the backend to create a checkout sessio

      const { data: response } = await axios.post(
        "/api/payment/create-checkout-session"
      );

      const sessionId = response.sessionId;

      // Use Stripe.js to redirect to the Checkout page

      if (typeof window !== "undefined" && window.Stripe) {
        const stripe = window.Stripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
        );
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({ sessionId });

          if (error) {
            console.error(error);
          }
        } else {
          console.error("Stripe is not available.");
        }
      }
    } catch (error) {
      console.error("There was an issue:", error);
    }
  };

  return <button onClick={handleCheckout}>Checkout</button>;
}

export default CheckoutButton;
