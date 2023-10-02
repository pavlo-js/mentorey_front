import { NextApiRequest, NextApiResponse } from 'next';
import db from '~/database/db';
import { RowDataPacket } from 'mysql2/promise';

const getAllActiveSeminars = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = `SELECT sb.*, u.*, 
                    sb.id AS seminar_basic_id,
                    sb.title AS seminar_title
                    FROM seminar_basic sb
                    JOIN users u ON sb.coach_id = u.id
                    WHERE EXISTS (
                      SELECT 1
                      FROM seminar s
                      WHERE s.basic_id = sb.id
                        AND s.status = 'active'
                    );`;
    const [seminars] = (await db.execute(query)) as RowDataPacket[];
    res.status(200).json({ seminars });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getAllActiveSeminars;
