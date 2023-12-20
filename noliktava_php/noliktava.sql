-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2023 at 10:01 AM
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
-- Table structure for table `kategorijas`
--

CREATE TABLE `kategorijas` (
  `id` int(11) NOT NULL,
  `kategorija` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategorijas`
--

INSERT INTO `kategorijas` (`id`, `kategorija`) VALUES
(1, 'CPU'),
(2, 'GPU'),
(3, 'MOBO'),
(4, 'PSU'),
(5, 'Case'),
(6, 'RAM'),
(7, 'SSD'),
(8, 'HDD'),
(9, 'CPU Cooler'),
(10, 'Fans');

-- --------------------------------------------------------

--
-- Table structure for table `plaukts`
--

CREATE TABLE `plaukts` (
  `id` int(11) NOT NULL,
  `plaukta_nr` int(11) NOT NULL,
  `stavoklis` varchar(10) NOT NULL,
  `brivas_vietas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plaukts`
--

INSERT INTO `plaukts` (`id`, `plaukta_nr`, `stavoklis`, `brivas_vietas`) VALUES
(1, 1, 'empty', 5),
(2, 2, 'full', 0),
(3, 3, 'has_space', 3);

-- --------------------------------------------------------

--
-- Table structure for table `preces`
--

CREATE TABLE `preces` (
  `id` int(11) NOT NULL,
  `nosaukums` varchar(100) NOT NULL,
  `razotajs` varchar(100) NOT NULL,
  `apraksts` varchar(200) NOT NULL,
  `kategorija` int(11) NOT NULL,
  `daudzums` int(11) NOT NULL,
  `cena` float NOT NULL,
  `plaukts` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `preces`
--

INSERT INTO `preces` (`id`, `nosaukums`, `razotajs`, `apraksts`, `kategorija`, `daudzums`, `cena`, `plaukts`) VALUES
(5, 'asdba22', 'ajsdbajd', 'askdbaskbd', 1, 0, 300, 1),
(7, 'fgjfgjd', 'ajsdbajd', 'askdbaskbd', 3, 0, 300, 2),
(8, 'asdbad', 'ajsdbajd', 'askdbaskbd', 10, 0, 300, 3),
(9, 'Nvidia RTX 20701', 'Nvidia1', 'laba manta1', 6, 3, 700, 2),
(10, 'asdasfgfh', 'dfgjhdgmcv', 'cvbmcvm', 10, 3, 700, 2),
(11, '12r131f', '23d1f24f1', '123df32f', 5, 0, 300, 1),
(12, '34g3f3d', '134gwsdf', '3fsdfsqdf', 5, 0, 300, 2),
(13, '34tf43vavas1', '4rqda1', '143g31gdafa', 8, 0, 300, 3),
(14, '4143g134g134gds', '134g134gdsafasdf', '4g423gsdgasdv1', 8, 3, 700, 2),
(15, 'fshheha', 'zvbzcvb', 'ngfnsg', 2, 3, 700, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kategorijas`
--
ALTER TABLE `kategorijas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plaukts`
--
ALTER TABLE `plaukts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `preces`
--
ALTER TABLE `preces`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategorija` (`kategorija`),
  ADD KEY `plaukts` (`plaukts`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kategorijas`
--
ALTER TABLE `kategorijas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `plaukts`
--
ALTER TABLE `plaukts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `preces`
--
ALTER TABLE `preces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `preces`
--
ALTER TABLE `preces`
  ADD CONSTRAINT `preces_ibfk_1` FOREIGN KEY (`kategorija`) REFERENCES `kategorijas` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `preces_ibfk_2` FOREIGN KEY (`plaukts`) REFERENCES `plaukts` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
