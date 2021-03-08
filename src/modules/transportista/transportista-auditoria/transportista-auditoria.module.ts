import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportistaAuditoriaRepository } from './transportista-auditoria.repository';
import { TransportistaAuditoriaService } from './transportista-auditoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransportistaAuditoriaRepository])],
  providers: [TransportistaAuditoriaService],
  exports: [TransportistaAuditoriaService],
})
export class TransportistaAuditoriaModule {}
