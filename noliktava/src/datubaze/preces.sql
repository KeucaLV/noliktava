-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2023 at 12:06 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `noliktava`
--

-- --------------------------------------------------------

--
-- Table structure for table `preces`
--

CREATE TABLE `preces` (
  `id` int(11) NOT NULL,
  `nosaukums` varchar(100) NOT NULL,
  `razotajs` varchar(100) NOT NULL,
  `apraksts` varchar(200) NOT NULL,
  `cena` float NOT NULL,
  `image` varchar(150) NOT NULL,
  `daudzums` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `preces`
--

INSERT INTO `preces` (`id`, `nosaukums`, `razotajs`, `apraksts`, `cena`, `image`, `daudzums`) VALUES
(9, 'RTX 3060', 'GeForce', 'Ļoti ideāla videokarte priekš fortnite video spēles', 350, 'https://www.dateks.lv/images/pic/2400/2400/223/922.jpg', 3),
(13, 'Intel Core i7-12700KF', 'Intel', 'Ideāls variants priekš videospēlēm!', 300, 'https://www.dateks.lv/images/pic/2400/2400/924/1085.jpg', 4),
(14, 'i5-10400F', 'Intel', 'ptimizējiet datora veiktspēju, lai gūtu pieredzi, ko esat gaidījis, ar 10. paaudzes Intel® Core™ procesoros iebūvētajām mākslīgā intelekta instrukcijām. ', 116, 'https://images.1a.lv/display/aikido/store/967dd8f6f8688a1662ec0a8c0d08fb70.jpg', 10),
(16, 'Arctic Alpine 23', 'Alpine', 'Very good cooler for a mid end computer', 12, 'https://www.rdveikals.lv/images/midi/fbf1825a61480d1409ee42c581c93eb0.jpg', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `preces`
--
ALTER TABLE `preces`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `preces`
--
ALTER TABLE `preces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
