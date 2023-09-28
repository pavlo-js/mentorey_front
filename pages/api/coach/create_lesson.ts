import { NextApiRequest, NextApiResponse } from 'next';
import db from '~/database/db';

const createLesson = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userID, lessonPack, disRate, lessonTitle, lessonCategory, price, description, purpose } = req.body;
  try {
    const query =
      'INSERT INTO lessons (ownerID, title, price, pack, disRate, categoryID, description, purpose) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [userID, lessonTitle, price, lessonPack, disRate, lessonCategory, description, purpose];
    await db.execute(query, params);
    res.status(200).send('success');
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
// 	PRIMARY KEY (`id`) USING BTREE,
// 	INDEX `ownerID` (`ownerID`) USING BTREE,
// 	INDEX `categoryID` (`categoryID`) USING BTREE
// )
// COLLATE='utf8mb4_general_ci'
// ENGINE=InnoDB
// ;
