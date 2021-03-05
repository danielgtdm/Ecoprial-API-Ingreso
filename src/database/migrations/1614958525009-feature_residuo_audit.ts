import {MigrationInterface, QueryRunner} from "typeorm";

export class featureResiduoAudit1614958525009 implements MigrationInterface {
    name = 'featureResiduoAudit1614958525009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `residuo_auditoria` (`id` int NOT NULL AUTO_INCREMENT, `cantidad` double NOT NULL, `celda` int NOT NULL, `humedad` double NOT NULL, `pH` double NOT NULL, `temperatura` double NOT NULL, `conductividad_electrica` double NOT NULL, `salinidad` double NOT NULL, `tds` double NOT NULL, `status_Residuo` varchar(8) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `idResiduoId` int NOT NULL, `idTipoResiduoId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `residuo_auditoria` ADD CONSTRAINT `FK_97529dd5d5859922bf52a3b040b` FOREIGN KEY (`idResiduoId`) REFERENCES `residuo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `residuo_auditoria` ADD CONSTRAINT `FK_d1ac23211ab4b701993a1b2e4de` FOREIGN KEY (`idTipoResiduoId`) REFERENCES `tipo_residuo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `residuo_auditoria` DROP FOREIGN KEY `FK_d1ac23211ab4b701993a1b2e4de`");
        await queryRunner.query("ALTER TABLE `residuo_auditoria` DROP FOREIGN KEY `FK_97529dd5d5859922bf52a3b040b`");
        await queryRunner.query("DROP TABLE `residuo_auditoria`");
    }

}
