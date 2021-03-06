import {MigrationInterface, QueryRunner} from "typeorm";

export class featureTransportistaAudit1615002568611 implements MigrationInterface {
    name = 'featureTransportistaAudit1615002568611'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `transportista_auditoria` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `rut` varchar(255) NOT NULL, `descripcion` varchar(255) NULL, `status_Transportista` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `idTransportistaId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `transportista_auditoria` ADD CONSTRAINT `FK_2dd9e6717c73da6829b346a5038` FOREIGN KEY (`idTransportistaId`) REFERENCES `transportista`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `transportista_auditoria` DROP FOREIGN KEY `FK_2dd9e6717c73da6829b346a5038`");
        await queryRunner.query("DROP TABLE `transportista_auditoria`");
    }

}
