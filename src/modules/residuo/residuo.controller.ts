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
import { ResiduoAuditoriaService } from './residuo-auditoria/residuo-auditoria.service';
import { ResiduoAuditoria } from './residuo-auditoria/residuo-auditoria.entity';
import { Usuario } from '../usuario/usuario.entity';
import { GetUser } from '../usuario/decorators/usuario.decorator';

@Controller('residuo')
export class ResiduoController {
  constructor(
    private readonly _residuoService: ResiduoService,
    private readonly _residuoAuditoriaService: ResiduoAuditoriaService,
  ) {}

  @Get('auditoria/:residuoId')
  async getAuditoriasResiduo(
    @Param('residuoId', ParseIntPipe) residuoId: number,
  ): Promise<ResiduoAuditoria[]> {
    return await this._residuoAuditoriaService.get(residuoId);
  }

  @Get('auditoria')
  async getAuditorias(): Promise<ResiduoAuditoria[]> {
    return await this._residuoAuditoriaService.getAll();
  }

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
    @GetUser() usuario: Usuario,
  ): Promise<Residuo> {
    return await this._residuoService.create(tipoResiduoId, residuo, usuario);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() residuo: Residuo,
    @GetUser() usuario: Usuario,
  ): Promise<void> {
    return await this._residuoService.update(id, residuo, usuario);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() usuario: Usuario,
  ): Promise<void> {
    return await this._residuoService.delete(id, usuario);
  }
}
