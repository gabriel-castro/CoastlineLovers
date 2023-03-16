-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2020 at 05:41 PM
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
  `observacoes` varchar(500) NOT NULL,
  `data` date NOT NULL,
  `hora` varchar(50) NOT NULL,
  `preco` int(6) NOT NULL,
  `aReceber` varchar(1000) NOT NULL,
  `aPagar` varchar(1000) NOT NULL,
  `info_apagada` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`ID`, `primeiroNome`, `ultimoNome`, `email`, `telefone`, `tour`, `lugares`, `bebes`, `observacoes`, `data`, `hora`, `preco`, `aReceber`, `aPagar`, `info_apagada`) VALUES
(1, 'a', 'castro', 'jc@ola.pt', '123123', 'normal', 0, 0, '123', '1999-01-01', '0h', 0, '', '', '3; 0; 2020-01-17; 9h-11h;; 90'),
(2, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 2, 0, '123', '2020-01-18', ' 11h-13h;', 60, '', '', ''),
(3, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 4, 0, 'asd', '2020-01-19', ' 11h-13h;', 120, '', '', ''),
(4, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 5, 0, 'asd', '2020-01-19', ' 16h-18h;', 150, '', '', ''),
(5, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 3, 0, 'asd', '2020-01-18', ' 14h-16h;', 90, '', '', ''),
(6, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 10, 0, 'asd', '2020-01-17', '18h-20h', 300, '', '', ''),
(7, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 0, 0, 'asd', '1999-01-01', '0h', 999999, '', '', '3; 0; 2020-01-17; 13h-14h; 60'),
(8, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 10, 0, 'asd', '2020-01-18', '18h-20h', 300, '', '', ''),
(9, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 10, 0, 'asd', '2020-01-19', '18h-20h', 300, '', '', ''),
(10, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 0, 0, 'asd', '1999-01-01', '0h', 999999, '', '', '2; 0; 2020-01-28; 9h-11h;; 60'),
(11, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 2, 0, 'asd', '1999-01-01', ' 11h-13h;', 60, '', '', '2020-01-28'),
(12, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 2, 0, 'asd', '1999-01-01', ' 14h-16h;', 60, '', '', '2020-01-28'),
(13, 'Jorge', 'Almeida', 'jalmeida@ola.pt', '123456', 'normal', 2, 0, 'obs novas', '2020-01-28', ' 16h-18h;', 0, '0', '0', ''),
(14, 'Joaquim', 'Quintas', 'jquntas@ola.pt', '123456', 'normal', 2, 0, 'dayum', '2020-01-28', '18h-20h;', 100, '100', '100', ''),
(15, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 7, 0, 'asd', '2020-01-20', '13h-14h', 140, '', '', ''),
(16, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 3, 0, 'asd', '2020-01-21', '9h-11h;', 90, '', '', ''),
(17, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 2, 0, 'asd', '2020-01-21', ' 11h-13h;', 60, '', '', ''),
(18, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 4, 0, 'asd', '2020-01-21', ' 16h-18h;', 120, '', '', ''),
(19, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 10, 0, 'asd', '2020-01-22', '13h-14h', 170, '', '', ''),
(20, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 10, 0, 'asd', '2020-01-24', '13h-14h', 163, '', '', ''),
(21, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 6, 2, 'asd', '2020-01-20', '9h-11h;', 165, '', '', ''),
(22, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 8, 0, 'asd', '2020-01-20', ' 14h-16h;', 165, '', '', ''),
(23, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 8, 0, 'asd', '1999-01-01', '9h-11h;', 240, '', '', '2020-01-28'),
(24, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 8, 0, 'asd', '1999-01-01', ' 11h-13h;', 240, '', '', '2020-01-28'),
(25, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 8, 0, 'asd', '1999-01-01', ' 14h-16h;', 240, '', '', '2020-01-28'),
(26, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 8, 0, 'ads', '2020-01-28', ' 16h-18h;', 240, '', '', ''),
(28, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 10, 0, 'asd', '2020-01-24', '18h-20h', 300, '', '', ''),
(29, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 2, 2, 'asd', '2020-01-24', '9h-11h;', 60, '', '', ''),
(30, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 5, 0, 'asd', '1999-01-01', '13h-14h', 85, '', '', '2020-01-25'),
(31, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 10, 0, 'asd', '1999-01-01', '18h-20h', 300, '', '', '2020-01-25'),
(32, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 5, 0, 'asd', '2020-01-25', '9h-11h;', 105, '', '', ''),
(33, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 5, 0, 'asd', '2020-01-25', '9h-11h;', 150, '', '', ''),
(35, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 2, 0, 'asd', '1999-01-01', '13h-14h', 40, '', '', '2020-01-25'),
(36, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 4, 2, 'asd', '2020-01-21', '9h-11h;', 90, '', '', ''),
(37, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 2, 1, 'asd', '2020-01-21', '9h-11h;', 60, '', '', ''),
(38, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 3, 1, 'asd', '2020-01-21', ' 11h-13h;', 75, '', '', ''),
(39, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 4, 2, 'asdas', '2020-01-21', ' 16h-18h;', 90, '', '', ''),
(40, 'Tiago', 'Oliveira', 'toliveira@ola.pt', '1337420', 'express', 4, 2, 'asdas hehe', '2020-01-26', '13h-14h', 65, '', '', ''),
(41, 'a', 'b', 'asdas@gmail.com', '123', 'express', 4, 1, 'obs', '2020-01-24', '13h-14h', 65, '', '', ''),
(42, 'a', 'b', 'c', '1337', 'express', 4, 1, 'obs', '2020-01-24', '13h-14h', 65, '', '', ''),
(43, 'a', 'b', 'c', '1337', 'express', 2, 0, 'asdas', '2020-01-24', '13h-14h', 40, '', '', ''),
(44, 'asd', 'asd', 'asd', 'asd', 'normal', 2, 0, 'asd', '2020-01-28', '9h-11h;', 60, '', '', ''),
(46, 'iop', 'iop', 'iop', 'iop', 'normal', 5, 2, 'iop', '2020-01-28', '18h-20h;', 150, '0', '0', ''),
(48, 'gabriel', 'ferreira', 'gf@gmail.com', '4201337', 'normal', 4, 2, 'asdasdasdasdas', '1999-01-01', '9h-11h;', 20, '', '', '2020-01-28'),
(49, 'gabriel', 'ferreira', 'gf@gmail.com', '4201337', 'normal', 4, 2, 'asdasdasdasdas', '1999-01-01', '9h-11h;', 20, '', '', '2020-01-28'),
(50, 'gabriel', 'ferreira', 'gf@gmail.com', '4201337', 'normal', 1, 0, 'asdasdasdasdas', '1999-01-01', '9h-11h;', 20, '40', '', '2020-01-28'),
(51, 'gabriel', 'ferreira', 'gf@gmail.com', '4201337', 'normal', 6, 0, 'asdasdasdasdas', '1999-01-01', '9h-11h;', 20, '40', '', '2020-01-28'),
(52, 'gabriel', 'ferreira', 'gf@gmail.com', '4201337', 'normal', 8, 0, 'asdasdasdasdas', '1999-01-01', '9h-11h;', 20, '40', '', '2020-01-28'),
(53, 'gabriel', 'ferreira', 'gf@gmail.com', '4201337', 'normal', 6, 0, 'asdasdasdasdas', '1999-01-01', '9h-11h;', 20, '40', '', '2020-01-28'),
(54, 'gabriel', 'ferreira', 'gf@gmail.com', '4201337', 'normal', 6, 0, 'teste', '2020-01-28', '9h-11h;', 20, '40', '', ''),
(55, 'fabio', 'daniel', 'fdaniel@gmail.com', '123456789', 'normal', 2, 2, 'asdas', '2020-01-30', '9h-11h;', 60, '0', '0', ''),
(56, 'diogo', 'ribeiro', 'dribeiro@gmail.com', '4201337', 'private', 2, 0, 'asdasd', '2020-01-30', '9h-11h;', 300, '0', '0', ''),
(57, 'last', 'booking', 'last_booking@gmail.com', '123456789', 'normal', 4, 2, 'asd', '2020-01-29', '9h-11h;', 90, '', '', ''),
(58, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 8, 0, 'so obs', '1999-01-01', ' 11h-13h;', 240, '', '', '2020-01-28'),
(59, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 8, 0, 'novas obs', '1999-01-01', ' 11h-13h;', 240, '', '', '2020-01-28'),
(60, 'NOVO', 'NOME', 'nn@gmail.com', '1234356', 'normal', 8, 0, 'teste', '2020-01-28', ' 11h-13h;', 0, '20', '40', ''),
(61, 'teste', '1', 't1@htm.com', '98679876', 'private', 4, 0, 'asd', '2020-01-28', ' 14h-16h;', 300, '', '', ''),
(62, 'Jorge', 'Cunha', 'jcunha@gmail.com', '90876', 'private', 10, 0, 'kasdgh', '2020-01-30', '18h-20h;', 300, '', '', ''),
(63, 'Diana', 'Marisa', 'dmarisa', '982374', 'normal', 4, 1, 'Novo mod', '2020-01-25', '13h-14h', 90, '', '', ''),
(64, 'jose', 'castro', 'jc@ola.pt', '123123', 'normal', 10, 0, 'asd', '2020-01-23', '18h-20h', 300, '', '', '');

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;
--
