-- CreateTable
CREATE TABLE `T_usuarios` (
    `cn_cod_usuario` INTEGER NOT NULL,
    `ct_nombre` VARCHAR(191) NOT NULL,
    `cn_numero_telefono` INTEGER NOT NULL,
    `ct_correo` VARCHAR(191) NOT NULL,
    `ct_puesto` VARCHAR(191) NOT NULL,
    `ct_clave` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cn_cod_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;




