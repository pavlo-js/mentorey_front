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
  } = req.body;
  try {
    const query = `
    INSERT INTO transactions (buyer_id, coach_id, lesson_id, lesson_pack, lesson_type, timeline, channel)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      buyerID,
      coachID,
      lessonID,
      lessonPack,
      lessonType,
      timeline,
      channel,
    ];
    db.execute(query, params);
    // res.status(200).json({ coaches });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default SaveTransaction;
