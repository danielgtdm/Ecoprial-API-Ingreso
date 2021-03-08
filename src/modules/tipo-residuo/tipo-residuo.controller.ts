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

import { TipoResiduoService } from './tipo-residuo.service';
import { TipoResiduo } from './tipo-residuo.entity';
import { TipoResiduoAuditoriaService } from './tipo-residuo-auditoria/tipo-residuo-auditoria.service';
import { TipoResiduoAuditoria } from './tipo-residuo-auditoria/tipo-residuo-auditoria.entity';

@Controller('tipo-residuo')
export class TipoResiduoController {
  constructor(
    private readonly _tipoResiduoService: TipoResiduoService,
    private readonly _tipoResiduoAuditoriaService: TipoResiduoAuditoriaService,
  ) {}

  @Get('auditoria/:tipoResiduoId')
  async getAuditoriasTipoResiduo(
    @Param('tipoResiduoId', ParseIntPipe) tipoResiduoId: number,
  ): Promise<TipoResiduoAuditoria[]> {
    return await this._tipoResiduoAuditoriaService.get(tipoResiduoId);
  }

  @Get('auditoria')
  async getAuditorias(): Promise<TipoResiduoAuditoria[]> {
    return await this._tipoResiduoAuditoriaService.getAll();
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<TipoResiduo> {
    return await this._tipoResiduoService.get(id);
  }

  @Get()
  async getAll(): Promise<TipoResiduo[]> {
    return await this._tipoResiduoService.getAll();
  }

  @Post()
  async create(@Body() tipoResiduo: TipoResiduo): Promise<TipoResiduo> {
    return await this._tipoResiduoService.create(tipoResiduo);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() tipoResiduo: TipoResiduo,
  ): Promise<void> {
    return await this._tipoResiduoService.update(id, tipoResiduo);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this._tipoResiduoService.delete(id);
  }
}
