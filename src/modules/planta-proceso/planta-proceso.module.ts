import { Module } from '@nestjs/common';
import { PlantaProcesoController } from './planta-proceso.controller';
import { PlantaProcesoService } from './planta-proceso.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlantaProcesoRepository } from './planta-proceso.repository';
import { GeneradorModule } from '../generador/generador.module';
import { PlantaProcesoAuditoriaModule } from './planta-proceso-auditoria/planta-proceso-auditoria.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlantaProcesoRepository]),
    GeneradorModule,
    PlantaProcesoAuditoriaModule,
  ],
  controllers: [PlantaProcesoController],
  providers: [PlantaProcesoService],
  exports: [PlantaProcesoService],
})
export class PlantaProcesoModule {}
