-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-11-2021 a las 05:59:36
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `paciente`
--
CREATE DATABASE IF NOT EXISTS `paciente` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `paciente`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tabla_pacientes`
--

CREATE TABLE `tabla_pacientes` (
  `ID` int(4) NOT NULL,
  `FECHA` date NOT NULL,
  `ORGANO` char(30) NOT NULL,
  `GENERO` char(10) NOT NULL,
  `HORA` time NOT NULL,
  `ATENDIDO` char(50) NOT NULL,
  `RESPONSABLE` char(50) NOT NULL,
  `SALA` char(50) NOT NULL,
  `IMAGEN` char(10) NOT NULL,
  `UNIDAD` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tabla_pacientes`
--

INSERT INTO `tabla_pacientes` (`ID`, `FECHA`, `ORGANO`, `GENERO`, `HORA`, `ATENDIDO`, `RESPONSABLE`, `SALA`, `IMAGEN`, `UNIDAD`) VALUES
(1, '2021-11-03', 'CORAZON', 'MASCULINO', '22:53:21', 'DR. LARA', 'JUAN MENDEZ', 'CIRUGIA', 'child.png', '21'),
(2, '2021-10-31', 'HIGADO', 'MASCULINO', '22:53:21', 'DR. MENDEZ', 'CARLOS MEDINA', 'CIRUGIA', 'woman.png', '17');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tabla_pacientes`
--
ALTER TABLE `tabla_pacientes`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tabla_pacientes`
--
ALTER TABLE `tabla_pacientes`
  MODIFY `ID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
