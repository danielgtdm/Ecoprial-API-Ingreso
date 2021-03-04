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
import { GeneradorAuditoriaService } from './generador-auditoria/generador-auditoria.service';
import { GeneradorAuditoria } from './generador-auditoria/generador-auditoria.entity';

@Controller('generador')
export class GeneradorController {
  constructor(
    private readonly _generadorService: GeneradorService,
    private readonly _generadorAuditoriaService: GeneradorAuditoriaService,
  ) {}

  @Get('auditoria/:generadorId')
  async getAuditoriasGenerador(
    @Param('generadorId', ParseIntPipe) generadorId: number,
  ): Promise<GeneradorAuditoria[]> {
    return await this._generadorAuditoriaService.get(generadorId);
  }

  @Get('auditoria')
  async getAuditorias(): Promise<GeneradorAuditoria[]> {
    return await this._generadorAuditoriaService.getAll();
  }

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
