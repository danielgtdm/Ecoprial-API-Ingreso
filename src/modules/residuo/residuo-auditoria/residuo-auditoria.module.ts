import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResiduoAuditoriaRepository } from './residuo-auditoria.repository';
import { ResiduoAuditoriaService } from './residuo-auditoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResiduoAuditoriaRepository])],
  providers: [ResiduoAuditoriaService],
  exports: [ResiduoAuditoriaService],
})
export class ResiduoAuditoriaModule {}
