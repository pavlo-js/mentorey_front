-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.28-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for mentorey
CREATE DATABASE IF NOT EXISTS `mentorey` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `mentorey`;

-- Dumping structure for table mentorey.category
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` char(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mentorey.category: ~5 rows (approximately)
DELETE FROM `category`;
INSERT INTO `category` (`id`, `label`, `created_at`, `updated_at`) VALUES
	(1, 'Business', '2023-08-24 06:12:07', '2023-08-24 06:12:07'),
	(2, 'Wellness', '2023-08-24 06:12:33', '2023-08-24 06:12:33'),
	(3, 'Cooking', '2023-08-24 06:13:00', '2023-08-24 06:15:05'),
	(4, 'Relationship', '2023-08-24 06:15:20', '2023-08-24 06:15:20'),
	(5, 'Personal Development', '2023-08-24 06:15:56', '2023-08-24 06:15:56');

-- Dumping structure for table mentorey.channels
CREATE TABLE IF NOT EXISTS `channels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) NOT NULL DEFAULT 0,
  `opposite_id` int(11) NOT NULL DEFAULT 0,
  `channel_id` varchar(255) NOT NULL DEFAULT '0',
  `status` varchar(50) DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mentorey.channels: ~2 rows (approximately)
DELETE FROM `channels`;
INSERT INTO `channels` (`id`, `owner_id`, `opposite_id`, `channel_id`, `status`, `created_at`, `updated_at`) VALUES
	(1, 18, 17, 'mentorey.gJNeWy6CWDzg65zQ6tpZ3', 'active', '2023-09-20 19:09:29', '2023-09-20 19:09:29'),
	(2, 17, 18, 'mentorey.gJNeWy6CWDzg65zQ6tpZ3', 'active', '2023-09-20 19:09:29', '2023-09-20 19:09:29');

-- Dumping structure for table mentorey.currency_rates
CREATE TABLE IF NOT EXISTS `currency_rates` (
  `id` int(11) NOT NULL DEFAULT 0,
  `data` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mentorey.currency_rates: ~0 rows (approximately)
DELETE FROM `currency_rates`;
INSERT INTO `currency_rates` (`id`, `data`) VALUES
	(0, '{"AED":4.010526,"AFN":88.753861,"ALL":109.152403,"AMD":421.439848,"ANG":1.969057,"AOA":900.793943,"ARS":382.166124,"AUD":1.686286,"AWG":1.965366,"AZN":1.857213,"BAM":1.962333,"BBD":2.206245,"BDT":119.375248,"BGN":1.956017,"BHD":0.411632,"BIF":3092.38126,"BMD":1.09187,"BND":1.478796,"BOB":7.549373,"BRL":5.318172,"BSD":1.092628,"BTC":0.000040188832,"BTN":90.368759,"BWP":14.704812,"BYN":2.758508,"BYR":21400.654899,"BZD":2.202513,"CAD":1.478883,"CDF":2713.297357,"CHF":0.959415,"CLF":0.033885,"CLP":936.104109,"CNY":7.95395,"COP":4473.533939,"CRC":589.10194,"CUC":1.09187,"CUP":28.934559,"CVE":110.631297,"CZK":24.096704,"DJF":194.047608,"DKK":7.453804,"DOP":62.020235,"DZD":148.577906,"EGP":33.737475,"ERN":16.378052,"ETB":60.352852,"EUR":1,"FJD":2.462059,"FKP":0.865707,"GBP":0.859018,"GEL":2.877086,"GGP":0.865707,"GHS":12.488319,"GIP":0.865707,"GMD":66.439909,"GNF":9383.067041,"GTQ":8.581706,"GYD":228.768589,"HKD":8.568396,"HNL":26.902566,"HRK":7.515124,"HTG":148.080289,"HUF":379.582651,"IDR":16615.479382,"ILS":4.129778,"IMP":0.865707,"INR":90.317915,"IQD":1430.924641,"IRR":46158.810822,"ISK":142.50006,"JEP":0.865707,"JMD":168.947,"JOD":0.773155,"JPY":159.674016,"KES":158.763891,"KGS":96.36169,"KHR":4540.951772,"KMF":496.801203,"KPW":982.678132,"KRW":1445.310801,"KWD":0.336307,"KYD":0.910548,"KZT":506.141182,"LAK":21453.262745,"LBP":16421.417224,"LKR":351.318029,"LRD":203.088059,"LSL":20.210313,"LTL":3.224009,"LVL":0.660461,"LYD":5.281487,"MAD":11.037334,"MDL":19.502966,"MGA":4936.939112,"MKD":61.56708,"MMK":2294.40759,"MNT":3795.017916,"MOP":8.831513,"MRO":389.797455,"MUR":49.636234,"MVR":16.822434,"MWK":1178.705499,"MXN":18.293083,"MYR":5.06576,"MZN":69.060732,"NAD":20.210419,"NGN":808.538857,"NIO":39.982932,"NOK":11.569641,"NPR":144.589814,"NZD":1.830559,"OMR":0.420373,"PAB":1.092628,"PEN":4.030111,"PGK":3.948749,"PHP":61.935792,"PKR":332.689803,"PLN":4.470652,"PYG":7952.675542,"QAR":3.975468,"RON":4.9406,"RSD":117.307165,"RUB":104.983599,"RWF":1302.906487,"SAR":4.095769,"SBD":9.138429,"SCR":14.395057,"SDG":649.429897,"SEK":11.836031,"SGD":1.473894,"SHP":1.328533,"SLE":24.362359,"SLL":21564.435123,"SOS":620.731734,"SSP":656.756323,"SRD":41.843192,"STD":22599.507584,"SYP":14195.49382,"SZL":20.295477,"THB":38.237243,"TJS":12.001949,"TMT":3.832464,"TND":3.376607,"TOP":2.603073,"TRY":29.164509,"TTD":7.415943,"TWD":34.766779,"TZS":2735.13443,"UAH":40.350573,"UGX":4066.519986,"USD":1.09187,"UYU":41.207191,"UZS":13210.98314,"VEF":3536582.789902,"VES":35.090875,"VND":26346.826669,"VUV":132.754617,"WST":3.040567,"XAF":658.136068,"XAG":0.044378,"XAU":0.000562,"XCD":2.950834,"XDR":0.823519,"XOF":658.145139,"XPF":120.892307,"YER":273.349495,"ZAR":20.411671,"ZMK":9828.152287,"ZMW":21.824461,"ZWL":351.581742}');

-- Dumping structure for table mentorey.lessons
CREATE TABLE IF NOT EXISTS `lessons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ownerID` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `pack` int(11) DEFAULT NULL,
  `disRate` float DEFAULT NULL,
  `categoryID` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `purpose` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE,
  KEY `ownerID` (`ownerID`) USING BTREE,
  KEY `categoryID` (`categoryID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mentorey.lessons: ~3 rows (approximately)
DELETE FROM `lessons`;
INSERT INTO `lessons` (`id`, `ownerID`, `title`, `price`, `pack`, `disRate`, `categoryID`, `description`, `purpose`, `created_at`, `updated_at`) VALUES
	(1, 17, 'Test Lesson', 15, 1, 0, 3, 'Description. Description. Description. Description. Description. Description. ', 'Purpose. Purpose. Purpose. Purpose. Purpose. Purpose. Purpose. Purpose. ', '2023-08-30 12:41:57', '2023-08-30 12:41:57'),
	(2, 17, 'Second Lesson', 19, 10, 20, 4, 'Desc. Desc. Desc. Desc. Desc. Desc. Desc. Desc. Desc. Desc. Desc. Desc. Desc. ', 'Purp.Purp.Purp.Purp.Purp.Purp.Purp.Purp.Purp.Purp.Purp.Purp.Purp.Purp.Purp.Purp.', '2023-08-30 12:42:30', '2023-08-30 12:42:30'),
	(3, 17, 'Hello Lesson', 45, 7, 14, 4, 'This is Hello Lesson. This is Hello Lesson. This is Hello Lesson. This is Hello Lesson. This is Hello Lesson. This is Hello Lesson. ', 'Hello Lesson is good. Hello Lesson is good. Hello Lesson is good. Hello Lesson is good. ', '2023-08-31 19:28:57', '2023-08-31 19:28:57'),
	(4, 17, 'How to make a Pizza', 10, 1, 0, 3, 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo reprehenderit saepe omnis cum repellat dolorem fugit recusandae autem odio, obcaecati est, quis deleniti, delectus doloremque quas suscipit? Totam, delectus tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo reprehenderit saepe omnis cum repellat dolorem fugit recusandae autem odio, obcaecati est, quis deleniti, delectus doloremque quas suscipit? Totam, delectus tenetur.', 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo reprehenderit saepe omnis cum repellat dolorem fugit recusandae autem odio, obcaecati est, quis deleniti, delectus doloremque quas suscipit? Totam, delectus tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo reprehenderit saepe omnis cum repellat dolorem fugit recusandae autem odio, obcaecati est, quis deleniti, delectus doloremque quas suscipit? Totam, delectus tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo reprehenderit saepe omnis cum repellat dolorem fugit recusandae autem odio, obcaecati est, quis deleniti, delectus doloremque quas suscipit? Totam, delectus tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo reprehenderit saepe omnis cum repellat dolorem fugit recusandae autem odio, obcaecati est, quis deleniti, delectus doloremque quas suscipit? Totam, delectus tenetur.', '2023-09-14 21:33:11', '2023-09-14 21:33:11');

-- Dumping structure for table mentorey.lesson_booking
CREATE TABLE IF NOT EXISTS `lesson_booking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `buyer_id` int(11) NOT NULL DEFAULT 0,
  `coach_id` int(11) NOT NULL DEFAULT 0,
  `lesson_id` int(11) NOT NULL DEFAULT 0,
  `lesson_pack` int(11) NOT NULL DEFAULT 0,
  `lesson_type` char(50) NOT NULL DEFAULT '0',
  `start_time` varchar(50) DEFAULT NULL,
  `end_time` varchar(50) DEFAULT NULL,
  `channel` varchar(50) NOT NULL DEFAULT '0',
  `is_completed` varchar(50) NOT NULL DEFAULT 'incomplete',
  `feedback` text DEFAULT NULL,
  `relevance` tinyint(4) DEFAULT NULL,
  `interaction` tinyint(4) DEFAULT NULL,
  `expertise` tinyint(4) DEFAULT NULL,
  `attendance` tinyint(4) DEFAULT NULL,
  `kindness` tinyint(4) DEFAULT NULL,
  `origin_price` float DEFAULT NULL,
  `paid_amount` float DEFAULT NULL,
  `paid_currency` varchar(50) DEFAULT NULL,
  `pay_transaction_id` varchar(255) DEFAULT NULL,
  `feedback_time` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mentorey.lesson_booking: ~3 rows (approximately)
DELETE FROM `lesson_booking`;
INSERT INTO `lesson_booking` (`id`, `buyer_id`, `coach_id`, `lesson_id`, `lesson_pack`, `lesson_type`, `start_time`, `end_time`, `channel`, `is_completed`, `feedback`, `relevance`, `interaction`, `expertise`, `attendance`, `kindness`, `origin_price`, `paid_amount`, `paid_currency`, `pay_transaction_id`, `feedback_time`, `created_at`, `updated_at`) VALUES
	(1, 18, 17, 3, 7, 'MIN60', '2023-09-25T08:00', '2023-09-25T09:00', 'discord', 'incomplete', 'Hello Lesson', 5, 4, 5, 5, 5, 295.76, 305.91, 'USD', 'pi_3Ns8i0HUgHwu5Evx0ay3LI8b_secret_LxnlISk5TOL9MT1iNm1HXMIK7', NULL, '2023-09-28 01:36:06', '2023-09-28 01:36:06'),
	(2, 18, 17, 3, 7, 'MIN30', '2023-09-28T23:30', '2023-09-29T01:00', 'zoom', 'incomplete', 'ddd', 5, 3, 2, 4, 4, 147.88, 153.45, 'USD', 'pi_3Ns8s7HUgHwu5Evx15kvDx2l_secret_WDT5mA3qbJgewAY6GStBqPFx5', NULL, '2023-09-28 01:36:06', '2023-09-28 01:36:06'),
	(3, 18, 17, 3, 7, 'MIN90', '0', NULL, 'discord', 'completed', 'hello', 0, 4, 5, 4, 3, 443.64, 435.44, 'USD', 'pi_3Ns8yvHUgHwu5Evx0FP12C73_secret_TgFg83QeqBfN9bXChbCS29vKL', NULL, '2023-09-28 01:36:06', '2023-09-28 01:36:06');

-- Dumping structure for table mentorey.override_avail
CREATE TABLE IF NOT EXISTS `override_avail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `coach_id` int(11) DEFAULT NULL,
  `date` varchar(50) DEFAULT NULL,
  `from_time` tinyint(4) DEFAULT NULL,
  `to_time` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mentorey.override_avail: ~2 rows (approximately)
DELETE FROM `override_avail`;
INSERT INTO `override_avail` (`id`, `coach_id`, `date`, `from_time`, `to_time`, `created_at`, `updated_at`) VALUES
	(1, 17, '2023-09-30', 18, 34, '2023-09-28 01:36:22', '2023-09-28 01:36:22'),
	(2, 17, '2023-10-01', 18, 30, '2023-09-28 01:36:22', '2023-09-28 01:36:22');

-- Dumping structure for table mentorey.seminar
CREATE TABLE IF NOT EXISTS `seminar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `basic_id` int(11) NOT NULL DEFAULT 0,
  `timeline` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mentorey.seminar: ~0 rows (approximately)
DELETE FROM `seminar`;

-- Dumping structure for table mentorey.seminar_basic
CREATE TABLE IF NOT EXISTS `seminar_basic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '',
  `coach_id` int(11) NOT NULL DEFAULT 0,
  `category_id` int(11) NOT NULL DEFAULT 0,
  `price` float NOT NULL DEFAULT 0,
  `description` text NOT NULL,
  `purpose` text NOT NULL,
  `banner` text NOT NULL,
  `max_pupil_num` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mentorey.seminar_basic: ~0 rows (approximately)
DELETE FROM `seminar_basic`;

-- Dumping structure for table mentorey.seminar_booking
CREATE TABLE IF NOT EXISTS `seminar_booking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seminar_id` int(11) NOT NULL DEFAULT 0,
  `buyer_id` int(11) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'incomplete',
  `paid_amount` float DEFAULT NULL,
  `paid_currency` varchar(50) DEFAULT NULL,
  `pay_transaction_id` varchar(255) DEFAULT NULL,
  `feedback` text DEFAULT NULL,
  `relevance` tinyint(4) DEFAULT NULL,
  `interaction` tinyint(4) DEFAULT NULL,
  `expertise` tinyint(4) DEFAULT NULL,
  `attendance` tinyint(4) DEFAULT NULL,
  `kindness` tinyint(4) DEFAULT NULL,
  `channel` varchar(50) NOT NULL DEFAULT '0',
  `origin_price` float DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mentorey.seminar_booking: ~0 rows (approximately)
DELETE FROM `seminar_booking`;

-- Dumping structure for table mentorey.transactions
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `buyer_id` varchar(50) DEFAULT NULL,
  `coach_id` varchar(50) DEFAULT NULL,
  `lesson_id` varchar(50) DEFAULT NULL,
  `lesson_pack` int(11) DEFAULT NULL,
  `lesson_type` varchar(50) DEFAULT NULL,
  `timeline` varchar(255) DEFAULT NULL,
  `channel` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mentorey.transactions: ~0 rows (approximately)
DELETE FROM `transactions`;

-- Dumping structure for table mentorey.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `balance` float DEFAULT 0,
  `avatar` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `timezone` char(50) DEFAULT NULL,
  `currency` char(50) DEFAULT 'EUR',
  `is_teacher` tinyint(4) DEFAULT 0,
  `language` varchar(255) DEFAULT '[''English'']',
  `user_role` char(50) DEFAULT 'default',
  `intro_video` varchar(255) DEFAULT NULL,
  `skype` varchar(255) DEFAULT NULL,
  `slack` varchar(255) DEFAULT NULL,
  `discord` varchar(255) DEFAULT NULL,
  `hangouts` varchar(255) DEFAULT NULL,
  `zoom` varchar(255) DEFAULT NULL,
  `profile` text DEFAULT NULL,
  `MAT` text DEFAULT NULL,
  `LS` text DEFAULT NULL,
  `trial_price` float DEFAULT 5,
  `is_verified` tinyint(1) DEFAULT 0,
  `stripe_id` varchar(255) DEFAULT NULL,
  `verification_token` varchar(255) DEFAULT NULL,
  `verification_token_expires_at` datetime DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `reset_password_token_expires_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mentorey.users: ~4 rows (approximately)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `email`, `password`, `first_name`, `last_name`, `phone`, `gender`, `country`, `balance`, `avatar`, `title`, `birthday`, `timezone`, `currency`, `is_teacher`, `language`, `user_role`, `intro_video`, `skype`, `slack`, `discord`, `hangouts`, `zoom`, `profile`, `MAT`, `LS`, `trial_price`, `is_verified`, `stripe_id`, `verification_token`, `verification_token_expires_at`, `reset_password_token`, `reset_password_token_expires_at`, `created_at`, `updated_at`) VALUES
	(17, 'e@e.com', '$2b$10$rkpdZMWPqfpQhbnEsMUcH..aZzYORLuA.D/Rq3NR1gukF2SzsAN..', 'silver', 'girl', 'null', 'MALE', 'CH', NULL, 'https://mentorey.s3.eu-central-1.amazonaws.com/avatar/KCUIWIArYziW-_gzRaJ_x.png', 'Professional Teacher', '2023-08-06', 'Asia/Tokyo', 'EUR', 1, '["English","Haitian","Indonesian"]', 'default', 'https://mentorey.s3.eu-central-1.amazonaws.com/intro_video/G-za6XtPDJ4tLfsq8_xeV.mp4', 'https://skype.com', 'https://slack.com', 'https://discord.com', '', 'https://zoom.com', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, rerum? Fuga eum consequatur aliquam quasi ducimus repellat voluptatibus hic rerum assumenda possimus mollitia non excepturi, unde libero a. Doloribus, tempore.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, rerum? Fuga eum consequatur aliquam quasi ducimus repellat voluptatibus hic rerum assumenda possimus mollitia non excepturi, unde libero a. Doloribus, tempore.', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, rerum? Fuga eum consequatur aliquam quasi ducimus repellat voluptatibus hic rerum assumenda possimus mollitia non excepturi, unde libero a. Doloribus, tempore.', 5, 1, 'acct_1NrrAVQeX11vIkPn', '865885', '2023-08-24 11:50:08', NULL, NULL, '2023-08-23 20:50:08', '2023-09-24 01:42:07'),
	(18, 'a@a.com', '$2b$10$/qRmg7pKmOcgBWf0KyG0pub9RFBp9RGhcAdBKg7sfH4GHIrGNWA4K', 'best', 'wing', NULL, 'MALE', 'BJ', NULL, NULL, NULL, '2023-08-08', 'America/Belem', 'USD', 0, '[\'English\']', 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, 1, NULL, '703071', '2023-08-31 03:43:31', NULL, NULL, '2023-08-30 12:43:31', '2023-09-26 16:52:06'),
	(19, 'q@q.com', '$2b$10$HGAfkScibCuRzxQCIuCNz.kXcjtdaRk9J4SKMJZEZyYoJ8Ee6ZO4S', '智也', '飯田', NULL, 'FEMALE', 'AM', NULL, NULL, NULL, '2023-09-04', 'Asia/Tokyo', 'EUR', 0, '[\'English\']', 'default', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, 1, NULL, 'vvvvv', '2023-09-10 20:59:06', NULL, NULL, '2023-09-10 05:59:06', '2023-09-10 06:00:28'),
	(20, 't@t.com', '$2b$10$mZ5gr5f555PtXHXVUjmw..NQrFpesatGJ1N9zeZRer8W71ZVk6qdC', 'Dragon', 'Chan', 'null', 'MALE', 'AM', 0, 'null', 'Fullstack web developer', '2012-12-11', 'Asia/Yakutsk', 'AUD', 1, '["English"]', 'default', 'https://mentorey.s3.eu-central-1.amazonaws.com/intro_video/d1Bx1uSsdO74vewd5xl3l.mp4', 'null', 'null', 'null', 'null', 'null', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos tempora fugiat rerum facilis ex? Facilis fugit porro necessitatibus laboriosam aliquam distinctio molestiae, autem deleniti beatae, tempore molestias corporis at asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos tempora fugiat rerum facilis ex? Facilis fugit porro necessitatibus laboriosam aliquam distinctio molestiae, autem deleniti beatae, tempore molestias corporis at asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos tempora fugiat rerum facilis ex? Facilis fugit porro necessitatibus laboriosam aliquam distinctio molestiae, autem deleniti beatae, tempore molestias corporis at aspe', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos tempora fugiat rerum facilis ex? Facilis fugit porro necessitatibus laboriosam aliquam distinctio molestiae, autem deleniti beatae, tempore molestias corporis at asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos tempora fugiat rerum facilis ex? Facilis fugit porro necessitatibus laboriosam aliquam distinctio molestiae, autem deleniti beatae, tempore molestias corporis at asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos tempora fugiat rerum facilis ex? Facilis fugit porro necessitatibus laboriosam aliquam distinctio molestiae, autem deleniti beatae, tempore molestias corporis at aspe', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos tempora fugiat rerum facilis ex? Facilis fugit porro necessitatibus laboriosam aliquam distinctio molestiae, autem deleniti beatae, tempore molestias corporis at asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos tempora fugiat rerum facilis ex? Facilis fugit porro necessitatibus laboriosam aliquam distinctio molestiae, autem deleniti beatae, tempore molestias corporis at asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos tempora fugiat rerum facilis ex? Facilis fugit porro necessitatibus laboriosam aliquam distinctio molestiae, autem deleniti beatae, tempore molestias corporis at aspe', 5, 1, '', '072333', '2023-09-21 03:18:22', NULL, NULL, '2023-09-20 12:18:22', '2023-09-20 12:34:16');

-- Dumping structure for table mentorey.weekly_avail
CREATE TABLE IF NOT EXISTS `weekly_avail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `coach_id` int(11) DEFAULT NULL,
  `day_of_week` tinyint(4) DEFAULT NULL,
  `from_time` tinyint(4) DEFAULT NULL,
  `to_time` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mentorey.weekly_avail: ~6 rows (approximately)
DELETE FROM `weekly_avail`;
INSERT INTO `weekly_avail` (`id`, `coach_id`, `day_of_week`, `from_time`, `to_time`) VALUES
	(12, 17, 0, 0, 34),
	(13, 17, 1, 18, 34),
	(14, 17, 2, 36, 38),
	(15, 17, 3, 18, 34),
	(16, 17, 2, 18, 34),
	(17, 17, 4, 18, 34);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
