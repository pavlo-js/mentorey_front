import { NextApiRequest, NextApiResponse } from "next";
import db from "~/database/db";

interface WeeklyData {
  coach_id: number;
  dayOfWeek: number;
  from: string;
  to: string;
}

const setWeeklyAvailTimes = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { weeklyAvailTimes } = req.body;

  const query =
    "INSERT INTO weekly_avail (coach_id, day_of_week, from_time, to_time) VALUES (?, ?, ?, ?)";

  try {
    const promises = weeklyAvailTimes.map((item: WeeklyData) => {
      const params = [item.coach_id, item.dayOfWeek, item.from, item.to];
      return db.execute(query, params);
    });

    await Promise.all(promises);

    res.status(200).send({ message: "ok" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default setWeeklyAvailTimes;
