import {MigrationInterface, QueryRunner} from "typeorm";

export class featureIngresoAudit1614886589736 implements MigrationInterface {
    name = 'featureIngresoAudit1614886589736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `ingreso_auditoria` (`id` int NOT NULL AUTO_INCREMENT, `entrada` datetime NOT NULL, `salida` datetime NOT NULL, `nro_guia` int NOT NULL, `nro_report` int NOT NULL, `status_Ingreso` varchar(8) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `idIngresoId` int NOT NULL, `idPlantaProcesoId` int NOT NULL, `idResiduoId` int NOT NULL, `idVehiculoId` int NOT NULL, `idConductorId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD CONSTRAINT `FK_1518be91c90cc21c09e06dfec3d` FOREIGN KEY (`idIngresoId`) REFERENCES `ingreso`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD CONSTRAINT `FK_452e04f74b6f1ad4fbbd2fa228a` FOREIGN KEY (`idPlantaProcesoId`) REFERENCES `planta_proceso`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD CONSTRAINT `FK_7d6c659fd294376470c3531eae2` FOREIGN KEY (`idResiduoId`) REFERENCES `residuo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD CONSTRAINT `FK_853a8607f93993ce62db3e61680` FOREIGN KEY (`idVehiculoId`) REFERENCES `vehiculo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` ADD CONSTRAINT `FK_521a34311ebce5215456ccdb1c9` FOREIGN KEY (`idConductorId`) REFERENCES `conductor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP FOREIGN KEY `FK_521a34311ebce5215456ccdb1c9`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP FOREIGN KEY `FK_853a8607f93993ce62db3e61680`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP FOREIGN KEY `FK_7d6c659fd294376470c3531eae2`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP FOREIGN KEY `FK_452e04f74b6f1ad4fbbd2fa228a`");
        await queryRunner.query("ALTER TABLE `ingreso_auditoria` DROP FOREIGN KEY `FK_1518be91c90cc21c09e06dfec3d`");
        await queryRunner.query("DROP TABLE `ingreso_auditoria`");
    }

}
