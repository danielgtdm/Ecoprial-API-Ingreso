import {MigrationInterface, QueryRunner} from "typeorm";

export class fixedVehiculo1614712541552 implements MigrationInterface {
    name = 'fixedVehiculo1614712541552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `vehiculo` DROP COLUMN `rut`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `vehiculo` ADD `rut` varchar(255) NOT NULL");
    }

}
