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

import { VehiculoAuditoriaService } from './auditoria/vehiculo-auditoria.service';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from './vehiculo.entity';
import { VehiculoAuditoria } from './auditoria/vehiculo-auditoria.entity';

@Controller('vehiculo')
export class VehiculoController {
  constructor(
    private readonly _vehiculoService: VehiculoService,
    private readonly _vehiculoAuditoriaService: VehiculoAuditoriaService,
  ) {}

  @Get('auditoria/:vehiculoId')
  async getAuditoriasVehiculo(
    @Param('vehiculoId', ParseIntPipe) vehiculoId: number,
  ): Promise<VehiculoAuditoria[]> {
    return await this._vehiculoAuditoriaService.get(vehiculoId);
  }

  @Get('auditoria')
  async getAllAuditorias(): Promise<VehiculoAuditoria[]> {
    return await this._vehiculoAuditoriaService.getAll();
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Vehiculo> {
    return await this._vehiculoService.get(id);
  }

  @Get()
  async getAll(): Promise<Vehiculo[]> {
    return await this._vehiculoService.getAll();
  }

  @Post(':transportistaId')
  async create(
    @Param('transportistaId', ParseIntPipe) transportistaId: number,
    @Body() vehiculo: Vehiculo,
  ): Promise<Vehiculo> {
    return await this._vehiculoService.create(transportistaId, vehiculo);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() vehiculo: Vehiculo,
  ): Promise<void> {
    return await this._vehiculoService.update(id, vehiculo);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this._vehiculoService.delete(id);
  }
}
