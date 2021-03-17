import {MigrationInterface, QueryRunner} from "typeorm";

export class fix1615933818440 implements MigrationInterface {
    name = 'fix1615933818440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `tipo_residuo` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `descripcion` varchar(255) NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `residuo` (`id` int NOT NULL AUTO_INCREMENT, `cantidad` double NOT NULL, `celda` int NOT NULL, `humedad` double NOT NULL, `pH` double NOT NULL, `temperatura` double NOT NULL, `conductividad_electrica` double NOT NULL, `salinidad` double NOT NULL, `tds` double NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `tipoResiduoId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `generador` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `rut` varchar(255) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `planta_proceso` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `generadorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `transportista` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `rut` varchar(255) NOT NULL, `descripcion` varchar(255) NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `vehiculo` (`id` int NOT NULL AUTO_INCREMENT, `patente` varchar(255) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `transportistaId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `ingreso` (`id` int NOT NULL AUTO_INCREMENT, `entrada` datetime NOT NULL, `salida` datetime NULL, `nro_guia` int NOT NULL, `nro_report` int NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `plantaProcesoId` int NULL, `residuoId` int NULL, `vehiculoId` int NULL, `conductorId` int NULL, UNIQUE INDEX `REL_e2362d3264bc33446fe82c27cb` (`residuoId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `conductor` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `apellido` varchar(255) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `transportistaId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `transportista_auditoria` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `rut` varchar(255) NOT NULL, `descripcion` varchar(255) NULL, `status_Transportista` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `idTransportistaId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `rol` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `descripcion` varchar(255) NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `usuario` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `apellido` varchar(255) NOT NULL, `email` varchar(255) NULL, `password` varchar(255) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `conductor_auditoria` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `apellido` varchar(255) NOT NULL, `status_Conductor` varchar(8) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `idConductorId` int NOT NULL, `idAuditoriaTransportistaId` int NOT NULL, `idUsuarioId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `generador_auditoria` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `rut` varchar(255) NOT NULL, `status_Generador` varchar(8) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `idGeneradorId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `planta_proceso_auditoria` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `status_Planta_Proceso` varchar(8) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `idPlantaProcesoId` int NOT NULL, `idAuditoriaGeneradorId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `tipo_residuo_auditoria` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `descripcion` varchar(255) NULL, `status_Residuo` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `idTipoResiduoId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `residuo_auditoria` (`id` int NOT NULL AUTO_INCREMENT, `cantidad` double NOT NULL, `celda` int NOT NULL, `humedad` double NOT NULL, `pH` double NOT NULL, `temperatura` double NOT NULL, `conductividad_electrica` double NOT NULL, `salinidad` double NOT NULL, `tds` double NOT NULL, `status_Residuo` varchar(8) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `idResiduoId` int NOT NULL, `idAuditoriaTipoResiduoId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `vehiculo_auditoria` (`id` int NOT NULL AUTO_INCREMENT, `patente` varchar(255) NOT NULL, `status_Vehiculo` varchar(8) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `idVehiculoId` int NOT NULL, `idAuditoriaTransportistaId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `ingreso_auditoria` (`id` int NOT NULL AUTO_INCREMENT, `entrada` datetime NOT NULL, `salida` datetime NULL, `nro_guia` int NOT NULL, `nro_report` int NOT NULL, `status_Ingreso` varchar(8) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `idIngresoId` int NOT NULL, `idAuditoriaPlantaProcesoId` int NOT NULL, `idAuditoriaResiduoId` int NOT NULL, `idAuditoriaVehiculoId` int NOT NULL, `idAuditoriaConductorId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `vehiculo__conductores_conductor` (`vehiculoId` int NOT NULL, `conductorId` int NOT NULL, INDEX `IDX_1979608cd99940b1a9cb4541e2` (`vehiculoId`), INDEX `IDX_6edaf62b4501a9c04ac8593be9` (`conductorId`), PRIMARY KEY (`vehiculoId`, `conductorId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `usuario_roles` (`usuarioId` int NOT NULL, `rolId` int NOT NULL, INDEX `IDX_84b8fb5afed97d1a5632599e1d` (`usuarioId`), INDEX `IDX_8fb38fb2056d91e441af6a63ef` (`rolId`), PRIMARY KEY (`usuarioId`, `rolId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `residuo` ADD CONSTRAINT `FK_4d145dc7e5956a36603716a390a` FOREIGN KEY (`tipoResiduoId`) REFERENCES `tipo_residuo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `planta_proceso` ADD CONSTRAINT `FK_d0adad01175649e48515d38cfae` FOREIGN KEY (`generadorId`) REFERENCES `generador`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `vehiculo` ADD CONSTRAINT `FK_8ad621879c3304eede7bb551fad` FOREIGN KEY (`transportistaId`) REFERENCES `transportista`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso` ADD CONSTRAINT `FK_cc5829fa1a3847f252c8e01be80` FOREIGN KEY (`plantaProcesoId`) REFERENCES `planta_proceso`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso` ADD CONSTRAINT `FK_e2362d3264bc33446fe82c27cbf` FOREIGN KEY (`residuoId`) REFERENCES `residuo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso` ADD CONSTRAINT `FK_8ed8dd649485793c1c892ae2069` FOREIGN KEY (`vehiculoId`) REFERENCES `vehiculo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso` ADD CONSTRAINT `FK_8734adfb0d950c0f30ebe03ba03` FOREIGN KEY (`conductorId`) REFERENCES `conductor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `conductor` ADD CONSTRAINT `FK_ed0916fa0d94ae3e6e1958f2e1c` FOREIGN KEY (`transportistaId`) REFERENCES `transportista`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `transportista_auditoria` ADD CONSTRAINT `FK_2dd9e6717c73da6829b346a5038` FOREIGN KEY (`idTransportistaId`) REFERENCES `transportista`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `conductor_auditoria` ADD CONSTRAINT `FK_ba6860f6f21bd85828419ecc0fe` FOREIGN KEY (`idConductorId`) REFERENCES `conductor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `conductor_auditoria` ADD CONSTRAINT `FK_05ddebf66c7fb5a10c04912fe53` FOREIGN KEY (`idAuditoriaTransportistaId`) REFERENCES `transportista_auditoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `conductor_auditoria` ADD CONSTRAINT `FK_71453abf972e88d1379b2e6086d` FOREIGN KEY (`idUsuarioId`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `generador_auditoria` ADD CONSTRAINT `FK_259a2ac6e69ac6fa61eb0dd03b6` FOREIGN KEY (`idGeneradorId`) REFERENCES `generador`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `planta_proceso_auditoria` ADD CONSTRAINT `FK_865174ba0087f71f042af4e5a41` FOREIGN KEY (`idPlantaProcesoId`) REFERENCES `planta_proceso`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `planta_proceso_auditoria` ADD CONSTRAINT `FK_99952e7fd7839baac0de1d2dcee` FOREIGN KEY (`idAuditoriaGeneradorId`) REFERENCES `generador_auditoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `tipo_residuo_auditoria` ADD CONSTRAINT `FK_bd2296ff17fc866ecf7033baef0` FOREIGN KEY (`idTipoResiduoId`) REFERENCES `tipo_residuo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `residuo_auditoria` ADD CONSTRAINT `FK_97529dd5d5859922bf52a3b040b` FOREIGN KEY (`idResiduoId`) REFERENCES `residuo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `residuo_auditoria` ADD CONSTRAINT `FK_e08b058fc660ecb598d5fc8112d` FOREIGN KEY (`idAuditoriaTipoResiduoId`) REFERENCES `tipo_residuo_auditoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` ADD CONSTRAINT `FK_3640c6750b2929b5bfb58c4879d` FOREIGN KEY (`idVehiculoId`) REFERENCES `vehiculo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` ADD CONSTRAINT `FK_46f95e704a4c6d96f904b3dd0d0` FOREIGN KEY (`idAuditoriaTransportistaId`) REFERENCES `transportista_auditoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD CONSTRAINT `FK_1518be91c90cc21c09e06dfec3d` FOREIGN KEY (`idIngresoId`) REFERENCES `ingreso`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD CONSTRAINT `FK_343709e4cc8e929a0068da7ce7d` FOREIGN KEY (`idAuditoriaPlantaProcesoId`) REFERENCES `planta_proceso_auditoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD CONSTRAINT `FK_223b09e041d92a00b8ac4c42e64` FOREIGN KEY (`idAuditoriaResiduoId`) REFERENCES `residuo_auditoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD CONSTRAINT `FK_b5d666a26c7d039ad471b69a18a` FOREIGN KEY (`idAuditoriaVehiculoId`) REFERENCES `vehiculo_auditoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD CONSTRAINT `FK_532e78e8ede463ad7b6a79f2e52` FOREIGN KEY (`idAuditoriaConductorId`) REFERENCES `conductor_auditoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `vehiculo__conductores_conductor` ADD CONSTRAINT `FK_1979608cd99940b1a9cb4541e29` FOREIGN KEY (`vehiculoId`) REFERENCES `vehiculo`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `vehiculo__conductores_conductor` ADD CONSTRAINT `FK_6edaf62b4501a9c04ac8593be94` FOREIGN KEY (`conductorId`) REFERENCES `conductor`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `usuario_roles` ADD CONSTRAINT `FK_84b8fb5afed97d1a5632599e1db` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `usuario_roles` ADD CONSTRAINT `FK_8fb38fb2056d91e441af6a63ef6` FOREIGN KEY (`rolId`) REFERENCES `rol`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `usuario_roles` DROP FOREIGN KEY `FK_8fb38fb2056d91e441af6a63ef6`");
        await queryRunner.query("ALTER TABLE `usuario_roles` DROP FOREIGN KEY `FK_84b8fb5afed97d1a5632599e1db`");
        await queryRunner.query("ALTER TABLE `vehiculo__conductores_conductor` DROP FOREIGN KEY `FK_6edaf62b4501a9c04ac8593be94`");
        await queryRunner.query("ALTER TABLE `vehiculo__conductores_conductor` DROP FOREIGN KEY `FK_1979608cd99940b1a9cb4541e29`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP FOREIGN KEY `FK_532e78e8ede463ad7b6a79f2e52`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP FOREIGN KEY `FK_b5d666a26c7d039ad471b69a18a`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP FOREIGN KEY `FK_223b09e041d92a00b8ac4c42e64`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP FOREIGN KEY `FK_343709e4cc8e929a0068da7ce7d`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP FOREIGN KEY `FK_1518be91c90cc21c09e06dfec3d`");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` DROP FOREIGN KEY `FK_46f95e704a4c6d96f904b3dd0d0`");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` DROP FOREIGN KEY `FK_3640c6750b2929b5bfb58c4879d`");
        await queryRunner.query("ALTER TABLE `residuo_auditoria` DROP FOREIGN KEY `FK_e08b058fc660ecb598d5fc8112d`");
        await queryRunner.query("ALTER TABLE `residuo_auditoria` DROP FOREIGN KEY `FK_97529dd5d5859922bf52a3b040b`");
        await queryRunner.query("ALTER TABLE `tipo_residuo_auditoria` DROP FOREIGN KEY `FK_bd2296ff17fc866ecf7033baef0`");
        await queryRunner.query("ALTER TABLE `planta_proceso_auditoria` DROP FOREIGN KEY `FK_99952e7fd7839baac0de1d2dcee`");
        await queryRunner.query("ALTER TABLE `planta_proceso_auditoria` DROP FOREIGN KEY `FK_865174ba0087f71f042af4e5a41`");
        await queryRunner.query("ALTER TABLE `generador_auditoria` DROP FOREIGN KEY `FK_259a2ac6e69ac6fa61eb0dd03b6`");
        await queryRunner.query("ALTER TABLE `conductor_auditoria` DROP FOREIGN KEY `FK_71453abf972e88d1379b2e6086d`");
        await queryRunner.query("ALTER TABLE `conductor_auditoria` DROP FOREIGN KEY `FK_05ddebf66c7fb5a10c04912fe53`");
        await queryRunner.query("ALTER TABLE `conductor_auditoria` DROP FOREIGN KEY `FK_ba6860f6f21bd85828419ecc0fe`");
        await queryRunner.query("ALTER TABLE `transportista_auditoria` DROP FOREIGN KEY `FK_2dd9e6717c73da6829b346a5038`");
        await queryRunner.query("ALTER TABLE `conductor` DROP FOREIGN KEY `FK_ed0916fa0d94ae3e6e1958f2e1c`");
        await queryRunner.query("ALTER TABLE `ingreso` DROP FOREIGN KEY `FK_8734adfb0d950c0f30ebe03ba03`");
        await queryRunner.query("ALTER TABLE `ingreso` DROP FOREIGN KEY `FK_8ed8dd649485793c1c892ae2069`");
        await queryRunner.query("ALTER TABLE `ingreso` DROP FOREIGN KEY `FK_e2362d3264bc33446fe82c27cbf`");
        await queryRunner.query("ALTER TABLE `ingreso` DROP FOREIGN KEY `FK_cc5829fa1a3847f252c8e01be80`");
        await queryRunner.query("ALTER TABLE `vehiculo` DROP FOREIGN KEY `FK_8ad621879c3304eede7bb551fad`");
        await queryRunner.query("ALTER TABLE `planta_proceso` DROP FOREIGN KEY `FK_d0adad01175649e48515d38cfae`");
        await queryRunner.query("ALTER TABLE `residuo` DROP FOREIGN KEY `FK_4d145dc7e5956a36603716a390a`");
        await queryRunner.query("DROP INDEX `IDX_8fb38fb2056d91e441af6a63ef` ON `usuario_roles`");
        await queryRunner.query("DROP INDEX `IDX_84b8fb5afed97d1a5632599e1d` ON `usuario_roles`");
        await queryRunner.query("DROP TABLE `usuario_roles`");
        await queryRunner.query("DROP INDEX `IDX_6edaf62b4501a9c04ac8593be9` ON `vehiculo__conductores_conductor`");
        await queryRunner.query("DROP INDEX `IDX_1979608cd99940b1a9cb4541e2` ON `vehiculo__conductores_conductor`");
        await queryRunner.query("DROP TABLE `vehiculo__conductores_conductor`");
        await queryRunner.query("DROP TABLE `ingreso_auditoria`");
        await queryRunner.query("DROP TABLE `vehiculo_auditoria`");
        await queryRunner.query("DROP TABLE `residuo_auditoria`");
        await queryRunner.query("DROP TABLE `tipo_residuo_auditoria`");
        await queryRunner.query("DROP TABLE `planta_proceso_auditoria`");
        await queryRunner.query("DROP TABLE `generador_auditoria`");
        await queryRunner.query("DROP TABLE `conductor_auditoria`");
        await queryRunner.query("DROP TABLE `usuario`");
        await queryRunner.query("DROP TABLE `rol`");
        await queryRunner.query("DROP TABLE `transportista_auditoria`");
        await queryRunner.query("DROP TABLE `conductor`");
        await queryRunner.query("DROP INDEX `REL_e2362d3264bc33446fe82c27cb` ON `ingreso`");
        await queryRunner.query("DROP TABLE `ingreso`");
        await queryRunner.query("DROP TABLE `vehiculo`");
        await queryRunner.query("DROP TABLE `transportista`");
        await queryRunner.query("DROP TABLE `planta_proceso`");
        await queryRunner.query("DROP TABLE `generador`");
        await queryRunner.query("DROP TABLE `residuo`");
        await queryRunner.query("DROP TABLE `tipo_residuo`");
    }

}
