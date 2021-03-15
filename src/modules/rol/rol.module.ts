import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolRepository } from './rol.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RolRepository])],
  providers: [RolService],
  controllers: [RolController],
  exports: [RolService],
})
export class RolModule {}
