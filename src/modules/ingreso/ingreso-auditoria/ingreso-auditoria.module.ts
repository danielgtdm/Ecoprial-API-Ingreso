import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngresoAuditoriaRepository } from './ingreso-auditoria.repository';
import { IngresoAuditoriaService } from './ingreso-auditoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([IngresoAuditoriaRepository])],
  providers: [IngresoAuditoriaService],
  exports: [IngresoAuditoriaService],
})
export class IngresoAuditoriaModule {}
