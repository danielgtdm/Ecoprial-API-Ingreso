import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConductorAuditoriaRepository } from './conductor-auditoria.repository';
import { ConductorAuditoriaService } from './conductor-auditoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConductorAuditoriaRepository])],
  providers: [ConductorAuditoriaService],
  exports: [ConductorAuditoriaService],
})
export class ConductorAuditoriaModule {}
