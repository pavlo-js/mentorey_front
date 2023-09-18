import { NextApiRequest, NextApiResponse } from "next";
import db from "~/database/db";

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
    res.status(200);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default CompleteLesson;
