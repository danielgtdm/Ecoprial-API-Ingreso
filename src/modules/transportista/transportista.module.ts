import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportistaController } from './transportista.controller';
import { TransportistaRepository } from './transportista.repository';
import { TransportistaService } from './transportista.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransportistaRepository])],
  controllers: [TransportistaController],
  providers: [TransportistaService],
  exports: [TransportistaService],
})
export class TransportistaModule {}
