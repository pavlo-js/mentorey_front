import { NextApiRequest, NextApiResponse } from "next";
import createConnection from "~/database/db";
import { RowDataPacket } from "mysql2/promise";

const getAllCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const dbConnect = await createConnection();
    const query = "SELECT * FROM category";
    const [categories] = (await dbConnect.execute(query)) as RowDataPacket[];
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getAllCategories;
