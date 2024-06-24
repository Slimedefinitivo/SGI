-- DropIndex
DROP INDEX `t_diagnosticosxincidencias_cn_cod_diagnostico_fkey` ON `t_diagnosticosxincidencias`;

-- DropIndex
DROP INDEX `t_diagnosticosxincidencias_cn_cod_usuario_fkey` ON `t_diagnosticosxincidencias`;

-- DropIndex
DROP INDEX `t_diagnosticosxincidencias_ct_cod_incidencia_fkey` ON `t_diagnosticosxincidencias`;

-- DropIndex
DROP INDEX `t_imagenesxdiagnostico_cn_cod_diagnostico_fkey` ON `t_imagenesxdiagnostico`;

-- DropIndex
DROP INDEX `t_imagenesxincidencias_ct_cod_incidencia_fkey` ON `t_imagenesxincidencias`;

-- DropIndex
DROP INDEX `t_incidencias_cn_cod_estado_fkey` ON `t_incidencias`;

-- DropIndex
DROP INDEX `t_incidencias_cn_cod_usuario_fkey` ON `t_incidencias`;

-- DropIndex
DROP INDEX `t_usuarios_cn_id_departamento_fkey` ON `t_usuarios`;

-- CreateTable
CREATE TABLE `t_puestos` (
    `cn_cod_puesto` INTEGER NOT NULL,
    `ct_nombre` VARCHAR(191) NOT NULL,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `fecha_fin` DATETIME(3) NULL,
    `cn_cod_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`cn_cod_puesto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `t_usuarios` ADD CONSTRAINT `t_usuarios_cn_id_departamento_fkey` FOREIGN KEY (`cn_id_departamento`) REFERENCES `t_departamento`(`cn_id_departamento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_puestos` ADD CONSTRAINT `t_puestos_cn_cod_usuario_fkey` FOREIGN KEY (`cn_cod_usuario`) REFERENCES `t_usuarios`(`cn_cod_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
