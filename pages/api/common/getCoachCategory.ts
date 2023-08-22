import { NextApiRequest, NextApiResponse } from "next";
import db from "~/database/db";
import { RowDataPacket } from "mysql2/promise";

const getAllCoaches = async (req: NextApiRequest, res: NextApiResponse) => {
  const { coachID } = req.body;

  try {
    const query = `SELECT DISTINCT c.id, c.label
    FROM users AS u
    INNER JOIN lessons AS l ON u.id = l.ownerID
    INNER JOIN category AS c ON l.categoryID = c.id
    WHERE u.id = ${coachID}`;
    const [categories] = (await db.execute(query)) as RowDataPacket[];
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getAllCoaches;
