import {MigrationInterface, QueryRunner} from "typeorm";

export class testIngresoAuditoria1615407086321 implements MigrationInterface {
    name = 'testIngresoAuditoria1615407086321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP FOREIGN KEY `FK_452e04f74b6f1ad4fbbd2fa228a`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP FOREIGN KEY `FK_521a34311ebce5215456ccdb1c9`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP FOREIGN KEY `FK_7d6c659fd294376470c3531eae2`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP FOREIGN KEY `FK_853a8607f93993ce62db3e61680`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP COLUMN `idPlantaProcesoId`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP COLUMN `idResiduoId`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP COLUMN `idVehiculoId`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP COLUMN `idConductorId`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD `idAuditoriaPlantaProcesoId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD `idAuditoriaResiduoId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD `idAuditoriaVehiculoId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD `idAuditoriaConductorId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` CHANGE `salida` `salida` datetime NULL");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD CONSTRAINT `FK_343709e4cc8e929a0068da7ce7d` FOREIGN KEY (`idAuditoriaPlantaProcesoId`) REFERENCES `planta_proceso_auditoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD CONSTRAINT `FK_223b09e041d92a00b8ac4c42e64` FOREIGN KEY (`idAuditoriaResiduoId`) REFERENCES `residuo_auditoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD CONSTRAINT `FK_b5d666a26c7d039ad471b69a18a` FOREIGN KEY (`idAuditoriaVehiculoId`) REFERENCES `vehiculo_auditoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD CONSTRAINT `FK_532e78e8ede463ad7b6a79f2e52` FOREIGN KEY (`idAuditoriaConductorId`) REFERENCES `conductor_auditoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP FOREIGN KEY `FK_532e78e8ede463ad7b6a79f2e52`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP FOREIGN KEY `FK_b5d666a26c7d039ad471b69a18a`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP FOREIGN KEY `FK_223b09e041d92a00b8ac4c42e64`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP FOREIGN KEY `FK_343709e4cc8e929a0068da7ce7d`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` CHANGE `salida` `salida` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP COLUMN `idAuditoriaConductorId`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP COLUMN `idAuditoriaVehiculoId`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP COLUMN `idAuditoriaResiduoId`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP COLUMN `idAuditoriaPlantaProcesoId`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD `idConductorId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD `idVehiculoId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD `idResiduoId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD `idPlantaProcesoId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD CONSTRAINT `FK_853a8607f93993ce62db3e61680` FOREIGN KEY (`idVehiculoId`) REFERENCES `vehiculo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD CONSTRAINT `FK_7d6c659fd294376470c3531eae2` FOREIGN KEY (`idResiduoId`) REFERENCES `residuo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD CONSTRAINT `FK_521a34311ebce5215456ccdb1c9` FOREIGN KEY (`idConductorId`) REFERENCES `conductor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD CONSTRAINT `FK_452e04f74b6f1ad4fbbd2fa228a` FOREIGN KEY (`idPlantaProcesoId`) REFERENCES `planta_proceso`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
