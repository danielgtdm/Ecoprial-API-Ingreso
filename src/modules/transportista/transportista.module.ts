import { Module } from '@nestjs/common';
import { TransportistaController } from './transportista.controller';
import { TransportistaService } from './transportista.service';

@Module({
  controllers: [TransportistaController],
  providers: [TransportistaService]
})
export class TransportistaModule {}
