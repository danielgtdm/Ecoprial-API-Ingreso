import {MigrationInterface, QueryRunner} from "typeorm";

export class fixedIngreso1614717711831 implements MigrationInterface {
    name = 'fixedIngreso1614717711831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ingreso` ADD `vehiculoId` int NULL");
        await queryRunner.query("ALTER TABLE `ingreso` ADD `conductorId` int NULL");
        await queryRunner.query("ALTER TABLE `ingreso` ADD CONSTRAINT `FK_8ed8dd649485793c1c892ae2069` FOREIGN KEY (`vehiculoId`) REFERENCES `vehiculo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `ingreso` ADD CONSTRAINT `FK_8734adfb0d950c0f30ebe03ba03` FOREIGN KEY (`conductorId`) REFERENCES `conductor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ingreso` DROP FOREIGN KEY `FK_8734adfb0d950c0f30ebe03ba03`");
        await queryRunner.query("ALTER TABLE `ingreso` DROP FOREIGN KEY `FK_8ed8dd649485793c1c892ae2069`");
        await queryRunner.query("ALTER TABLE `ingreso` DROP COLUMN `conductorId`");
        await queryRunner.query("ALTER TABLE `ingreso` DROP COLUMN `vehiculoId`");
    }

}
