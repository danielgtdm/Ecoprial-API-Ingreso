import { Module } from '@nestjs/common';
import { ResiduoController } from './residuo.controller';
import { ResiduoService } from './residuo.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { TipoResiduoModule } from '../tipo-residuo/tipo-residuo.module';
import { TipoResiduoRepository } from '../tipo-residuo/tipo-residuo.repository';
import { TipoResiduoService } from '../tipo-residuo/tipo-residuo.service';
import { ResiduoRepository } from './residuo.repository';
import { ResiduoAuditoriaModule } from './residuo-auditoria/residuo-auditoria.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResiduoRepository, TipoResiduoRepository]),
    TipoResiduoModule,
    ResiduoAuditoriaModule,
  ],
  controllers: [ResiduoController],
  providers: [ResiduoService, TipoResiduoService],
})
export class ResiduoModule {}
