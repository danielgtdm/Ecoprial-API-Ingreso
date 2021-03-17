import { Module } from '@nestjs/common';
import { IngresoController } from './ingreso.controller';
import { IngresoService } from './ingreso.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngresoRepository } from './ingreso.repository';
import { PlantaProcesoModule } from '../planta-proceso/planta-proceso.module';
import { VehiculoModule } from '../vehiculo/vehiculo.module';

import { ConductorModule } from '../conductor/conductor.module';

import { GeneradorModule } from '../generador/generador.module';
import { TransportistaModule } from '../transportista/transportista.module';

import { ResiduoModule } from '../residuo/residuo.module';

import { TipoResiduoModule } from '../tipo-residuo/tipo-residuo.module';
import { IngresoAuditoriaModule } from './ingreso-auditoria/ingreso-auditoria.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([IngresoRepository]),
    PlantaProcesoModule,
    VehiculoModule,
    ConductorModule,
    ResiduoModule,
    IngresoAuditoriaModule,
    TipoResiduoModule,
  ],
  controllers: [IngresoController],
  providers: [IngresoService],
  exports: [IngresoService],
})
export class IngresoModule {}
