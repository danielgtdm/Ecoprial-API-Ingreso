import { Module } from '@nestjs/common';
import { GeneradorController } from './generador.controller';
import { GeneradorService } from './generador.service';
import { GeneradorRepository } from './generador.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneradorAuditoriaModule } from './generador-auditoria/generador-auditoria.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GeneradorRepository]),
    GeneradorAuditoriaModule,
    AuthModule,
  ],
  controllers: [GeneradorController],
  providers: [GeneradorService],
  exports: [GeneradorService],
})
export class GeneradorModule {}
