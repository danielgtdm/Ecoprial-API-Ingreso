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

import { TransportistaService } from './transportista.service';
import { Transportista } from './transportista.entity';
import { TransportistaAuditoriaService } from './transportista-auditoria/transportista-auditoria.service';
import { TransportistaAuditoria } from './transportista-auditoria/transportista-auditoria.entity';

@Controller('transportista')
export class TransportistaController {
  constructor(
    private readonly _transportistaService: TransportistaService,
    private readonly _transportistaAuditoriaService: TransportistaAuditoriaService,
  ) {}

  @Get('auditoria/:transportistaId')
  async getAuditoriasTransportista(
    @Param('transportistaId', ParseIntPipe) transportistaId: number,
  ): Promise<TransportistaAuditoria[]> {
    return await this._transportistaAuditoriaService.get(transportistaId);
  }

  @Get('auditoria')
  async getAuditorias(): Promise<TransportistaAuditoria[]> {
    return await this._transportistaAuditoriaService.getAll();
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Transportista> {
    return await this._transportistaService.get(id);
  }

  @Get()
  async getAll(): Promise<Transportista[]> {
    return await this._transportistaService.getAll();
  }

  @Post()
  async create(@Body() transportista: Transportista): Promise<Transportista> {
    return await this._transportistaService.create(transportista);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() transportista: Transportista,
  ): Promise<void> {
    return await this._transportistaService.update(id, transportista);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this._transportistaService.delete(id);
  }
}
