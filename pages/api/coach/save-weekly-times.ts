import { RowDataPacket } from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';
import db from '~/database/db';

interface WeeklyData {
  coach_id: number;
  dayOfWeek: number;
  from: string;
  to: string;
}

const setWeeklyAvailTimes = async (req: NextApiRequest, res: NextApiResponse) => {
  const { weeklyAvailTimes } = req.body;
  const coachID = weeklyAvailTimes[0].coach_id;

  const selectQuery = `SELECT * FROM weekly_avail WHERE coach_id = ${coachID}`;
  const deleteQuery = `DELETE FROM weekly_avail WHERE coach_id = ${coachID}`;

  const insertQuery = 'INSERT INTO weekly_avail (coach_id, day_of_week, from_time, to_time) VALUES (?, ?, ?, ?)';

  try {
    const [existing] = (await db.execute(selectQuery)) as RowDataPacket[];
    // db.execute(deleteQuery);
    console.log(existing);
    if (existing.length > 0) {
      await db.execute(deleteQuery);
    }
    const promises = weeklyAvailTimes.map((item: WeeklyData) => {
      const params = [item.coach_id, item.dayOfWeek, item.from, item.to];
      return db.execute(insertQuery, params);
    });

    await Promise.all(promises);

    res.status(200);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default setWeeklyAvailTimes;
