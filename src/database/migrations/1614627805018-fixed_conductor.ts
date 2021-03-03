import {MigrationInterface, QueryRunner} from "typeorm";

export class fixedConductor1614627805018 implements MigrationInterface {
    name = 'fixedConductor1614627805018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `conductor` CHANGE `rut` `apellido` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `conductor` CHANGE `apellido` `rut` varchar(255) NOT NULL");
    }

}
