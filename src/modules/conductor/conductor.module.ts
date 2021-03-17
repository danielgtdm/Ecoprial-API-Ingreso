import { Module } from '@nestjs/common';
import { ConductorController } from './conductor.controller';
import { ConductorService } from './conductor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConductorRepository } from './conductor.repository';
import { ConductorAuditoriaModule } from './conductor-auditoria/conductor-auditoria.module';
import { TransportistaModule } from '../transportista/transportista.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConductorRepository]),
    TransportistaModule,
    ConductorAuditoriaModule,
    AuthModule,
  ],
  controllers: [ConductorController],
  providers: [ConductorService],
  exports: [ConductorService],
})
export class ConductorModule {}
