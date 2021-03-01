import { Module } from '@nestjs/common';
import { PlantaProcesoController } from './planta-proceso.controller';
import { PlantaProcesoService } from './planta-proceso.service';

@Module({
  controllers: [PlantaProcesoController],
  providers: [PlantaProcesoService]
})
export class PlantaProcesoModule {}
