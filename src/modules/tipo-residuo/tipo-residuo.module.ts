import { Module } from '@nestjs/common';
import { TipoResiduoController } from './tipo-residuo.controller';
import { TipoResiduoService } from './tipo-residuo.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TipoResiduoRepository } from './tipo-residuo.repository';
import { TipoResiduoAuditoriaModule } from './tipo-residuo-auditoria/tipo-residuo-auditoria.module';

@Module({
  imports: [TypeOrmModule.forFeature([TipoResiduoRepository]), TipoResiduoAuditoriaModule],
  controllers: [TipoResiduoController],
  providers: [TipoResiduoService],
  exports: [TipoResiduoService],
})
export class TipoResiduoModule {}
