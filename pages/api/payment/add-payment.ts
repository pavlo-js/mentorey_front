import { NextApiRequest, NextApiResponse } from "next";
import db from "~/database/db";
import { RowDataPacket } from "mysql2/promise";

import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

const createLesson = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userID } = req.body;
  try {
    const account = await stripe.accounts.create({ type: "standard" });
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: "https://mentorey.co/reauth",
      return_url: "https://mentorey.co/cancel",
      type: "account_onboarding",
    });
    const query = `UPDATE users SET stripe_id = '${account.id}' WHERE id = ${userID}`;
    await db.execute(query);
    res.status(200).json({ accountLink });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default createLesson;
