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

import { IngresoService } from './ingreso.service';
import { Ingreso } from './ingreso.entity';
import { IngresoAuditoriaService } from './ingreso-auditoria/ingreso-auditoria.service';
import { IngresoAuditoria } from './ingreso-auditoria/ingreso-auditoria.entity';
import { Usuario } from '../usuario/usuario.entity';
import { GetUser } from '../usuario/decorators/usuario.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../rol/decorators/rol.decorator';
import { RolGuard } from '../rol/guards/rol.guard';

@UseGuards(AuthGuard())
@Controller('ingreso')
export class IngresoController {
  constructor(
    private readonly _ingresoService: IngresoService,
    private readonly _ingresoAuditoriaService: IngresoAuditoriaService,
  ) {}

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Get('auditoria/:ingresoId')
  async getAuditoriasIngreso(
    @Param('ingresoId', ParseIntPipe) ingresoId: number,
  ): Promise<IngresoAuditoria[]> {
    return await this._ingresoAuditoriaService.get(ingresoId);
  }

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Get('auditoria')
  async getAuditorias(): Promise<IngresoAuditoria[]> {
    return await this._ingresoAuditoriaService.getAll();
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Ingreso> {
    return await this._ingresoService.get(id);
  }

  @Get()
  async getAll(): Promise<Ingreso[]> {
    return await this._ingresoService.getAll();
  }

  @Roles('ADMINISTRADOR', 'PORTERIA')
  @UseGuards(RolGuard)
  @Post(':plantaProcesoId/:vehiculoId/:conductorId')
  async create(
    @Param('plantaProcesoId', ParseIntPipe) plantaProcesoId: number,
    @Param('vehiculoId', ParseIntPipe) vehiculoId: number,
    @Param('conductorId', ParseIntPipe) conductorId: number,
    @Body() ingreso: Ingreso,
    @GetUser() usuario: Usuario,
  ): Promise<Ingreso> {
    return await this._ingresoService.create(
      plantaProcesoId,
      vehiculoId,
      conductorId,
      ingreso,
      usuario,
    );
  }

  @Roles('ADMINISTRADOR', 'PORTERIA')
  @UseGuards(RolGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() ingreso: Ingreso,
    @GetUser() usuario: Usuario,
  ): Promise<void> {
    return await this._ingresoService.update(id, ingreso, usuario);
  }

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() usuario: Usuario,
  ): Promise<void> {
    return await this._ingresoService.delete(id, usuario);
  }
}
