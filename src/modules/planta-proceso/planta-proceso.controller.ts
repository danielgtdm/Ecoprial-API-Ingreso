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

import { PlantaProcesoService } from './planta-proceso.service';
import { PlantaProceso } from './planta-proceso.entity';

@Controller('planta-proceso')
export class PlantaProcesoController {
  constructor(private readonly _plantaProcesoService: PlantaProcesoService) {}

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<PlantaProceso> {
    return await this._plantaProcesoService.get(id);
  }

  @Get()
  async getAll(): Promise<PlantaProceso[]> {
    return await this._plantaProcesoService.getAll();
  }

  @Post(':generadorId')
  async create(
    @Param('generadorId', ParseIntPipe) generadorId: number,
    @Body() plantaProceso: PlantaProceso,
  ): Promise<PlantaProceso> {
    return await this._plantaProcesoService.create(generadorId, plantaProceso);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() plantaProceso: PlantaProceso,
  ): Promise<void> {
    return await this._plantaProcesoService.update(id, plantaProceso);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this._plantaProcesoService.delete(id);
  }
}
