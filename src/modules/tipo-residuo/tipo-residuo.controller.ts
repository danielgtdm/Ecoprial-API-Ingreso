import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { TipoResiduoService } from './tipo-residuo.service';
import { TipoResiduo } from './tipo-residuo.entity';
import { TipoResiduoAuditoriaService } from './tipo-residuo-auditoria/tipo-residuo-auditoria.service';
import { TipoResiduoAuditoria } from './tipo-residuo-auditoria/tipo-residuo-auditoria.entity';
import { GetUser } from '../usuario/decorators/usuario.decorator';
import { Usuario } from '../usuario/usuario.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../rol/decorators/rol.decorator';
import { RolGuard } from '../rol/guards/rol.guard';

@UseGuards(AuthGuard())
@Controller('tipo-residuo')
export class TipoResiduoController {
  constructor(
    private readonly _tipoResiduoService: TipoResiduoService,
    private readonly _tipoResiduoAuditoriaService: TipoResiduoAuditoriaService,
  ) {}

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Get('auditoria/:tipoResiduoId')
  async getAuditoriasTipoResiduo(
    @Param('tipoResiduoId', ParseIntPipe) tipoResiduoId: number,
  ): Promise<TipoResiduoAuditoria[]> {
    return await this._tipoResiduoAuditoriaService.get(tipoResiduoId);
  }

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
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

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Post()
  async create(
    @Body() tipoResiduo: TipoResiduo,
    @GetUser() usuario: Usuario,
  ): Promise<TipoResiduo> {
    return await this._tipoResiduoService.create(tipoResiduo, usuario);
  }

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() tipoResiduo: TipoResiduo,
    @GetUser() usuario: Usuario,
  ): Promise<void> {
    return await this._tipoResiduoService.update(id, tipoResiduo, usuario);
  }

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() usuario: Usuario,
  ): Promise<void> {
    return await this._tipoResiduoService.delete(id, usuario);
  }
}
