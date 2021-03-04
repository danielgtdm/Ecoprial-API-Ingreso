import {MigrationInterface, QueryRunner} from "typeorm";

export class featureGeneradorAudit1614882362613 implements MigrationInterface {
    name = 'featureGeneradorAudit1614882362613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `generador_auditoria` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `rut` varchar(255) NOT NULL, `status_Generador` varchar(8) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `idGeneradorId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `generador_auditoria` ADD CONSTRAINT `FK_259a2ac6e69ac6fa61eb0dd03b6` FOREIGN KEY (`idGeneradorId`) REFERENCES `generador`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `generador_auditoria` DROP FOREIGN KEY `FK_259a2ac6e69ac6fa61eb0dd03b6`");
        await queryRunner.query("DROP TABLE `generador_auditoria`");
    }

}
