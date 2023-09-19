import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

export default async function CreatePaymentIntent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { amount, currency } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency,
    });

    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error });
  }
}
