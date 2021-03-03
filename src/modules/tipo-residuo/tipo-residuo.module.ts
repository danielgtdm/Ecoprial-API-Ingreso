import { Module } from '@nestjs/common';
import { TipoResiduoController } from './tipo-residuo.controller';
import { TipoResiduoService } from './tipo-residuo.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TipoResiduoRepository } from './tipo-residuo.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TipoResiduoRepository])],
  controllers: [TipoResiduoController],
  providers: [TipoResiduoService],
  exports: [TipoResiduoService],
})
export class TipoResiduoModule {}
