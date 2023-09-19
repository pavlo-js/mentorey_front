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

    const query_1 = `SELECT * FROM lesson_booking WHERE id = ${lessonBookingID}`;
    const [result] = (await db.execute(query_1)) as RowDataPacket[];
    const paid_currency = result[0].paid_currency;
    const paid_amount = result[0].paid_amount;

    res.status(200);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default CompleteLesson;
