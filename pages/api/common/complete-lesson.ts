import { NextApiRequest, NextApiResponse } from "next";
import db from "~/database/db";
import Stripe from "stripe";
import { RowDataPacket } from "mysql2";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

const CompleteLesson = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    lessonBookingID,
    relevance,
    expertise,
    attendance,
    interaction,
    kindness,
    feedback,
  } = req.body;
  try {
    const query = `UPDATE lesson_booking
                  SET is_completed = "completed", relevance = ${relevance}, expertise = ${expertise}, attendance = ${attendance}, interaction = ${interaction}, kindness = ${kindness}, feedback = '${feedback}'
                  WHERE id = ${lessonBookingID};`;

    await db.execute(query);

    const query_1 = `SELECT 
                        lb.*,
                        lb.id AS lesson_booking_id,
                        l.*,
                        l.id AS lesson_id_copy,
                        l.title AS lesson_title,
                        u.*,
                        u.id AS coach_user_id,
                        u.title AS coach_title,
                        c.label AS category_label
                    FROM 
                        lesson_booking lb
                    LEFT JOIN 
                        lessons l ON lb.lesson_id = l.id
                    JOIN 
                        users u ON lb.coach_id = u.id
                    LEFT JOIN 
                        category c ON l.categoryID = c.id
                    WHERE 
                        lb.id = ${lessonBookingID}`;
    const [result] = (await db.execute(query_1)) as RowDataPacket[];
    const paidCurrency = result[0].paid_currency;
    const originPrice = result[0].origin_price;
    const coachCurrency = result[0].currency;
    const stripeID = result[0].stripe_id;

    const query_2 = `SELECT data FROM currency_rates WHERE id = 0`;

    const [response] = (await db.execute(query_2)) as RowDataPacket[];

    // const currencyRates = JSON.parse(JSON.parse(response[0]).data);

    const t = response[0];
    const currencyRates = JSON.parse(t.data);

    const temp = currencyConverter(
      paidCurrency,
      coachCurrency,
      originPrice,
      currencyRates
    );
    // except the 15% fee
    const amountToPay = temp * 0.85;

    const transfer = await stripe.transfers.create({
      amount: Math.round(amountToPay * 100),
      currency: coachCurrency,
      destination: stripeID,
    });

    res.status(200);
  } catch (error) {
    res.status(500).json(error);
  }
};

function currencyConverter(
  from: string,
  to: string,
  amount: number,
  currencyRates: any
) {
  const euroAmount = from === "EUR" ? amount : amount / currencyRates[from];
  const rawConvertedAmount = euroAmount * currencyRates[to];
  const convertedAmount = parseFloat(rawConvertedAmount.toFixed(2));

  return convertedAmount;
}

export default CompleteLesson;
