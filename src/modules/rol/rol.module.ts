import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolRepository } from './rol.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([RolRepository]), AuthModule],
  providers: [RolService],
  controllers: [RolController],
  exports: [RolService],
})
export class RolModule {}
