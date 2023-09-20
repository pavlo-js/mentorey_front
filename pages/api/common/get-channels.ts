import { NextApiRequest, NextApiResponse } from 'next';
import db from '~/database/db';
import { RowDataPacket } from 'mysql2/promise';

const getMyLessons = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ownerID } = req.body;
  try {
    const query = `SELECT 
                        c.*,
                        u.*,
                        u.id AS opposite_user_id
                    FROM channels c
                    INNER JOIN users u ON c.opposite_id = u.id
                    WHERE c.owner_id = ${ownerID};`;

    const [channels] = (await db.execute(query)) as RowDataPacket[];

    res.status(200).json({ channels });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getMyLessons;
