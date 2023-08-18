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
      await dbConnect.execute(query, params);
      const getUserQuery = "SELECT * FROM users WHERE id = ?";
      const getUserParams = [userID];
      const [results] = (await dbConnect.execute(
        getUserQuery,
        getUserParams
      )) as RowDataPacket[];

      res.status(200).json({ user: results[0] });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default beCoachHandler;
