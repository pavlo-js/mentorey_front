import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe("sk_test_SlWzn8XyMbMU4QBdCo2aoHqX00zVdg9YG1", {
  apiVersion: "2023-08-16",
});

export default async function CreatePaymentIntent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency,
    });

    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error });
  }
}
