import { Module } from '@nestjs/common';
import { AuditoriaService } from './auditoria.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuditoriaRepository } from './auditoria.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuditoriaRepository])],
  providers: [AuditoriaService],
  exports: [AuditoriaService],
})
export class AuditoriaModule {}
