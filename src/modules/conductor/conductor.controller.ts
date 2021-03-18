import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConductorAuditoria } from './conductor-auditoria/conductor-auditoria.entity';
import { Conductor } from './conductor.entity';
import { ConductorService } from './conductor.service';

import { ConductorAuditoriaService } from './conductor-auditoria/conductor-auditoria.service';
import { AuthGuard } from '@nestjs/passport';
import { RolGuard } from '../rol/guards/rol.guard';
import { Roles } from '../rol/decorators/rol.decorator';
import { GetUser } from '../usuario/decorators/usuario.decorator';
import { Usuario } from '../usuario/usuario.entity';

@UseGuards(AuthGuard())
@Controller('conductor')
export class ConductorController {
  constructor(
    private readonly _conductorService: ConductorService,
    private readonly _conductorAuditoriaService: ConductorAuditoriaService,
  ) {}

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Get('auditoria/:conductorId')
  async getAuditoriasConductor(
    @Param('conductorId', ParseIntPipe) conductorId: number,
  ): Promise<ConductorAuditoria[]> {
    return await this._conductorAuditoriaService.get(conductorId);
  }

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Get('auditoria')
  async getAuditorias(): Promise<ConductorAuditoria[]> {
    return await this._conductorAuditoriaService.getAll();
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Conductor> {
    return await this._conductorService.get(id);
  }

  @Get()
  async getAll(): Promise<Conductor[]> {
    return await this._conductorService.getAll();
  }

  @Post(':transportistaId')
  @Roles('ADMINISTRADOR', 'PORTERIA')
  @UseGuards(RolGuard)
  async create(
    @Param('transportistaId', ParseIntPipe) transportistaId: number,
    @Body() conductor: Conductor,
    @GetUser() usuario: Usuario,
  ): Promise<Conductor> {
    return await this._conductorService.create(
      conductor,
      transportistaId,
      usuario,
    );
  }

  @Patch(':id')
  @Roles('ADMINISTRADOR', 'PORTERIA')
  @UseGuards(RolGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() conductor: Conductor,
    @GetUser() usuario: Usuario,
  ): Promise<void> {
    return await this._conductorService.update(id, conductor, usuario);
  }

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() usuario: Usuario,
  ): Promise<void> {
    return await this._conductorService.delete(id, usuario);
  }
}
