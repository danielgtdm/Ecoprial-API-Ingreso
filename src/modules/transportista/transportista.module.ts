import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportistaController } from './transportista.controller';
import { TransportistaRepository } from './transportista.repository';
import { TransportistaService } from './transportista.service';
import { TransportistaAuditoriaModule } from './transportista-auditoria/transportista-auditoria.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransportistaRepository]),
    TransportistaAuditoriaModule,
    AuthModule,
  ],
  controllers: [TransportistaController],
  providers: [TransportistaService],
  exports: [TransportistaService],
})
export class TransportistaModule {}
