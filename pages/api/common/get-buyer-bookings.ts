import { NextApiRequest, NextApiResponse } from 'next';
import db from '~/database/db';
import { RowDataPacket } from 'mysql2/promise';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { buyerID } = req.body;
  try {
    const query = `SELECT * FROM lesson_booking WHERE buyer_id = ${buyerID} AND is_completed = 'incomplete';`;

    const [buery_bookings] = (await db.execute(query)) as RowDataPacket[];

    res.status(200).json({ buery_bookings });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
