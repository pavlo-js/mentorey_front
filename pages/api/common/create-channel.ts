import { NextApiRequest, NextApiResponse } from 'next';
import db from '~/database/db';
import { RowDataPacket } from 'mysql2/promise';
import { nanoid } from 'nanoid';

const createChannel = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ownerID, oppositeID } = req.body;
  try {
    const query = `SELECT * FROM channels WHERE owner_id = ${ownerID} AND opposite_id = ${oppositeID}`;

    const [result] = (await db.execute(query)) as RowDataPacket[];

    if (result.length > 0) {
      res.status(200).json({ channelID: result[0].channel_id });
    } else {
      const newChannelID = `mentorey.${nanoid()}`;

      const query_1 = `INSERT INTO channels (owner_id, opposite_id, channel_id)
                        VALUES (${ownerID}, ${oppositeID}, '${newChannelID}'),
                               (${oppositeID}, ${ownerID}, '${newChannelID}')`;

      await db.execute(query_1);

      res.status(200).json({ channelID: newChannelID });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export default createChannel;

// "mentorey.EHXFkPIerZ4EQHVbXHI2I"
