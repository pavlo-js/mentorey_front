import { NextApiRequest, NextApiResponse } from 'next';
import db from '~/database/db';
import { RowDataPacket } from 'mysql2/promise';
import { DateTime } from 'luxon';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { seminarID, startTimes } = req.body;
  try {
    await startTimes.map(async (time: string) => {
      const query = `INSERT INTO seminar (basic_id, start_time) VALUES (${seminarID}, '${time}');`;
      await db.execute(query);
    });

    res.status(200);
  } catch (error) {
    res.status(500).json(error);
  }
}
