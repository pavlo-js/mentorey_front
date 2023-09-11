import { NextApiRequest, NextApiResponse } from "next";
import db from "~/database/db";
import { RowDataPacket } from "mysql2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userID } = req.body;

  const query = `SELECT * FROM users WHERE id = ${userID}`;
  try {
    const [result] = (await db.execute(query)) as RowDataPacket[];
    res.status(200).json({ user: result[0] });
  } catch (error) {}
}
