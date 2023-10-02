import { NextApiRequest, NextApiResponse } from 'next';
import db from '~/database/db';
import { RowDataPacket } from 'mysql2/promise';

const getSeminarBookings = async (req: NextApiRequest, res: NextApiResponse) => {
  const { instanceID } = req.body;
  try {
    const query = `SELECT * FROM seminar_booking WHERE seminar_id = ${instanceID}`;
    const [seminarBookings] = (await db.execute(query)) as RowDataPacket[];
    res.status(200).json({ seminarBookings });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getSeminarBookings;
