import { Module } from '@nestjs/common';
import { ResiduoController } from './residuo.controller';
import { ResiduoService } from './residuo.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { TipoResiduoModule } from '../tipo-residuo/tipo-residuo.module';
import { ResiduoRepository } from './residuo.repository';
import { ResiduoAuditoriaModule } from './residuo-auditoria/residuo-auditoria.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResiduoRepository]),
    TipoResiduoModule,
    ResiduoAuditoriaModule,
    AuthModule,
  ],
  controllers: [ResiduoController],
  providers: [ResiduoService],
  exports: [ResiduoService],
})
export class ResiduoModule {}
