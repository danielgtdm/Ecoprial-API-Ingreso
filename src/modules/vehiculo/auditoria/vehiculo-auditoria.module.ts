import { Module } from '@nestjs/common';
import { VehiculoAuditoriaService } from './vehiculo-auditoria.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehiculoAuditoriaRepository } from './auditoria.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VehiculoAuditoriaRepository])],
  providers: [VehiculoAuditoriaService],
  exports: [VehiculoAuditoriaService],
})
export class VehiculoAuditoriaModule {}
