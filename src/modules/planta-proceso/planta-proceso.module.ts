import { Module } from '@nestjs/common';
import { PlantaProcesoController } from './planta-proceso.controller';
import { PlantaProcesoService } from './planta-proceso.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlantaProcesoRepository } from './planta-proceso.repository';
import { GeneradorRepository } from '../generador/generador.repository';
import { GeneradorService } from '../generador/generador.service';
import { GeneradorModule } from '../generador/generador.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlantaProcesoRepository, GeneradorRepository]),
    GeneradorModule,
  ],
  controllers: [PlantaProcesoController],
  providers: [PlantaProcesoService, GeneradorService],
  exports: [PlantaProcesoService],
})
export class PlantaProcesoModule {}
