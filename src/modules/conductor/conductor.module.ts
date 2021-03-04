import { Module } from '@nestjs/common';
import { ConductorController } from './conductor.controller';
import { ConductorService } from './conductor.service';
import { TransportistaService } from '../transportista/transportista.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConductorRepository } from './conductor.repository';
import { TransportistaRepository } from '../transportista/transportista.repository';
import { ConductorAuditoriaModule } from './auditoria/conductor-auditoria.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConductorRepository, TransportistaRepository]),
    ConductorAuditoriaModule,
  ],
  controllers: [ConductorController],
  providers: [ConductorService, TransportistaService],
  exports: [ConductorService],
})
export class ConductorModule {}
