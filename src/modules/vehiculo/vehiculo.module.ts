import { Module } from '@nestjs/common';
import { VehiculoController } from './vehiculo.controller';
import { VehiculoService } from './vehiculo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculoRepository } from './vehiculo.repository';

import { TransportistaRepository } from '../transportista/transportista.repository';
import { TransportistaService } from '../transportista/transportista.service';
import { TransportistaModule } from '../transportista/transportista.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehiculoRepository, TransportistaRepository]),
    TransportistaModule,
  ],
  controllers: [VehiculoController],
  providers: [VehiculoService, TransportistaService],
  exports: [VehiculoService],
})
export class VehiculoModule {}
