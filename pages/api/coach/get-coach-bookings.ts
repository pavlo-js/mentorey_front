import { NextApiRequest, NextApiResponse } from 'next';
import db from '~/database/db';
import { RowDataPacket } from 'mysql2/promise';

const getCoachBookings = async (req: NextApiRequest, res: NextApiResponse) => {
  const { coachID } = req.body;
  try {
    const query = `SELECT * FROM lesson_booking WHERE coach_id = ${coachID} AND is_completed = 'incomplete';`;
    const [coach_bookings] = (await db.execute(query)) as RowDataPacket[];
    res.status(200).json({ coach_bookings });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getCoachBookings;
