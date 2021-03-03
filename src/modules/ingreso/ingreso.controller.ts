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

@Controller('ingreso')
export class IngresoController {
  constructor(private readonly _ingresoService: IngresoService) {}

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
  ): Promise<void> {}

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {}
}
