import { NextApiRequest, NextApiResponse } from 'next';
import db from '~/database/db';

interface OverrideData {
  coach_id: number;
  date: string;
  from: string;
  to: string;
}

const setOverrideTimes = async (req: NextApiRequest, res: NextApiResponse) => {
  const { overrideTimes, coachID } = req.body;

  const deleteQuery = `DELETE FROM override_avail WHERE coach_id = ${coachID}`;
  const query = 'INSERT INTO override_avail (coach_id, date, from_time, to_time) VALUES (?, ?, ?, ?)';

  try {
    await db.execute(deleteQuery);
    const promises = overrideTimes.map((item: OverrideData) => {
      const params = [item.coach_id, item.date, item.from, item.to];
      return db.execute(query, params);
    });

    await Promise.all(promises);

    res.status(200).send({ message: 'ok' });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default setOverrideTimes;
