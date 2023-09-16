import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Your Product Name",
              },
              unit_amount: 2000, // $20.00
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/test",
        cancel_url: "https://localhost:3000/",
      });
      if (session.url) {
        res.status(200).send(session.url);
      }
    } catch (error: any) {
      res.status(400).json({ error: { message: error.message } });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
