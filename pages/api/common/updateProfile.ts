import { NextApiRequest, NextApiResponse } from "next";
import db from "~/database/db";
import { RowDataPacket } from "mysql2";

const updateProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    id,
    first_name,
    last_name,
    avatar,
    timezone,
    birthday,
    gender,
    country,
    language,
    currency,
    phone,
    title,
    profile,
    intro_video,
    MAT,
    LS,
    skype,
    slack,
    zoom,
    discord,
    hangouts,
  } = req.body;
  try {
    const updateUserQuery = `UPDATE users
                   SET first_name = '${first_name}',
                   last_name = '${last_name}',
                   avatar = '${avatar}',
                   timezone = '${timezone}',
                   birthday = '${birthday}',
                   gender = '${gender}',
                   country = '${country}',
                   language = '${language}',
                   currency = '${currency}',
                   phone = '${phone}',
                   title = '${title}',
                   profile = '${profile}',
                   intro_video = '${intro_video}',
                   MAT = '${MAT}',
                   LS = '${LS}',
                   skype = '${skype}',
                   slack = '${slack}',
                   zoom = '${zoom}',
                   discord = '${discord}',
                   hangouts = '${hangouts}'
                   WHERE id = ${id}`;
    await db.execute(updateUserQuery);

    const selectUserQuery = `SELECT * FROM users WHERE id = '${id}'`;
    const [user] = (await db.execute(selectUserQuery)) as RowDataPacket[];

    res.status(200).json({ user: user[0] });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default updateProfile;
