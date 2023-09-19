import { NextApiRequest, NextApiResponse } from "next";
import db from "~/database/db";
import { RowDataPacket } from "mysql2/promise";

const SaveTransaction = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    buyerID,
    coachID,
    lessonID,
    lessonPack,
    lessonType,
    timeline,
    channel,
    amount,
    currency,
    clientSecret,
    originPrice,
  } = req.body;
  try {
    const query = `
    INSERT INTO lesson_booking (buyer_id, coach_id, lesson_id, lesson_pack, lesson_type, timeline, channel, paid_amount, paid_currency, pay_transaction_id, origin_price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      buyerID,
      coachID,
      lessonID,
      lessonPack,
      lessonType,
      JSON.stringify(timeline),
      channel,
      amount,
      currency,
      clientSecret,
      originPrice,
    ];
    const result = await db.execute(query, params);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default SaveTransaction;
