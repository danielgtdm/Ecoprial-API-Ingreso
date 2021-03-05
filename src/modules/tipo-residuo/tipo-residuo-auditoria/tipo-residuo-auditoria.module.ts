import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoResiduoAuditoriaRepository } from './tipo-residuo-auditoria.repository';
import { TipoResiduoAuditoriaService } from './tipo-residuo-auditoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoResiduoAuditoriaRepository])],
  providers: [TipoResiduoAuditoriaService],
  exports: [TipoResiduoAuditoriaService],
})
export class TipoResiduoAuditoriaModule {}
