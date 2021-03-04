import {MigrationInterface, QueryRunner} from "typeorm";

export class fixAuditVehiculo1614864584751 implements MigrationInterface {
    name = 'fixAuditVehiculo1614864584751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` CHANGE `status` `status_Vehiculo` varchar(8) NOT NULL DEFAULT 'ACTIVE'");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` CHANGE `status_Vehiculo` `status_Vehiculo` varchar(8) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` CHANGE `status_Vehiculo` `status_Vehiculo` varchar(8) NOT NULL DEFAULT 'ACTIVE'");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` CHANGE `status_Vehiculo` `status` varchar(8) NOT NULL DEFAULT 'ACTIVE'");
    }

}
