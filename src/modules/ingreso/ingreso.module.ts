import { Module } from '@nestjs/common';
import { IngresoController } from './ingreso.controller';
import { IngresoService } from './ingreso.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngresoRepository } from './ingreso.repository';
import { PlantaProcesoRepository } from '../planta-proceso/planta-proceso.repository';
import { PlantaProcesoService } from '../planta-proceso/planta-proceso.service';
import { VehiculoRepository } from '../vehiculo/vehiculo.repository';
import { VehiculoService } from '../vehiculo/vehiculo.service';
import { PlantaProcesoModule } from '../planta-proceso/planta-proceso.module';
import { VehiculoModule } from '../vehiculo/vehiculo.module';

import { ConductorRepository } from '../conductor/conductor.repository';
import { ConductorService } from '../conductor/conductor.service';
import { ConductorModule } from '../conductor/conductor.module';

import { GeneradorModule } from '../generador/generador.module';
import { TransportistaModule } from '../transportista/transportista.module';

import { ResiduoRepository } from '../residuo/residuo.repository';
import { ResiduoService } from '../residuo/residuo.service';
import { ResiduoModule } from '../residuo/residuo.module';

import { TipoResiduoModule } from '../tipo-residuo/tipo-residuo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IngresoRepository,
      PlantaProcesoRepository,
      VehiculoRepository,
      ConductorRepository,
      ResiduoRepository,
    ]),
    PlantaProcesoModule,
    VehiculoModule,
    ConductorModule,
    GeneradorModule,
    TransportistaModule,
    ResiduoModule,
    TipoResiduoModule,
  ],
  controllers: [IngresoController],
  providers: [
    IngresoService,
    PlantaProcesoService,
    VehiculoService,
    ConductorService,
    ResiduoService,
  ],
})
export class IngresoModule {}
