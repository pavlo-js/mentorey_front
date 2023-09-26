import { NextApiRequest, NextApiResponse } from "next";
import db from "~/database/db";
import { RowDataPacket } from "mysql2/promise";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { coachID } = req.body;
  try {
    const query_1 = "SELECT * FROM weekly_avail WHERE coach_id = ?";
    const query_2 = "SELECT * FROM override_avail WHERE coach_id = ?";
    const params = [coachID];
    const [weekly_avail] = (await db.execute(
      query_1,
      params
    )) as RowDataPacket[];

    const [override_avail] = (await db.execute(
      query_2,
      params
    )) as RowDataPacket[];

    res.status(200).json({ weekly_avail, override_avail });
  } catch (error) {
    res.status(500).json(error);
  }
}
