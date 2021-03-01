import {MigrationInterface, QueryRunner} from "typeorm";

export class first1614614329648 implements MigrationInterface {
    name = 'first1614614329648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `vehiculo` (`id` int NOT NULL AUTO_INCREMENT, `patente` varchar(255) NOT NULL, `rut` varchar(255) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `transportistaId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `transportista` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `rut` varchar(255) NOT NULL, `descripcion` varchar(255) NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `conductor` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `rut` varchar(255) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `transportistaId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `tipo_residuo` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `descripcion` varchar(255) NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `residuo` (`id` int NOT NULL AUTO_INCREMENT, `cantidad` double NOT NULL, `celda` int NOT NULL, `humedad` double NOT NULL, `pH` double NOT NULL, `temperatura` double NOT NULL, `conductividad_electrica` double NOT NULL, `salinidad` double NOT NULL, `tds` double NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `tipoResiduoId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `ingreso` (`id` int NOT NULL AUTO_INCREMENT, `entrada` datetime NOT NULL, `salida` datetime NOT NULL, `nro_guia` int NOT NULL, `nro_report` int NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `plantaProcesoId` int NULL, `residuoId` int NULL, UNIQUE INDEX `REL_e2362d3264bc33446fe82c27cb` (`residuoId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `planta_proceso` (`id` int NOT NULL AUTO_INCREMENT, `cantidad` double NOT NULL, `celda` int NOT NULL, `humedad` double NOT NULL, `pH` double NOT NULL, `temperatura` double NOT NULL, `conductividad_electrica` double NOT NULL, `salinidad` double NOT NULL, `tds` double NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `generadorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `generador` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `rut` varchar(255) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `vehiculo__conductores_conductor` (`vehiculoId` int NOT NULL, `conductorId` int NOT NULL, INDEX `IDX_1979608cd99940b1a9cb4541e2` (`vehiculoId`), INDEX `IDX_6edaf62b4501a9c04ac8593be9` (`conductorId`), PRIMARY KEY (`vehiculoId`, `conductorId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `vehiculo` ADD CONSTRAINT `FK_8ad621879c3304eede7bb551fad` FOREIGN KEY (`transportistaId`) REFERENCES `transportista`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `conductor` ADD CONSTRAINT `FK_ed0916fa0d94ae3e6e1958f2e1c` FOREIGN KEY (`transportistaId`) REFERENCES `transportista`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `residuo` ADD CONSTRAINT `FK_4d145dc7e5956a36603716a390a` FOREIGN KEY (`tipoResiduoId`) REFERENCES `tipo_residuo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso` ADD CONSTRAINT `FK_cc5829fa1a3847f252c8e01be80` FOREIGN KEY (`plantaProcesoId`) REFERENCES `planta_proceso`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso` ADD CONSTRAINT `FK_e2362d3264bc33446fe82c27cbf` FOREIGN KEY (`residuoId`) REFERENCES `residuo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `planta_proceso` ADD CONSTRAINT `FK_d0adad01175649e48515d38cfae` FOREIGN KEY (`generadorId`) REFERENCES `generador`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `vehiculo__conductores_conductor` ADD CONSTRAINT `FK_1979608cd99940b1a9cb4541e29` FOREIGN KEY (`vehiculoId`) REFERENCES `vehiculo`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `vehiculo__conductores_conductor` ADD CONSTRAINT `FK_6edaf62b4501a9c04ac8593be94` FOREIGN KEY (`conductorId`) REFERENCES `conductor`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `vehiculo__conductores_conductor` DROP FOREIGN KEY `FK_6edaf62b4501a9c04ac8593be94`");
        await queryRunner.query("ALTER TABLE `vehiculo__conductores_conductor` DROP FOREIGN KEY `FK_1979608cd99940b1a9cb4541e29`");
        await queryRunner.query("ALTER TABLE `planta_proceso` DROP FOREIGN KEY `FK_d0adad01175649e48515d38cfae`");
        await queryRunner.query("ALTER TABLE `ingreso` DROP FOREIGN KEY `FK_e2362d3264bc33446fe82c27cbf`");
        await queryRunner.query("ALTER TABLE `ingreso` DROP FOREIGN KEY `FK_cc5829fa1a3847f252c8e01be80`");
        await queryRunner.query("ALTER TABLE `residuo` DROP FOREIGN KEY `FK_4d145dc7e5956a36603716a390a`");
        await queryRunner.query("ALTER TABLE `conductor` DROP FOREIGN KEY `FK_ed0916fa0d94ae3e6e1958f2e1c`");
        await queryRunner.query("ALTER TABLE `vehiculo` DROP FOREIGN KEY `FK_8ad621879c3304eede7bb551fad`");
        await queryRunner.query("DROP INDEX `IDX_6edaf62b4501a9c04ac8593be9` ON `vehiculo__conductores_conductor`");
        await queryRunner.query("DROP INDEX `IDX_1979608cd99940b1a9cb4541e2` ON `vehiculo__conductores_conductor`");
        await queryRunner.query("DROP TABLE `vehiculo__conductores_conductor`");
        await queryRunner.query("DROP TABLE `generador`");
        await queryRunner.query("DROP TABLE `planta_proceso`");
        await queryRunner.query("DROP INDEX `REL_e2362d3264bc33446fe82c27cb` ON `ingreso`");
        await queryRunner.query("DROP TABLE `ingreso`");
        await queryRunner.query("DROP TABLE `residuo`");
        await queryRunner.query("DROP TABLE `tipo_residuo`");
        await queryRunner.query("DROP TABLE `conductor`");
        await queryRunner.query("DROP TABLE `transportista`");
        await queryRunner.query("DROP TABLE `vehiculo`");
    }

}
