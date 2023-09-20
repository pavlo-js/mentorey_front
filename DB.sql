CREATE TABLE `users` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
	`password` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
	`first_name` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`last_name` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`gender` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`country` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`birthday` DATE NULL DEFAULT NULL,
	`timezone` CHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`currency` CHAR(50) NULL DEFAULT 'USD' COLLATE 'utf8mb4_general_ci',
	`is_teacher` TINYINT(4) NULL DEFAULT '0',
	`language` VARCHAR(50) NULL DEFAULT '[\'English\']' COLLATE 'utf8mb4_general_ci',
	`user_role` CHAR(50) NULL DEFAULT 'default' COLLATE 'utf8mb4_general_ci',
	`intro_video` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`MAT` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`LS` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`trial_price` FLOAT NULL DEFAULT '5',
	`is_verified` TINYINT(1) NULL DEFAULT '0',
	`verification_token` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`verification_token_expires_at` DATETIME NULL DEFAULT NULL,
	`reset_password_token` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`reset_password_token_expires_at` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE
)

CREATE TABLE `category` (
	`id` INT NOT NULL,
	`label` CHAR(50) NULL DEFAULT NULL,
	PRIMARY KEY (`id`)
)

CREATE TABLE `lessons` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`ownerID` INT(11) NULL DEFAULT NULL,
	`title` VARCHAR(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`type` ENUM('MIN60','MIN30','MIXED') NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`price` FLOAT NULL DEFAULT NULL,
	`pack` INT(11) NULL DEFAULT NULL,
	`disRate` FLOAT NULL DEFAULT NULL,
	`categoryID` INT(11) NULL DEFAULT NULL,
	`description` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`purpose` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `ownerID` (`ownerID`) USING BTREE,
	INDEX `categoryID` (`categoryID`) USING BTREE
)

COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=17
;

ALTER TABLE your_table_name
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
