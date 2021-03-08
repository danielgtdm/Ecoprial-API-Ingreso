import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ConductorAuditoria } from './conductor-auditoria/conductor-auditoria.entity';
import { Conductor } from './conductor.entity';
import { ConductorService } from './conductor.service';

import { ConductorAuditoriaService } from './conductor-auditoria/conductor-auditoria.service';

@Controller('conductor')
export class ConductorController {
  constructor(
    private readonly _conductorService: ConductorService,
    private readonly _conductorAuditoriaService: ConductorAuditoriaService,
  ) {}

  @Get('auditoria/:conductorId')
  async getAuditoriasConductor(
    @Param('conductorId', ParseIntPipe) conductorId: number,
  ): Promise<ConductorAuditoria[]> {
    return await this._conductorAuditoriaService.get(conductorId);
  }

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
  async create(
    @Param('transportistaId', ParseIntPipe) transportistaId: number,
    @Body() conductor: Conductor,
  ): Promise<Conductor> {
    return await this._conductorService.create(conductor, transportistaId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() conductor: Conductor,
  ): Promise<void> {
    return await this._conductorService.update(id, conductor);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this._conductorService.delete(id);
  }
}
