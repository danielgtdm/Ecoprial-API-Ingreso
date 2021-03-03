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

import { ResiduoService } from './residuo.service';
import { Residuo } from './residuo.entity';

@Controller('residuo')
export class ResiduoController {
  constructor(private readonly _residuoService: ResiduoService) {}

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Residuo> {
    return await this._residuoService.get(id);
  }

  @Get()
  async getAll(): Promise<Residuo[]> {
    return await this._residuoService.getAll();
  }

  @Post(':tipoResiduoId')
  async create(
    @Param('tipoResiduoId', ParseIntPipe) tipoResiduoId: number,
    @Body() residuo: Residuo,
  ): Promise<Residuo> {
    return await this._residuoService.create(tipoResiduoId, residuo);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() residuo: Residuo,
  ): Promise<void> {
    return await this._residuoService.update(id, residuo);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this._residuoService.delete(id);
  }
}
