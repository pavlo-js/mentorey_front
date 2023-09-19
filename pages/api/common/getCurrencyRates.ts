import { NextApiRequest, NextApiResponse } from "next";
import db from "~/database/db";
import { RowDataPacket } from "mysql2";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = `SELECT data FROM currency_rates WHERE id = 0`;
  try {
    const [result] = (await db.execute(query)) as RowDataPacket[];
    res.status(200).json(result[0]);
  } catch (error) {
    res.status(500).json(error);
  }
}
