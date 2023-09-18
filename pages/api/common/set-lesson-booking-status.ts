import { NextApiRequest, NextApiResponse } from "next";
import db from "~/database/db";

const setLessonBookingStatus = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { lessonBookingID, status } = req.body;
  try {
    const query = `
      UPDATE lesson_booking
      SET is_completed = '${status}'
      WHERE id = ${lessonBookingID}
    `;
    await db.execute(query);
    res.status(200);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default setLessonBookingStatus;
