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

import { GeneradorService } from './generador.service';
import { Generador } from './generador.entity';

@Controller('generador')
export class GeneradorController {
  constructor(private readonly _generadorService: GeneradorService) {}

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Generador> {
    return await this._generadorService.get(id);
  }

  @Get()
  async getAll(): Promise<Generador[]> {
    return await this._generadorService.getAll();
  }

  @Post()
  async create(@Body() generador: Generador): Promise<Generador> {
    return await this._generadorService.create(generador);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() generador: Generador,
  ): Promise<void> {
    return await this._generadorService.update(id, generador);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this._generadorService.delete(id);
  }
}
