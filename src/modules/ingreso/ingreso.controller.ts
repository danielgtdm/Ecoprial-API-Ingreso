import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { IngresoService } from './ingreso.service';
import { Ingreso } from './ingreso.entity';
import { IngresoAuditoriaService } from './ingreso-auditoria/ingreso-auditoria.service';
import { IngresoAuditoria } from './ingreso-auditoria/ingreso-auditoria.entity';

@Controller('ingreso')
export class IngresoController {
  constructor(
    private readonly _ingresoService: IngresoService,
    private readonly _ingresoAuditoriaService: IngresoAuditoriaService,
  ) {}

  @Get('auditoria/:ingresoId')
  async getAuditoriasIngreso(
    @Param('ingresoId', ParseIntPipe) ingresoId: number,
  ): Promise<IngresoAuditoria[]> {
    return await this._ingresoAuditoriaService.get(ingresoId);
  }

  @Get('auditoria')
  async getAuditorias(): Promise<IngresoAuditoria[]> {
    return await this._ingresoAuditoriaService.getAll();
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Ingreso> {
    return await this._ingresoService.get(id);
  }

  @Get()
  async getAll(): Promise<Ingreso[]> {
    return await this._ingresoService.getAll();
  }

  @Post(':plantaProcesoId/:vehiculoId/:conductorId')
  async create(
    @Param('plantaProcesoId', ParseIntPipe) plantaProcesoId: number,
    @Param('vehiculoId', ParseIntPipe) vehiculoId: number,
    @Param('conductorId', ParseIntPipe) conductorId: number,
    @Body() ingreso: Ingreso,
  ): Promise<Ingreso> {
    return await this._ingresoService.create(
      plantaProcesoId,
      vehiculoId,
      conductorId,
      ingreso,
    );
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() ingreso: Ingreso,
  ): Promise<void> {
    return await this._ingresoService.update(id, ingreso);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this._ingresoService.delete(id);
  }
}
