-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.7.14-log - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 test_vue 的数据库结构
CREATE DATABASE IF NOT EXISTS `test_vue` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `test_vue`;

-- 导出  表 test_vue.vue_ 结构
CREATE TABLE IF NOT EXISTS `vue_` (
  `id` varchar(50) NOT NULL DEFAULT '' COMMENT 'index',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT 'question',
  `checkstate` tinyint(4) NOT NULL DEFAULT '0',
  `flag` varchar(50) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='关于vue，todomvc测试';

-- 正在导出表  test_vue.vue_ 的数据：~8 rows (大约)
/*!40000 ALTER TABLE `vue_` DISABLE KEYS */;
INSERT INTO `vue_` (`id`, `name`, `checkstate`, `flag`) VALUES
	('1', 'sdasda', 0, '0'),
	('2', '啊大苏打似的', 1, '0'),
	('3', 'abc', 1, '0'),
	('4', 'bcd', 1, '0'),
	('5', '撒大苏打', 1, '0'),
	('1', 'sdasda', 1, '2'),
	('2', '啊大苏打似的', 0, '2'),
	('1', 'sdasda', 1, '2'),
	('1', 'sdasda', 1, '2'),
	('1', 'asdasdas', 1, '2');
/*!40000 ALTER TABLE `vue_` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
