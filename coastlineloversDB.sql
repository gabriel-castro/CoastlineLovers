-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2020 at 05:56 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coastlinelovers`
--
CREATE DATABASE IF NOT EXISTS `coastlinelovers` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `coastlinelovers`;

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `ID` int(11) NOT NULL,
  `primeiroNome` varchar(100) NOT NULL,
  `ultimoNome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(50) NOT NULL,
  `tour` varchar(20) NOT NULL,
  `lugares` int(2) NOT NULL,
  `bebes` int(2) NOT NULL,
  `observacoes` varchar(500) DEFAULT NULL,
  `data` date NOT NULL,
  `hora` varchar(50) NOT NULL,
  `preco` int(6) NOT NULL,
  `aReceber` varchar(1000) DEFAULT NULL,
  `aPagar` varchar(1000) DEFAULT NULL,
  `info_apagada` varchar(10000) DEFAULT NULL,
  `promotor` varchar(200) DEFAULT NULL,
  `stripeID` varchar(400) DEFAULT NULL,
  `codigoPromo` varchar(200) DEFAULT NULL,
  `oldID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`ID`, `primeiroNome`, `ultimoNome`, `email`, `telefone`, `tour`, `lugares`, `bebes`, `observacoes`, `data`, `hora`, `preco`, `aReceber`, `aPagar`, `info_apagada`, `promotor`, `stripeID`, `codigoPromo`, `oldID`) VALUES
(13, 'Jorge', 'Almeida', 'jalmeida@ola.pt', '123456', 'normal', 2, 0, 'obs novas', '2020-01-28', ' 16h-18h;', 0, '0', '0', '', '', '', '', NULL),
(14, 'Joaquim', 'Quintas', 'jquntas@ola.pt', '123456', 'normal', 2, 0, 'dayum', '2020-01-28', '18h-20h;', 100, '100', '100', '', '', '', '', NULL),
(28, 'teste', '4', 't4@gmail.com', '187236', 'normal', 10, 0, 'novas obs', '1999-01-01', '18h-20h;', 0, '123', '123', '2020-01-24', '', '', '', NULL),
(32, 'teste', '2', 't2@gmail.com', '0928374', 'normal', 5, 0, 'noas obs', '1999-01-01', '09h-11h;', 105, '', '', '2020-01-25', '', '', '', NULL),
(33, 'teste', '3', 't3@gmail.com', '0298374', 'normal', 5, 0, 'novas obs', '1999-01-01', '09h-11h;', 0, '123', '123', '2020-01-25', '', '', '', NULL),
(40, 'Tiago', 'Oliveira', 'toliveira@ola.pt', '1337420', 'express', 4, 2, 'asdas hehe', '2020-01-26', '13h-14h;', 65, '', '', '', '', '', '', NULL),
(44, 'asd', 'asd', 'asd', 'asd', 'normal', 2, 0, 'asd', '1999-01-01', '09h-11h;', 60, '', '', '2020-01-28', '', '', '', NULL),
(54, 'gabriel', 'ferreira', 'gf@gmail.com', '4201337', 'normal', 6, 0, 'teste', '2020-01-28', '09h-11h;', 20, '40', '', '', '', '', '', NULL),
(55, 'fabio', 'daniel', 'fdaniel@gmail.com', '123456789', 'normal', 2, 2, 'asdas', '2020-01-30', '09h-11h;', 60, '0', '0', '', '', '', '', NULL),
(56, 'diogo', 'ribeiro', 'dribeiro@gmail.com', '4201337', 'normal', 2, 0, 'asdasd', '2020-01-30', '09h-11h;', 300, '0', '0', '', '', '', '', NULL),
(57, 'last', 'booking', 'last_booking@gmail.com', '123456789', 'normal', 4, 2, 'asd', '2020-01-29', '09h-11h;', 90, '', '', '', '', '', '', NULL),
(60, 'NOVO', 'NOME', 'nn@gmail.com', '1234356', 'normal', 8, 0, 'teste', '1999-01-01', ' 11h-13h;', 0, '20', '40', '2020-01-28', '', '', '', NULL),
(61, 'teste', '1', 't1@htm.com', '98679876', 'private', 4, 0, 'asd', '1999-01-01', ' 14h-16h;', 300, '', '', '2020-01-28', '', '', '', NULL),
(62, 'Jorge', 'Cunha', 'jcunha@gmail.com', '90876', 'private', 10, 0, 'kasdgh', '2020-01-30', '18h-20h;', 300, '', '', '', '', '', '', NULL),
(63, 'Diana', 'Marisa', 'dmarisa', '982374', 'normal', 4, 1, 'Novo mod', '1999-01-01', '13h-14h;', 90, '', '', '2020-01-25', '', '', '', NULL),
(67, 'António', 'Costa', 'meuEmail@gmail.com', '9312312123', 'normal', 4, 0, 'asdlkasdkljasdhl', '2020-01-30', '09h-11h;', 90, '', '', '', '', '', '', NULL),
(75, 'qwerty', 'qwerty', 'qwerty@gmail.com', '987654312', 'normal', 3, 0, 'qwerty', '1999-01-01', '11h-13h;', 90, '', '', '2020-01-30', '', '', '', NULL),
(76, 'Silvia', 'Costa', 'scgmail.com', '82734682', 'express', 8, 1, 'obs ok', '1999-01-01', '13h-14h;', 145, '', '', '2020-01-24', '', '', '', NULL),
(106, 'Stripe', 'Test', 'stripe_test@gmail.com', '123', 'normal', 3, 2, '', '1999-01-01', '16h-18h;', 75, NULL, NULL, '1999-01-01', NULL, 'tok_1G8TXiGqO0gHKkyxoPXuvvyw', NULL, NULL),
(112, 'new', 'test', 'new_test@gmail.com', '12309876', 'normal', 1, 0, '', '1999-01-01', '09h-11h;', 30, NULL, NULL, '2020-02-04', NULL, 'ch_1G8U6lGqO0gHKkyx729XKjaH', NULL, NULL),
(113, 'Novo', 'Nome', 'novosdados@gmail.com', '123123', 'normal', 4, 0, '', '1999-01-01', '09h-11h;', 90, NULL, NULL, '2020-02-04', NULL, NULL, NULL, NULL),
(114, 'admin', 'admin', 'admin@ok.com', '123', 'normal', 2, 0, '', '1999-01-01', '09h-11h;', 60, NULL, NULL, '2020-02-04', '55555', 'FREE', '', NULL),
(115, 'new', 'test', 'new_test@gmail.com', '12309876', 'normal', 1, 0, '', '1999-01-01', '09h-11h;', 30, NULL, NULL, '2020-02-01', NULL, NULL, NULL, NULL),
(116, 'nome', 'asd', 'novosdados@gmail.com', '123123', 'normal', 4, 0, '', '1999-01-01', '09h-11h;', 0, NULL, NULL, '2020-02-05', NULL, NULL, NULL, NULL),
(117, 'admin', 'admin', 'admin.com', '123', 'normal', 2, 0, '', '1999-01-01', '09h-11h;', 60, NULL, NULL, '2020-02-05', NULL, NULL, NULL, NULL),
(118, 'nome', 'asd', 'novosdados@gmail.com', '123123', 'normal', 4, 0, '', '1999-01-01', '11h-13h;', 0, NULL, NULL, '2020-02-08', NULL, NULL, NULL, NULL),
(119, 'admin', 'admin', 'admin.com', '123', 'normal', 2, 0, '', '1999-01-01', '09h-11h;', 60, NULL, NULL, '2020-02-15', NULL, NULL, NULL, 0),
(120, 'admin', 'Administrador', 'admin.com', '123', 'normal', 2, 0, '', '1999-01-01', '09h-11h;', 60, NULL, NULL, '2020-02-06', NULL, NULL, NULL, 119),
(121, 'Stripe', 'Test', 'stripe_test@gmail.com', '123', 'normal', 3, 2, '', '1999-01-01', '16h-18h;', 75, NULL, NULL, '2020-02-06', NULL, NULL, NULL, 106),
(122, 'new', 'test', 'new_test@gmail.com', '12309876', 'normal', 1, 0, '', '1999-01-01', '09h-11h;', 30, NULL, NULL, '2020-02-14', NULL, NULL, NULL, 115),
(123, 'new', 'test', 'new_test@gmail.com', '12309876', 'normal', 1, 0, '', '1999-01-01', '09h-11h;', 30, NULL, NULL, '2020-02-13', NULL, NULL, NULL, 122),
(124, 'new', 'test', 'new_test@gmail.com', '12309876', 'normal', 1, 0, '', '1999-01-01', '09h-11h;', 30, NULL, NULL, '2020-02-13', NULL, NULL, NULL, 123),
(125, 'new', 'test', 'new_test@gmail.com', '12309876', 'normal', 1, 0, '', '1999-01-01', '09h-11h;', 30, NULL, NULL, '2020-02-13', NULL, NULL, NULL, 124),
(126, 'José', 'Gabriel', 'new_test@gmail.com', '12309876', 'normal', 1, 0, '', '1999-01-01', '09h-11h;', 0, NULL, NULL, '2020-02-13', NULL, NULL, NULL, 125),
(127, 'José', 'Gabriel', 'new_test@gmail.com', '12309876', 'normal', 1, 0, '', '1999-01-01', '09h-11h;', 0, NULL, NULL, '2020-05-02', NULL, NULL, NULL, 126),
(128, 'admin', 'Administrador', 'admin.com', '123', 'normal', 2, 0, '', '1999-01-01', '11h-13h;', 60, NULL, NULL, '2020-05-02', NULL, NULL, NULL, 120),
(129, 'José', 'Gabriel', 'new_test@gmail.com', '12309876', 'normal', 1, 0, '', '1999-01-01', '11h-13h;', 0, NULL, NULL, '2020-05-02', NULL, NULL, NULL, 127),
(130, 'admin', 'Administrador', 'admin.com', '123', 'normal', 2, 0, '', '1999-01-01', '11h-13h;', 60, NULL, NULL, '1999-01-01', NULL, NULL, NULL, 128),
(131, 'José', 'Gabriel', 'gabriel@gmail.com', '12309876', 'normal', 1, 0, '', '2020-02-05', '14h-16h;', 0, NULL, NULL, NULL, NULL, NULL, NULL, 129),
(132, 'admin', 'Administrador', 'admin.com', '123', 'normal', 2, 0, '', '1999-01-01', '16h-18h;', 60, NULL, NULL, '1999-01-01', NULL, NULL, NULL, 130),
(133, 'Stripe', 'Test', 'stripe_test@gmail.com', '123', 'normal', 3, 2, '', '1999-01-01', '09h-11h;', 75, NULL, NULL, '2020-02-06', NULL, NULL, NULL, 106),
(134, 'admin', 'Administrador', 'admin.com', '123', 'normal', 2, 0, '', '1999-01-01', '09h-11h;', 60, NULL, NULL, NULL, NULL, NULL, NULL, 130),
(135, 'Mestre', 'Administrador', 'admin.com', '123', 'normal', 2, 0, '', '1999-01-01', '09h-11h;', 60, NULL, NULL, '2020-02-05', NULL, NULL, NULL, 132),
(136, 'Simao', 'Coelho', 'simaocoelho', '123123', 'normal', 2, 0, '', '2020-02-13', '09h-11h;', 0, NULL, NULL, NULL, '55555', 'FREE', '', NULL),
(137, 'Ana', 'Correia', 'anacorreia@gmail.com', '98679876', 'private', 4, 0, 'asd', '1999-01-01', ' 14h-16h;', 300, '', '', '2020-02-13', NULL, NULL, NULL, 61),
(138, 'Ana', 'Correia', 'anacorreia@gmail.com', '98679876', 'normal', 4, 0, 'asd', '1999-01-01', ' 14h-16h;', 300, '', '', '2020-02-13', NULL, NULL, NULL, 137),
(139, 'Ana', 'Correia', 'anacorreia@gmail.com', '98679876', 'normal', 2, 0, 'asd', '1999-01-01', ' 14h-16h;', 60, '', '', '2020-02-13', NULL, NULL, NULL, 138),
(140, 'Novo', 'Admin', 'admin.com', '123', 'normal', 5, 0, '', '2020-02-05', '09h-11h;', 150, NULL, NULL, NULL, NULL, NULL, NULL, 9999),
(141, 'Ana', 'Correia', 'anacorreia@gmail.com', '98679876', 'normal', 5, 0, 'asd', '1999-01-01', ' 14h-16h;', 150, '', '', '2020-02-05', NULL, NULL, NULL, 139),
(142, 'Ana', 'Correia', 'anacorreia@gmail.com', '98679876', 'normal', 4, 0, 'asd', '1999-01-01', ' 14h-16h;', 120, '', '', '2020-02-05', NULL, NULL, NULL, 141),
(143, 'Ana', 'Correia', 'anacorreia@gmail.com', '98679876', 'normal', 5, 0, 'asd', '1999-01-01', ' 14h-16h;', 150, '', '', '2020-02-05', NULL, NULL, NULL, 142),
(144, 'Ana', 'Correia', 'anacorreia@gmail.com', '98679876', 'normal', 6, 0, 'asd', '2020-02-05', ' 14h-16h;', 180, '', '', NULL, NULL, NULL, NULL, 143),
(145, 'Mestre', 'Administrador', 'admin.com', '123', 'normal', 5, 0, '', '2020-02-05', '09h-11h;', 150, NULL, NULL, NULL, NULL, NULL, NULL, 135);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;