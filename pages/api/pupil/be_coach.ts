import { NextApiRequest, NextApiResponse } from "next";
import createConnection from "~/database/db";
import { RowDataPacket } from "mysql2/promise";
import bcrypt from "bcrypt";

const beCoachHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { userID, intro_video, MAT, LS } = req.body;

    try {
      const dbConnect = await createConnection();
      const query =
        "UPDATE users SET is_teacher = 1, intro_video = ?, MAT = ?, LS = ? WHERE id = ?";
      const params = [intro_video, MAT, LS, userID];
      const [results] = (await dbConnect.execute(
        query,
        params
      )) as RowDataPacket[];
      res.status(200);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default beCoachHandler;
