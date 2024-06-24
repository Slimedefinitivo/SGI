/*
  Warnings:

  - Added the required column `cn_id_departamento` to the `t_usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `t_usuarios` ADD COLUMN `cn_id_departamento` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `t_departamento` (
    `cn_id_departamento` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cn_id_departamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_diagnosticosxincidencias` (
    `cn_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cn_cod_diagnostico` INTEGER NOT NULL,
    `ct_cod_incidencia` VARCHAR(191) NOT NULL,
    `cn_cod_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`cn_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_incidencias` (
    `ct_cod_incidencia` VARCHAR(191) NOT NULL,
    `cd_fechaHora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ct_titulo` VARCHAR(191) NOT NULL,
    `ct_descripcion` VARCHAR(191) NOT NULL,
    `ct_lugar` VARCHAR(191) NOT NULL,
    `ct_justificacionDeCierre` VARCHAR(191) NULL,
    `cn_costos` INTEGER NULL,
    `cn_duracion` INTEGER NULL,
    `ct_prioridad` VARCHAR(191) NULL,
    `ct_riesgo` VARCHAR(191) NULL,
    `ct_afectacion` VARCHAR(191) NULL,
    `ct_categoria` VARCHAR(191) NULL,
    `cn_cod_usuario` INTEGER NOT NULL,
    `cn_cod_estado` INTEGER NOT NULL,

    PRIMARY KEY (`ct_cod_incidencia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_diagnosticos` (
    `cn_cod_diagnostico` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_fechaHora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ct_descripcion` VARCHAR(191) NOT NULL,
    `cn_tiempoSolucion` INTEGER NOT NULL,
    `ct_observacion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cn_cod_diagnostico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_imagenesxdiagnostico` (
    `cn_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cn_cod_diagnostico` INTEGER NOT NULL,
    `ct_urlImagen` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cn_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_imagenesxincidencias` (
    `cn_id` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_cod_incidencia` VARCHAR(191) NOT NULL,
    `ct_urlImagen` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cn_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_estados` (
    `cn_cod_estado` INTEGER NOT NULL AUTO_INCREMENT,
    `ct_descripcion` VARCHAR(191) NOT NULL,
    `ct_sistema` VARCHAR(191) NOT NULL DEFAULT 'SGI',
    `cn_activo` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`cn_cod_estado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `t_usuarios` ADD CONSTRAINT `t_usuarios_cn_id_departamento_fkey` FOREIGN KEY (`cn_id_departamento`) REFERENCES `t_departamento`(`cn_id_departamento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_diagnosticosxincidencias` ADD CONSTRAINT `t_diagnosticosxincidencias_cn_cod_diagnostico_fkey` FOREIGN KEY (`cn_cod_diagnostico`) REFERENCES `t_diagnosticos`(`cn_cod_diagnostico`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `t_diagnosticosxincidencias` ADD CONSTRAINT `t_diagnosticosxincidencias_ct_cod_incidencia_fkey` FOREIGN KEY (`ct_cod_incidencia`) REFERENCES `t_incidencias`(`ct_cod_incidencia`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `t_diagnosticosxincidencias` ADD CONSTRAINT `t_diagnosticosxincidencias_cn_cod_usuario_fkey` FOREIGN KEY (`cn_cod_usuario`) REFERENCES `t_usuarios`(`cn_cod_usuario`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `t_incidencias` ADD CONSTRAINT `t_incidencias_cn_cod_estado_fkey` FOREIGN KEY (`cn_cod_estado`) REFERENCES `t_estados`(`cn_cod_estado`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `t_incidencias` ADD CONSTRAINT `t_incidencias_cn_cod_usuario_fkey` FOREIGN KEY (`cn_cod_usuario`) REFERENCES `t_usuarios`(`cn_cod_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_imagenesxdiagnostico` ADD CONSTRAINT `t_imagenesxdiagnostico_cn_cod_diagnostico_fkey` FOREIGN KEY (`cn_cod_diagnostico`) REFERENCES `t_diagnosticos`(`cn_cod_diagnostico`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `t_imagenesxincidencias` ADD CONSTRAINT `t_imagenesxincidencias_ct_cod_incidencia_fkey` FOREIGN KEY (`ct_cod_incidencia`) REFERENCES `t_incidencias`(`ct_cod_incidencia`) ON DELETE RESTRICT ON UPDATE RESTRICT;
