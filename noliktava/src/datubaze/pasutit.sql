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
-- Table structure for table `pasutit`
--

CREATE TABLE `pasutit` (
  `id` int(11) NOT NULL,
  `razotajs` varchar(200) NOT NULL,
  `nosaukums` varchar(100) NOT NULL,
  `daudzums` int(11) NOT NULL,
  `dateOrdered` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pasutit`
--

INSERT INTO `pasutit` (`id`, `razotajs`, `nosaukums`, `daudzums`, `dateOrdered`) VALUES
(1, 'GeForce', 'RTX 3060', 6, '13.12.2023'),
(2, 'AMD', 'Radeon RX 7000', 3, '12.12.2023'),
(3, 'Intel', 'I5', 9, '10.12.2023'),
(4, 'Intel', 'i5-10400F', 3, '19.12.2023'),
(5, 'Intel', 'i5-10400F', 40, '19.12.2023'),
(6, 'Intel', 'i5-10400F', 10, '19.12.2023'),
(7, 'Intel', 'i5-10400F', 3, '20.12.2023');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pasutit`
--
ALTER TABLE `pasutit`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pasutit`
--
ALTER TABLE `pasutit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
