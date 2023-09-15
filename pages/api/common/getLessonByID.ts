import { NextApiRequest, NextApiResponse } from "next";
import db from "~/database/db";
import { RowDataPacket } from "mysql2/promise";

const getLessonByID = async (req: NextApiRequest, res: NextApiResponse) => {
  const { lessonID } = req.body;
  try {
    const query = "SELECT * FROM lessons WHERE id = ?";
    const params = [lessonID];
    const [lesson] = (await db.execute(query, params)) as RowDataPacket[];
    res.status(200).json({ lesson: lesson[0] });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default getLessonByID;
