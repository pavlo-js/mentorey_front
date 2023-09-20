import { NextApiRequest, NextApiResponse } from 'next';
import db from '~/database/db';
import { RowDataPacket } from 'mysql2/promise';

const getAllCoaches = async (req: NextApiRequest, res: NextApiResponse) => {
  const { myID } = req.body;
  try {
    const query = `SELECT * FROM users WHERE is_teacher = 1 AND NOT id = ${myID}`;
    const [coaches] = (await db.execute(query)) as RowDataPacket[];
    res.status(200).json({ coaches });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getAllCoaches;
