import {MigrationInterface, QueryRunner} from "typeorm";

export class featurePlantaProcesoAudit1614891303751 implements MigrationInterface {
    name = 'featurePlantaProcesoAudit1614891303751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `planta_proceso_auditoria` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `status_Planta_Proceso` varchar(8) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `idPlantaProcesoId` int NOT NULL, `idGeneradorId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `planta_proceso_auditoria` ADD CONSTRAINT `FK_865174ba0087f71f042af4e5a41` FOREIGN KEY (`idPlantaProcesoId`) REFERENCES `planta_proceso`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `planta_proceso_auditoria` ADD CONSTRAINT `FK_12a047f121af85dfaac54e148af` FOREIGN KEY (`idGeneradorId`) REFERENCES `generador`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `planta_proceso_auditoria` DROP FOREIGN KEY `FK_12a047f121af85dfaac54e148af`");
        await queryRunner.query("ALTER TABLE `planta_proceso_auditoria` DROP FOREIGN KEY `FK_865174ba0087f71f042af4e5a41`");
        await queryRunner.query("DROP TABLE `planta_proceso_auditoria`");
    }

}
