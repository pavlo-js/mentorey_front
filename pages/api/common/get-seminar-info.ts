import { NextApiRequest, NextApiResponse } from 'next';
import db from '~/database/db';
import { RowDataPacket } from 'mysql2/promise';

const getSeminarInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { seminarBasicID } = req.body;
  try {
    const query = `SELECT seminar.*, seminar_booking.*
                    FROM seminar
                    LEFT JOIN seminar_booking ON seminar.id = seminar_booking.seminar_id
                    WHERE seminar.basic_id = ${seminarBasicID};`;

    const [instances] = (await db.execute(query)) as RowDataPacket[];

    res.status(200).json({ instances });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getSeminarInfo;
