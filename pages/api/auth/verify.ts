import { NextApiRequest, NextApiResponse } from "next";
import db from "~/database/db";
import { RowDataPacket } from "mysql2/promise";

const verifyHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { userID, token } = req.body;

    try {
      const query =
        "SELECT * FROM users WHERE id = ? AND verification_token = ?";
      const params = [userID, token];
      const [getUser] = (await db.execute(query, params)) as RowDataPacket[];

      if (getUser.length > 0) {
        const query = "UPDATE users SET is_verified = ? WHERE id = ? ";
        const params = [1, userID];
        const [updateResult] = (await db.execute(
          query,
          params
        )) as RowDataPacket[];
        if (updateResult.affectedRows === 1)
          res.status(200).json({ message: "success" });
      } else if (getUser.length == 0) {
        res.status(400).json({ messge: "user_not_found" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default verifyHandler;
