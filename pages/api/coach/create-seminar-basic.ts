import { NextApiRequest, NextApiResponse } from 'next';
import db from '~/database/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

const CreateSeminarBasic = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    coachID,
    title,
    category,
    max_people,
    price,
    duration,
    description,
    purpose,
    banner,
    language,
    communication,
  } = req.body;
  try {
    const query =
      'INSERT INTO seminar_basic (title, coach_id, max_pupil_num, category_id, price, duration, description, purpose, banner, language, communication_tool) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [
      title,
      coachID,
      max_people,
      category,
      price,
      duration,
      description,
      purpose,
      banner,
      language,
      communication,
    ];
    const result = (await db.execute(query, params)) as ResultSetHeader[];
    const newSeminarID = result[0].insertId;
    res.status(200).json({ newSeminarID });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default CreateSeminarBasic;
