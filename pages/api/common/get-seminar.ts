import { NextApiRequest, NextApiResponse } from 'next';
import db from '~/database/db';
import { RowDataPacket } from 'mysql2/promise';

const getSeminarInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { seminarBasicID } = req.body;
  try {
    const query = `SELECT sb.*, 
                      sb.title AS seminar_title,
                      sb.language AS seminar_language,
                      u.id AS coach_id, 
                      u.title AS coach_title,
                      u.*
                  FROM seminar_basic sb
                  LEFT JOIN users u ON sb.coach_id = u.id
                  WHERE sb.id = ${seminarBasicID};`;

    const [seminarBasic] = (await db.execute(query)) as RowDataPacket[];

    const queryOne = `SELECT * FROM seminar WHERE basic_id=${seminarBasicID}`;

    const [seminarInstances] = (await db.execute(queryOne)) as RowDataPacket[];

    const queryTwo = `SELECT seminar.*, seminar_booking.*
                    FROM seminar
                    LEFT JOIN seminar_booking ON seminar.id = seminar_booking.seminar_id
                    WHERE seminar.basic_id = ${seminarBasicID};`;

    const [seminarBookings] = (await db.execute(queryTwo)) as RowDataPacket[];

    res.status(200).json({ seminarBasic, seminarInstances, seminarBookings });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getSeminarInfo;
