import { Module } from '@nestjs/common';
import { IngresoController } from './ingreso.controller';
import { IngresoService } from './ingreso.service';

@Module({
  controllers: [IngresoController],
  providers: [IngresoService]
})
export class IngresoModule {}
