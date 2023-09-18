import { NextApiRequest, NextApiResponse } from "next";
import db from "~/database/db";
import { RowDataPacket } from "mysql2/promise";

const getBookedLessonsToMe = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { coachID } = req.body;
  try {
    const query = `SELECT 
                        lb.*,
                        lb.id AS lesson_booking_id,
                        l.*,
                        l.title AS lesson_title,
                        u.*,
                        u.title AS user_title,
                        c.label AS category_label
                    FROM 
                        lesson_booking lb
                    JOIN 
                        lessons l ON lb.lesson_id = l.id
                    JOIN 
                        users u ON lb.buyer_id = u.id
                    JOIN 
                        category c ON l.categoryID = c.id
                    WHERE 
                        lb.coach_id = ${coachID} AND lb.is_completed = 'incomplete' OR lb.is_completed = 'pending'; 
                    `;
    const [lessons] = (await db.execute(query)) as RowDataPacket[];
    res.status(200).json({ lessons });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getBookedLessonsToMe;
