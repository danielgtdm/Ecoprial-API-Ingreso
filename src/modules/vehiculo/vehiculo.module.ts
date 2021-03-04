import { Module } from '@nestjs/common';
import { VehiculoController } from './vehiculo.controller';
import { VehiculoService } from './vehiculo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculoRepository } from './vehiculo.repository';

import { TransportistaModule } from '../transportista/transportista.module';
import { VehiculoAuditoriaModule } from './auditoria/vehiculo-auditoria.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehiculoRepository]),
    TransportistaModule,
    VehiculoAuditoriaModule,
  ],
  controllers: [VehiculoController],
  providers: [VehiculoService],
  exports: [VehiculoService],
})
export class VehiculoModule {}
