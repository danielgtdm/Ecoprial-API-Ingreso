import {MigrationInterface, QueryRunner} from "typeorm";

export class fixedPlantaProceso1614692100770 implements MigrationInterface {
    name = 'fixedPlantaProceso1614692100770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `planta_proceso` DROP COLUMN `cantidad`");
        await queryRunner.query("ALTER TABLE `planta_proceso` DROP COLUMN `celda`");
        await queryRunner.query("ALTER TABLE `planta_proceso` DROP COLUMN `humedad`");
        await queryRunner.query("ALTER TABLE `planta_proceso` DROP COLUMN `pH`");
        await queryRunner.query("ALTER TABLE `planta_proceso` DROP COLUMN `temperatura`");
        await queryRunner.query("ALTER TABLE `planta_proceso` DROP COLUMN `conductividad_electrica`");
        await queryRunner.query("ALTER TABLE `planta_proceso` DROP COLUMN `salinidad`");
        await queryRunner.query("ALTER TABLE `planta_proceso` DROP COLUMN `tds`");
        await queryRunner.query("ALTER TABLE `planta_proceso` ADD `nombre` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `planta_proceso` DROP COLUMN `nombre`");
        await queryRunner.query("ALTER TABLE `planta_proceso` ADD `tds` double NOT NULL");
        await queryRunner.query("ALTER TABLE `planta_proceso` ADD `salinidad` double NOT NULL");
        await queryRunner.query("ALTER TABLE `planta_proceso` ADD `conductividad_electrica` double NOT NULL");
        await queryRunner.query("ALTER TABLE `planta_proceso` ADD `temperatura` double NOT NULL");
        await queryRunner.query("ALTER TABLE `planta_proceso` ADD `pH` double NOT NULL");
        await queryRunner.query("ALTER TABLE `planta_proceso` ADD `humedad` double NOT NULL");
        await queryRunner.query("ALTER TABLE `planta_proceso` ADD `celda` int NOT NULL");
        await queryRunner.query("ALTER TABLE `planta_proceso` ADD `cantidad` double NOT NULL");
    }

}
