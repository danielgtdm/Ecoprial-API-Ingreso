import {MigrationInterface, QueryRunner} from "typeorm";

export class fixedIngreso1615240631689 implements MigrationInterface {
    name = 'fixedIngreso1615240631689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ingreso` CHANGE `salida` `salida` datetime NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ingreso` CHANGE `salida` `salida` datetime NOT NULL");
    }

}
