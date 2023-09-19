import { NextApiRequest, NextApiResponse } from "next";
import db from "~/database/db";
import { RowDataPacket } from "mysql2/promise";

const getMyLessons = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userID } = req.body;
  try {
    const query = `SELECT 
                      lb.*,
                      lb.id AS lesson_booking_id,
                      l.*,
                      l.title AS lesson_title,
                      u.*,
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
                      lb.buyer_id = ${userID};`;

    const [lessons] = (await db.execute(query)) as RowDataPacket[];

    res.status(200).json({ lessons });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getMyLessons;
