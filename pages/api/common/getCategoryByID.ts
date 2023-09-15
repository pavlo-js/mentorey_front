import { NextApiRequest, NextApiResponse } from "next";
import db from "~/database/db";
import { RowDataPacket } from "mysql2/promise";

const getCategoryByID = async (req: NextApiRequest, res: NextApiResponse) => {
  const { categoryID } = req.body;
  try {
    const query = "SELECT * FROM category WHERE id = ?";
    const params = [categoryID];
    const [category] = (await db.execute(query, params)) as RowDataPacket[];
    res.status(200).json({ category: category[0] });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getCategoryByID;
