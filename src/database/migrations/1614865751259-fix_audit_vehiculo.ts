import {MigrationInterface, QueryRunner} from "typeorm";

export class fixAuditVehiculo1614865751259 implements MigrationInterface {
    name = 'fixAuditVehiculo1614865751259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` DROP FOREIGN KEY `FK_0b2c8c2fa0661215381f12ac770`");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` CHANGE `idVehiculoId` `idVehiculoId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` CHANGE `id` `id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` ADD PRIMARY KEY (`id`)");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` CHANGE `idTransportistaId` `idTransportistaId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` ADD CONSTRAINT `FK_3640c6750b2929b5bfb58c4879d` FOREIGN KEY (`idVehiculoId`) REFERENCES `vehiculo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` ADD CONSTRAINT `FK_0b2c8c2fa0661215381f12ac770` FOREIGN KEY (`idTransportistaId`) REFERENCES `transportista`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` DROP FOREIGN KEY `FK_0b2c8c2fa0661215381f12ac770`");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` DROP FOREIGN KEY `FK_3640c6750b2929b5bfb58c4879d`");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` CHANGE `idTransportistaId` `idTransportistaId` int NULL");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` CHANGE `id` `id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` ADD PRIMARY KEY (`id`, `idVehiculoId`)");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` CHANGE `idVehiculoId` `idVehiculoId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `vehiculo_auditoria` ADD CONSTRAINT `FK_0b2c8c2fa0661215381f12ac770` FOREIGN KEY (`idTransportistaId`) REFERENCES `transportista`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
