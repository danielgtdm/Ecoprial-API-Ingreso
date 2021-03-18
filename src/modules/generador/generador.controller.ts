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

import { GeneradorService } from './generador.service';
import { Generador } from './generador.entity';
import { GeneradorAuditoriaService } from './generador-auditoria/generador-auditoria.service';
import { GeneradorAuditoria } from './generador-auditoria/generador-auditoria.entity';
import { GetUser } from '../usuario/decorators/usuario.decorator';
import { Usuario } from '../usuario/usuario.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../rol/decorators/rol.decorator';
import { RolGuard } from '../rol/guards/rol.guard';

@UseGuards(AuthGuard())
@Controller('generador')
export class GeneradorController {
  constructor(
    private readonly _generadorService: GeneradorService,
    private readonly _generadorAuditoriaService: GeneradorAuditoriaService,
  ) {}

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Get('auditoria/:generadorId')
  async getAuditoriasGenerador(
    @Param('generadorId', ParseIntPipe) generadorId: number,
  ): Promise<GeneradorAuditoria[]> {
    return await this._generadorAuditoriaService.get(generadorId);
  }

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
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

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Post()
  async create(
    @Body() generador: Generador,
    @GetUser() usuario: Usuario,
  ): Promise<Generador> {
    return await this._generadorService.create(generador, usuario);
  }

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() generador: Generador,
    @GetUser() usuario: Usuario,
  ): Promise<void> {
    return await this._generadorService.update(id, generador, usuario);
  }

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() usuario: Usuario,
  ): Promise<void> {
    return await this._generadorService.delete(id, usuario);
  }
}
