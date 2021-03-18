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

import { VehiculoAuditoriaService } from './vehiculo-auditoria/vehiculo-auditoria.service';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from './vehiculo.entity';
import { VehiculoAuditoria } from './vehiculo-auditoria/vehiculo-auditoria.entity';
import { GetUser } from '../usuario/decorators/usuario.decorator';
import { Usuario } from '../usuario/usuario.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../rol/decorators/rol.decorator';
import { RolGuard } from '../rol/guards/rol.guard';

@UseGuards(AuthGuard())
@Controller('vehiculo')
export class VehiculoController {
  constructor(
    private readonly _vehiculoService: VehiculoService,
    private readonly _vehiculoAuditoriaService: VehiculoAuditoriaService,
  ) {}

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Get('auditoria/:vehiculoId')
  async getAuditoriasVehiculo(
    @Param('vehiculoId', ParseIntPipe) vehiculoId: number,
  ): Promise<VehiculoAuditoria[]> {
    return await this._vehiculoAuditoriaService.get(vehiculoId);
  }

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Get('auditoria')
  async getAllAuditorias(): Promise<VehiculoAuditoria[]> {
    return await this._vehiculoAuditoriaService.getAll();
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Vehiculo> {
    return await this._vehiculoService.get(id);
  }

  @Get()
  async getAll(): Promise<Vehiculo[]> {
    return await this._vehiculoService.getAll();
  }

  @Roles('ADMINISTRADOR', 'PORTERIA')
  @UseGuards(RolGuard)
  @Post(':transportistaId')
  @UseGuards(AuthGuard())
  async create(
    @Param('transportistaId', ParseIntPipe) transportistaId: number,
    @Body() vehiculo: Vehiculo,
    @GetUser() usuario: Usuario,
  ): Promise<Vehiculo> {
    return await this._vehiculoService.create(
      transportistaId,
      vehiculo,
      usuario,
    );
  }

  @Roles('ADMINISTRADOR', 'PORTERIA')
  @UseGuards(RolGuard)
  @Patch(':id')
  @UseGuards(AuthGuard())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() vehiculo: Vehiculo,
    @GetUser() usuario: Usuario,
  ): Promise<void> {
    return await this._vehiculoService.update(id, vehiculo, usuario);
  }

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() usuario: Usuario,
  ): Promise<void> {
    return await this._vehiculoService.delete(id, usuario);
  }
}
