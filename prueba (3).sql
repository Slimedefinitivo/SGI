-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3308
-- Tiempo de generación: 25-06-2024 a las 05:53:06
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_departamento`
--

DROP TABLE IF EXISTS `t_departamento`;
CREATE TABLE IF NOT EXISTS `t_departamento` (
  `cn_id_departamento` int NOT NULL AUTO_INCREMENT,
  `ct_descripcion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`cn_id_departamento`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_diagnosticos`
--

DROP TABLE IF EXISTS `t_diagnosticos`;
CREATE TABLE IF NOT EXISTS `t_diagnosticos` (
  `cn_cod_diagnostico` int NOT NULL AUTO_INCREMENT,
  `ct_fechaHora` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `ct_descripcion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cn_tiempoSolucion` int NOT NULL,
  `ct_observacion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ct_cod_incidencia` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ct_requiereCompra` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`cn_cod_diagnostico`)
) ENGINE=MyISAM AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `t_diagnosticos`
--

INSERT INTO `t_diagnosticos` (`cn_cod_diagnostico`, `ct_fechaHora`, `ct_descripcion`, `cn_tiempoSolucion`, `ct_observacion`, `ct_cod_incidencia`, `ct_requiereCompra`) VALUES
(62, '2024-06-24 01:47:34.953', ' por comprar', 2, ' falta comprar', '2024-001012', 'SI'),
(61, '2024-06-24 01:34:27.873', '  si requiere', 3, ' si requier', '2024-001012', 'SI'),
(60, '2024-06-24 01:33:10.821', ' hola', 2, ' hola', '2024-001012', 'NO'),
(59, '2024-06-24 00:50:34.587', ' raspon en la cabeza', 1, ' le duele al bebe', '2024-001012', 'SI'),
(58, '2024-06-23 21:44:20.555', ' cupo baño', 4, ' ocupo bañarme', '2024-001011', NULL),
(57, '2024-06-23 05:31:52.974', 'promete', 16, ' entrenimiento', '2024-001010', NULL),
(56, '2024-06-23 04:53:44.162', 'hola ', 7, 'hola', '2024-001006', NULL),
(55, '2024-06-23 04:23:16.019', ' rico cantones', 2, ' ojala todo bien ', '2024-001009', NULL),
(54, '2024-06-23 03:54:30.847', ' entero', 1, ' que este rico', '2024-001009', 'SI'),
(53, '2024-06-23 03:49:00.114', ' hay que ir al restaurante', 12, ' entero', '2024-001009', 'SI'),
(52, '2024-06-23 02:37:00.872', ' limpiar el jardin', 3, ' nada', '2024-001008', 'SI'),
(51, '2024-06-23 01:52:54.158', ' aun no se compran ', 4, ' aun no se compran', '2024-001007', 'SI'),
(50, '2024-06-23 01:46:48.600', ' si requiere compra', 67, ' validando', '2024-001007', 'SI'),
(49, '2024-06-23 01:44:49.243', '  vea', 1, ' vea', '2024-001007', 'NO'),
(48, '2024-06-23 01:43:41.334', ' necesita carros', 4, ' ninuna', '2024-001007', 'SI'),
(46, '2024-06-23 01:33:25.460', ' ya se compro lo que necesitaba', 3, ' todo comprado', '2024-001006', 'NO'),
(47, '2024-06-23 01:34:15.282', ' ok', 4, ' ok', '2024-001006', 'NO'),
(42, '2024-06-22 10:38:09.009', ' Probando', 3, ' probando', '2024-001005', 'NO'),
(43, '2024-06-22 10:39:11.086', ' YA NO ES PRUEBA', 4, ' YA NO ES PRUEBA', '2024-001005', 'NO'),
(44, '2024-06-22 10:48:55.048', ' PUTO', 4, 'PUTOS', '2024-001005', 'SI'),
(45, '2024-06-23 01:24:09.412', 'ya llegue', 3, ' todo salio bien', '2024-001006', 'SI'),
(63, '2024-06-24 01:55:30.157', 'adios', 3, 'adios', '2024-001012', 'NO'),
(64, '2024-06-24 02:00:01.857', 'a', 2, 'ajn', '2024-001012', 'NO'),
(65, '2024-06-24 02:21:43.043', ' sentry', 3, ' sentry', '2024-001006', 'SI'),
(66, '2024-06-24 02:41:46.992', ' liga', 2, ' liga justicia', '2024-001006', 'NO'),
(67, '2024-06-24 03:00:47.111', ' jasj', 3, ' ajansjasn', '2024-001006', 'NO'),
(68, '2024-06-24 03:01:25.063', ' ashash', 4, ' auhashb', '2024-001006', 'SI'),
(69, '2024-06-24 06:05:17.230', ' silla mala', 2, ' pintura hace falta', '2024-001013', 'SI'),
(70, '2024-06-24 06:10:48.954', ' ya se compro', 23, ' lista la ocmpra', '2024-001013', 'NO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_diagnosticosxincidencias`
--

DROP TABLE IF EXISTS `t_diagnosticosxincidencias`;
CREATE TABLE IF NOT EXISTS `t_diagnosticosxincidencias` (
  `cn_id` int NOT NULL AUTO_INCREMENT,
  `cn_cod_diagnostico` int NOT NULL,
  `ct_cod_incidencia` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cn_cod_usuario` int NOT NULL,
  PRIMARY KEY (`cn_id`),
  KEY `t_diagnosticosxincidencias_cn_cod_diagnostico_fkey` (`cn_cod_diagnostico`),
  KEY `t_diagnosticosxincidencias_ct_cod_incidencia_fkey` (`ct_cod_incidencia`),
  KEY `t_diagnosticosxincidencias_cn_cod_usuario_fkey` (`cn_cod_usuario`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_estados`
--

DROP TABLE IF EXISTS `t_estados`;
CREATE TABLE IF NOT EXISTS `t_estados` (
  `cn_cod_estado` int NOT NULL AUTO_INCREMENT,
  `ct_descripcion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ct_sistema` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'SGI',
  `cn_activo` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`cn_cod_estado`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `t_estados`
--

INSERT INTO `t_estados` (`cn_cod_estado`, `ct_descripcion`, `ct_sistema`, `cn_activo`) VALUES
(1, 'Registrado', 'SGI', 1),
(2, 'Asignado', 'SGI', 1),
(3, 'En revision', 'SGI', 1),
(4, 'En reparacion', 'SGI', 1),
(5, 'Pendiente de compra', 'SGI', 1),
(6, 'Terminado', 'SGI', 1),
(7, 'Aprobado', 'SGI', 1),
(8, 'Rechazado', 'SGI', 1),
(9, 'Cerrado', 'SGI', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_estadosxincidencias`
--

DROP TABLE IF EXISTS `t_estadosxincidencias`;
CREATE TABLE IF NOT EXISTS `t_estadosxincidencias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cn_cod_incidencia` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cn_cod_estado` int NOT NULL,
  `cd_fechaCambio` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `t_estadosxincidencias_cn_cod_incidencia_fkey` (`cn_cod_incidencia`),
  KEY `t_estadosxincidencias_cn_cod_estado_fkey` (`cn_cod_estado`)
) ENGINE=MyISAM AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `t_estadosxincidencias`
--

INSERT INTO `t_estadosxincidencias` (`id`, `cn_cod_incidencia`, `cn_cod_estado`, `cd_fechaCambio`) VALUES
(42, '2024-001006', 7, '2024-06-22 19:36:02.403'),
(41, '2024-001006', 2, '2024-06-22 19:21:11.660'),
(40, '2024-001006', 1, '2024-06-22 19:18:02.600'),
(39, '2024-001004', 8, '2024-06-22 19:15:46.953'),
(38, '2024-001005', 8, '2024-06-22 19:05:38.533'),
(37, '2024-001004', 7, '2024-06-22 19:04:11.721'),
(36, '2024-000002', 9, '2024-06-22 19:01:22.276'),
(35, '2024-000002', 6, '2024-06-22 18:26:05.051'),
(34, '2024-000002', 2, '2024-06-22 18:20:51.785'),
(52, '2024-001007', 5, '2024-06-23 01:46:48.622'),
(51, '2024-001007', 1, '2024-06-23 01:44:49.262'),
(50, '2024-001007', 3, '2024-06-23 01:43:41.347'),
(30, '2024-001001', 3, '2024-06-22 18:05:25.123'),
(29, '2024-001005', 6, '2024-06-22 15:36:28.806'),
(28, '2024-001005', 4, '2024-06-22 10:55:19.129'),
(27, '2024-001005', 2, '2024-06-22 09:41:03.531'),
(24, '2024-001005', 1, '2024-06-22 09:38:37.739'),
(25, '2024-001005', 1, '2024-06-22 09:38:37.757'),
(26, '2024-001004', 2, '2024-06-22 09:39:50.307'),
(21, '2024-001004', 1, '2024-06-22 09:32:19.726'),
(22, '2024-001004', 1, '2024-06-22 09:32:19.748'),
(23, '2024-001004', 2, '2024-06-22 09:33:12.454'),
(43, '2024-001006', 2, '2024-06-22 19:39:51.789'),
(44, '2024-001006', 9, '2024-06-22 20:29:26.368'),
(45, '2024-001006', 3, '2024-06-23 01:24:09.488'),
(46, '2024-001006', 2, '2024-06-23 01:33:25.505'),
(47, '2024-001006', 1, '2024-06-23 01:34:15.301'),
(48, '2024-001007', 1, '2024-06-23 01:36:07.217'),
(49, '2024-001007', 2, '2024-06-23 01:37:02.317'),
(53, '2024-001007', 5, '2024-06-23 01:52:54.189'),
(54, '2024-001007', 7, '2024-06-23 02:01:32.322'),
(55, '2024-001007', 9, '2024-06-23 02:15:27.040'),
(56, '2024-001005', 7, '2024-06-23 02:18:36.225'),
(57, '2024-001008', 1, '2024-06-23 02:20:47.898'),
(58, '2024-001008', 2, '2024-06-23 02:24:17.400'),
(59, '2024-001008', 5, '2024-06-23 02:37:00.897'),
(60, '2024-001009', 1, '2024-06-23 03:00:18.987'),
(61, '2024-001009', 2, '2024-06-23 03:43:54.996'),
(62, '2024-001009', 5, '2024-06-23 03:49:00.131'),
(63, '2024-001009', 7, '2024-06-23 04:26:19.835'),
(64, '2024-001006', 6, '2024-06-23 04:58:02.349'),
(65, '2024-001010', 1, '2024-06-23 05:23:22.278'),
(66, '2024-001010', 2, '2024-06-23 05:30:57.535'),
(67, '2024-001010', 9, '2024-06-23 05:32:51.553'),
(68, '2024-001010', 8, '2024-06-23 05:33:24.188'),
(69, '2024-001010', 7, '2024-06-23 05:35:59.139'),
(70, '2024-001011', 1, '2024-06-23 21:29:15.290'),
(71, '2024-001011', 2, '2024-06-23 21:38:11.185'),
(72, '2024-001011', 7, '2024-06-23 21:51:52.135'),
(73, '2024-001011', 8, '2024-06-23 22:02:01.102'),
(74, '2024-001011', 9, '2024-06-23 22:02:24.044'),
(75, '2024-001012', 1, '2024-06-24 00:44:20.266'),
(76, '2024-001012', 2, '2024-06-24 00:47:50.047'),
(77, '2024-001012', 1, '2024-06-24 00:50:34.617'),
(78, '2024-001012', 8, '2024-06-24 00:52:42.938'),
(79, '2024-001012', 1, '2024-06-24 01:33:10.859'),
(80, '2024-001012', 2, '2024-06-24 01:34:27.892'),
(81, '2024-001012', 5, '2024-06-24 01:47:34.969'),
(82, '2024-001012', 4, '2024-06-24 01:55:30.189'),
(83, '2024-001012', 3, '2024-06-24 02:00:01.872'),
(84, '2024-001006', 1, '2024-06-24 02:21:43.076'),
(85, '2024-001006', 3, '2024-06-24 02:41:47.027'),
(86, '2024-001006', 4, '2024-06-24 03:00:47.149'),
(87, '2024-001006', 5, '2024-06-24 03:01:25.086'),
(88, '2024-001013', 1, '2024-06-24 06:02:54.470'),
(89, '2024-001013', 2, '2024-06-24 06:04:05.365'),
(90, '2024-001013', 5, '2024-06-24 06:05:17.248'),
(91, '2024-001013', 2, '2024-06-24 06:07:33.328'),
(92, '2024-001013', 2, '2024-06-24 06:09:54.942'),
(93, '2024-001013', 4, '2024-06-24 06:10:48.970'),
(94, '2024-001013', 7, '2024-06-24 06:13:01.355'),
(95, '2024-001014', 1, '2024-06-24 08:35:11.529'),
(96, '2024-001014', 2, '2024-06-24 08:35:57.343'),
(97, '2024-001015', 1, '2024-06-24 09:22:53.093'),
(98, '2024-001015', 2, '2024-06-24 09:23:56.801');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_imagenesxdiagnostico`
--

DROP TABLE IF EXISTS `t_imagenesxdiagnostico`;
CREATE TABLE IF NOT EXISTS `t_imagenesxdiagnostico` (
  `cn_id` int NOT NULL AUTO_INCREMENT,
  `cn_cod_diagnostico` int NOT NULL,
  `ct_urlImagen` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`cn_id`),
  KEY `t_imagenesxdiagnostico_cn_cod_diagnostico_fkey` (`cn_cod_diagnostico`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_imagenesxincidencias`
--

DROP TABLE IF EXISTS `t_imagenesxincidencias`;
CREATE TABLE IF NOT EXISTS `t_imagenesxincidencias` (
  `cn_id` int NOT NULL AUTO_INCREMENT,
  `ct_cod_incidencia` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ct_urlImagen` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`cn_id`),
  KEY `t_imagenesxincidencias_ct_cod_incidencia_fkey` (`ct_cod_incidencia`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_incidencias`
--

DROP TABLE IF EXISTS `t_incidencias`;
CREATE TABLE IF NOT EXISTS `t_incidencias` (
  `ct_cod_incidencia` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cd_fechaHora` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `ct_titulo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ct_descripcion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ct_lugar` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ct_justificacionDeCierre` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cn_costos` int DEFAULT NULL,
  `cn_duracion` int DEFAULT NULL,
  `ct_prioridad` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ct_riesgo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ct_afectacion` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ct_categoria` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cn_cod_usuario` int NOT NULL,
  `cn_cod_estado` int NOT NULL,
  `cn_cod_encargado` int DEFAULT NULL,
  `ct_nombreTecnico` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ct_estadoDeCierre` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ct_cod_incidencia`),
  KEY `t_incidencias_cn_cod_estado_fkey` (`cn_cod_estado`),
  KEY `t_incidencias_cn_cod_usuario_fkey` (`cn_cod_usuario`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `t_incidencias`
--

INSERT INTO `t_incidencias` (`ct_cod_incidencia`, `cd_fechaHora`, `ct_titulo`, `ct_descripcion`, `ct_lugar`, `ct_justificacionDeCierre`, `cn_costos`, `cn_duracion`, `ct_prioridad`, `ct_riesgo`, `ct_afectacion`, `ct_categoria`, `cn_cod_usuario`, `cn_cod_estado`, `cn_cod_encargado`, `ct_nombreTecnico`, `ct_estadoDeCierre`) VALUES
('2024-001004', '2024-06-22 09:32:19.719', 'Siesta', 'siesta diaria', 'dormir bien', 'DUELE PANCHAAAA', 34, 30, 'Baja', 'Bajo', 'Baja', 'Red', 77777777, 8, 20818717, 'jason', '8'),
('2024-001008', '2024-06-23 02:20:47.892', 'JARDIN', 'LIMPIAR EL JARDI', 'PATIO', NULL, 23, 30, 'Media', 'Medio', 'Media', 'Natural', 77777777, 5, 20818717, 'alejandro', NULL),
('2024-001006', '2024-06-22 19:18:02.592', 'Viaje', 'ya casi llego tio', 'San Jose', 'ya llegue', 2000, 30, 'Media', 'Medio', 'Media', 'Natural', 77777777, 5, 20818717, 'jason', '9'),
('2024-001007', '2024-06-23 01:36:07.196', 'Jugar', 'con carritos', 'mi cuarto', 'probando cierre', 4500, 30, 'Baja', 'Bajo', 'Baja', 'Natural', 77777777, 9, 20818717, 'yaniel', '9'),
('2024-001009', '2024-06-23 03:00:18.972', 'Cantones', 'Comer cantones', 'La mesa', 'No hubo tiempo de respuesta', 5500, 30, 'Alta', 'Alto', 'Alta', 'Natural', 77777777, 7, 20818717, 'alejandro', '7'),
('2024-001010', '2024-06-23 05:23:22.255', '', '', '', 'hjnd', 3400, 60, 'Media', 'Alto', 'Alta', 'Reparacion', 77777777, 7, 20818717, 'jason', '7'),
('2024-001011', '2024-06-23 21:29:15.277', '', '', '', '', 7600, 30, 'Baja', 'Bajo', 'Baja', 'Natural', 77777777, 9, 20818717, 'alejandro', '9'),
('2024-001012', '2024-06-24 00:44:20.257', 'raspon ', 'raspon en la cabeza', 'corredor', 'pendiente de compra', 23445, 120, 'Media', 'Medio', 'Media', 'Natural', 77777777, 3, 20818717, 'jason', '8'),
('2024-001013', '2024-06-24 06:02:54.431', 'dentista', 'limpieza', 'clinica', 'terminado', 23000, 60, 'Alta', 'Alto', 'Alta', 'Reparacion', 77777777, 7, 20818717, 'yaniel', '7'),
('2024-001014', '2024-06-24 08:35:11.487', 'pio', 'pio', 'pio', NULL, 13, 120, 'Baja', 'Medio', 'Baja', 'Reparacion', 77777777, 2, 20818717, 'jason', NULL),
('2024-001015', '2024-06-24 09:22:53.086', 'Fresco', 'tomar fresco', 'la refrgerador', NULL, 7363, 90, 'Alta', 'Medio', 'Media', 'Reparacion', 77777777, 2, 20818717, 'jason', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_puestos`
--

DROP TABLE IF EXISTS `t_puestos`;
CREATE TABLE IF NOT EXISTS `t_puestos` (
  `cn_cod_puesto` int NOT NULL,
  `ct_nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_inicio` datetime(3) NOT NULL,
  `fecha_fin` datetime(3) DEFAULT NULL,
  `cn_cod_usuario` int NOT NULL,
  PRIMARY KEY (`cn_cod_puesto`),
  KEY `t_puestos_cn_cod_usuario_fkey` (`cn_cod_usuario`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `t_puestos`
--

INSERT INTO `t_puestos` (`cn_cod_puesto`, `ct_nombre`, `fecha_inicio`, `fecha_fin`, `cn_cod_usuario`) VALUES
(1, 'administador', '2024-06-17 00:27:20.000', NULL, 207090342),
(2, 'usuario', '2024-06-17 00:35:22.000', NULL, 207090342),
(3, 'encargado', '2024-06-17 00:35:58.000', NULL, 207090342),
(4, 'tecnico', '2024-06-17 00:36:32.000', NULL, 207090342),
(5, 'supervisor', '2024-06-17 00:37:58.000', NULL, 207090342);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `t_usuarios`
--

DROP TABLE IF EXISTS `t_usuarios`;
CREATE TABLE IF NOT EXISTS `t_usuarios` (
  `cn_cod_usuario` int NOT NULL,
  `ct_nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cn_numero_telefono` int NOT NULL,
  `ct_correo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ct_puesto` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ct_clave` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cn_id_departamento` int NOT NULL,
  PRIMARY KEY (`cn_cod_usuario`),
  KEY `t_usuarios_cn_id_departamento_fkey` (`cn_id_departamento`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `t_usuarios`
--

INSERT INTO `t_usuarios` (`cn_cod_usuario`, `ct_nombre`, `cn_numero_telefono`, `ct_correo`, `ct_puesto`, `ct_clave`, `cn_id_departamento`) VALUES
(207090342, 'jason', 87140279, 'jason@gmail.com', 'tecnico', '12345', 1),
(77777777, 'tiago', 87132723, 'tiago@gmail.com', 'usuario', '12345', 4),
(12, 'jason', 87140279, 'jason@gmail.com', 'usuario', '12345', 1),
(20818717, 'ana', 81726626, 'ana@gmail.com', 'encargado', '12345', 1),
(7070, 'yaniel', 88888888, 'yaniel@gmail.com', 'tecnico', '12345', 1),
(9090909, 'alejandro', 88888888, 'alejandro@gmail.com', 'tecnico', '12345', 1),
(2222222, 'yarelis', 88888888, 'yarelis@gmail.com', 'encargado', '12345', 1),
(36365, 'yarilda', 88888888, 'yarilda@gmail.com', 'supervisor', '12345', 1),
(243323, 'yarelis', 88888888, 'yarelis@gmail.com', 'admin', '12345', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('66c81cca-e546-4311-9cb4-1737c796a483', '7e8aca51e4982df1e2d82e7d0ed55884590e7882c8037b92f6a7ec9881d10ae6', '2024-06-11 19:07:59.913', '20240609134813_init', NULL, NULL, '2024-06-11 19:07:59.897', 1),
('45e92f4c-48ad-4714-bec0-6ca507438009', 'e28d987a1c1305dd6ea4cd15f1689475d9cc35f208404e782f02a8cd73e645f8', '2024-06-11 19:08:00.233', '20240611190759_nueva_migracion', NULL, NULL, '2024-06-11 19:07:59.990', 1),
('f8317b81-fe6e-4722-9822-10c97bb0ebb9', '8efd0164e70f6148ec206eab7694219231eb3c00be0780a4314036a6d0dd21e2', '2024-06-14 22:18:34.138', '20240614221833_add_optional_ct_cod_incidencia', NULL, NULL, '2024-06-14 22:18:33.609', 1),
('1a451927-2939-4b94-928a-46c538821f99', '0dbcab92e385dccfec720c4ee3c98120e29635506df93e1a8cbdc33751264246', '2024-06-14 22:29:21.804', '20240614222921_add_optional_ct_requiere_compra', NULL, NULL, '2024-06-14 22:29:21.317', 1),
('803dc70d-a639-43d8-b937-93a46a1fc72c', '7f3153a11b9a3a719efd0d22ffbfcd965514e441dbc306d346e22caead10c0b2', '2024-06-15 04:23:29.885', '20240615042329_diagnostico', NULL, NULL, '2024-06-15 04:23:29.406', 1),
('9272a619-9d4f-459b-9c91-0c07733fa473', 'e9908b354879d3ac35ae987e3aa15f2d935690b193cd3d5116aaae1ba547c6a4', '2024-06-15 04:39:21.497', '20240615043921_diagnostico_update', NULL, NULL, '2024-06-15 04:39:21.153', 1),
('abacecf3-5deb-49a5-80d5-f4dc8eaa3285', '5177df2c785d5d03d8a865ae73f3a9c0021ffff25840e6ca2127bbb3b472a954', '2024-06-17 06:26:45.654', '20240617062645_tabla_puestos', NULL, NULL, '2024-06-17 06:26:45.291', 1),
('6f15924f-75e1-4f86-86d8-c7811d40ad8d', '1677557dfab24fef90f0b43607250695c9055ae02d9301d7d8c836b228434825', '2024-06-17 23:03:31.994', '20240617230331_columna_encargado', NULL, NULL, '2024-06-17 23:03:31.581', 1),
('da5c51c3-b268-4c3f-836b-5c982e1b8319', '16c4f4447d83cf5c705e80b0d049f3c41b6fb79779d0431fc280bd173f7583de', '2024-06-18 16:15:37.181', '20240618161536_nombre_tecnico', NULL, NULL, '2024-06-18 16:15:36.776', 1),
('b5c0d38b-2699-4a7e-9438-51e9178c33d3', 'ad53d0052a9b9c5473a94a03012a11c87c543b5a335254a27bdeee43c371ea3b', '2024-06-19 13:16:16.878', '20240619131616_imagen', NULL, NULL, '2024-06-19 13:16:16.422', 1),
('7dc33904-c6f0-4a48-b485-52b4b1752901', '1650e464b6b664fb958eeaca1e238209d6b8d2a3016262fb79b91f8884203f72', '2024-06-19 13:50:20.342', '20240619135019_sinimage', NULL, NULL, '2024-06-19 13:50:19.955', 1),
('7b3d896d-ef60-43b4-9c52-1826d2495ea7', '89f37eb78cff77f2b4f509a78804dea0f0bed916cbc7aa582db2d20883ccbe4c', '2024-06-20 04:48:04.034', '20240620044803_diagnostico_indica_incidencia', NULL, NULL, '2024-06-20 04:48:03.641', 1),
('9ccafe8b-819f-4d78-8c9d-93cd096c9301', '952e48a4d8ba44a86896f9bec83c869802a20a6b67fd772923350804ba995f5b', '2024-06-20 22:11:44.403', '20240620221143_supervisor', NULL, NULL, '2024-06-20 22:11:43.987', 1),
('7fa5a4b2-62e8-457a-ae45-4e7abbf250de', '565b4feded540b3054075b769b8ce3a0bef489781aa6b208b61770db0df582a2', '2024-06-21 07:17:57.368', '20240621071756_estados', NULL, NULL, '2024-06-21 07:17:56.954', 1),
('dbf1c5d9-52ed-4949-867d-4f35047a1786', 'de8ccbb434f04e0068e8af1d6b4f953285bf157038e51786f470fbc5ce912a69', '2024-06-21 23:15:59.310', '20240621231558_requiere_compra', NULL, NULL, '2024-06-21 23:15:58.782', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
