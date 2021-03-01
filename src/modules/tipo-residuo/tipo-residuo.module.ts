import { Module } from '@nestjs/common';
import { TipoResiduoController } from './tipo-residuo.controller';
import { TipoResiduoService } from './tipo-residuo.service';

@Module({
  controllers: [TipoResiduoController],
  providers: [TipoResiduoService]
})
export class TipoResiduoModule {}
