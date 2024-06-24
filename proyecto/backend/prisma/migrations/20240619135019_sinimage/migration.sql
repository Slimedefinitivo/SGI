/*
  Warnings:

  - You are about to drop the column `ct_urlImagen` on the `t_incidencias` table. All the data in the column will be lost.

*/
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
DROP INDEX `t_puestos_cn_cod_usuario_fkey` ON `t_puestos`;

-- DropIndex
DROP INDEX `t_usuarios_cn_id_departamento_fkey` ON `t_usuarios`;

-- AlterTable
ALTER TABLE `t_incidencias` DROP COLUMN `ct_urlImagen`;

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
