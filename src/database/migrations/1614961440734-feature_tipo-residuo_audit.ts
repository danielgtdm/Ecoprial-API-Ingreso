import {MigrationInterface, QueryRunner} from "typeorm";

export class featureTipoResiduoAudit1614961440734 implements MigrationInterface {
    name = 'featureTipoResiduoAudit1614961440734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `tipo_residuo_auditoria` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `descripcion` varchar(255) NULL, `status_Residuo` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `idTipoResiduoId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `tipo_residuo_auditoria` ADD CONSTRAINT `FK_bd2296ff17fc866ecf7033baef0` FOREIGN KEY (`idTipoResiduoId`) REFERENCES `tipo_residuo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `tipo_residuo_auditoria` DROP FOREIGN KEY `FK_bd2296ff17fc866ecf7033baef0`");
        await queryRunner.query("DROP TABLE `tipo_residuo_auditoria`");
    }

}
