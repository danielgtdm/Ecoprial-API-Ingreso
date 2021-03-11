import {MigrationInterface, QueryRunner} from "typeorm";

export class fixResiduoAuditoria1615402816756 implements MigrationInterface {
    name = 'fixResiduoAuditoria1615402816756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `residuo_auditoria` DROP FOREIGN KEY `FK_d1ac23211ab4b701993a1b2e4de`");
        await queryRunner.query("ALTER TABLE `residuo_auditoria` CHANGE `idTipoResiduoId` `idAuditoriaTipoResiduoId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `residuo_auditoria` ADD CONSTRAINT `FK_e08b058fc660ecb598d5fc8112d` FOREIGN KEY (`idAuditoriaTipoResiduoId`) REFERENCES `tipo_residuo_auditoria`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `residuo_auditoria` DROP FOREIGN KEY `FK_e08b058fc660ecb598d5fc8112d`");
        await queryRunner.query("ALTER TABLE `residuo_auditoria` CHANGE `idAuditoriaTipoResiduoId` `idTipoResiduoId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `residuo_auditoria` ADD CONSTRAINT `FK_d1ac23211ab4b701993a1b2e4de` FOREIGN KEY (`idTipoResiduoId`) REFERENCES `tipo_residuo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
