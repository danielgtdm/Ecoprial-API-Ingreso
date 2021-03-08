import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneradorAuditoriaRepository } from './generador-auditoria.repository';
import { GeneradorAuditoriaService } from './generador-auditoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([GeneradorAuditoriaRepository])],
  providers: [GeneradorAuditoriaService],
  exports: [GeneradorAuditoriaService],
})
export class GeneradorAuditoriaModule {}
