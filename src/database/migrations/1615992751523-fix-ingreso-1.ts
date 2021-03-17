import {MigrationInterface, QueryRunner} from "typeorm";

export class fixIngreso11615992751523 implements MigrationInterface {
    name = 'fixIngreso11615992751523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ingreso` CHANGE `nro_guia` `nro_guia` int NOT NULL");
        await queryRunner.query("ALTER TABLE `ingreso` ADD UNIQUE INDEX `IDX_0cff72759934841f7f90e2b3df` (`nro_guia`)");
        await queryRunner.query("ALTER TABLE `ingreso` CHANGE `nro_report` `nro_report` int NOT NULL");
        await queryRunner.query("ALTER TABLE `ingreso` ADD UNIQUE INDEX `IDX_0adb2ade3dee33a2705b04170d` (`nro_report`)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `ingreso` DROP INDEX `IDX_0adb2ade3dee33a2705b04170d`");
        await queryRunner.query("ALTER TABLE `ingreso` CHANGE `nro_report` `nro_report` int NOT NULL");
        await queryRunner.query("ALTER TABLE `ingreso` DROP INDEX `IDX_0cff72759934841f7f90e2b3df`");
        await queryRunner.query("ALTER TABLE `ingreso` CHANGE `nro_guia` `nro_guia` int NOT NULL");
    }

}
