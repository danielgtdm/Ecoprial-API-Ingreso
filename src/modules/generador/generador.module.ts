import { Module } from '@nestjs/common';
import { GeneradorController } from './generador.controller';
import { GeneradorService } from './generador.service';
import { GeneradorRepository } from './generador.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GeneradorRepository])],
  controllers: [GeneradorController],
  providers: [GeneradorService],
  exports: [GeneradorService],
})
export class GeneradorModule {}
