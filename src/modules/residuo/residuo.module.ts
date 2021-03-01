import { Module } from '@nestjs/common';
import { ResiduoController } from './residuo.controller';
import { ResiduoService } from './residuo.service';

@Module({
  controllers: [ResiduoController],
  providers: [ResiduoService]
})
export class ResiduoModule {}
