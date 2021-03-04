import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantaProcesoAuditoriaRepository } from './planta-proceso-auditoria.repository';
import { PlantaProcesoAuditoriaService } from './planta-proceso-auditoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlantaProcesoAuditoriaRepository])],
  providers: [PlantaProcesoAuditoriaService],
  exports: [PlantaProcesoAuditoriaService],
})
export class PlantaProcesoAuditoriaModule {}
