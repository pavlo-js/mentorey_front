import { NextApiRequest, NextApiResponse } from "next";
import db from "~/database/db";
import { RowDataPacket } from "mysql2/promise";

const createLesson = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userID } = req.body;
  try {
    const query = "SELECT * FROM lessons WHERE ownerID = ?";
    const params = [userID];
    const [lessons] = (await db.execute(query, params)) as RowDataPacket[];
    res.status(200).json({ lessons });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default createLesson;

// CREATE TABLE `lessons` (
// 	`id` INT(11) NOT NULL AUTO_INCREMENT,
// 	`ownerID` INT(11) NULL DEFAULT NULL,
// 	`title` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
// 	`type` ENUM('MIN60','MIN30','MIXED') NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
// 	`price` FLOAT NULL DEFAULT NULL,
// 	`pack` INT(11) NULL DEFAULT NULL,
// 	`disRate` FLOAT NULL DEFAULT NULL,
// 	`categoryID` INT(11) NULL DEFAULT NULL,
// 	`description` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
// 	`purpose` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
// 	`created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
// 	`updated_at` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
// 	PRIMARY KEY (`id`) USING BTREE,
// 	INDEX `ownerID` (`ownerID`) USING BTREE,
// 	INDEX `categoryID` (`categoryID`) USING BTREE
// )
// COLLATE='utf8mb4_general_ci'
// ENGINE=InnoDB
// ;
