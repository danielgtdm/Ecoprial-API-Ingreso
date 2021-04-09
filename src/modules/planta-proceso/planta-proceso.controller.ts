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

import { PlantaProcesoService } from './planta-proceso.service';
import { PlantaProceso } from './planta-proceso.entity';
import { PlantaProcesoAuditoriaService } from './planta-proceso-auditoria/planta-proceso-auditoria.service';
import { PlantaProcesoAuditoria } from './planta-proceso-auditoria/planta-proceso-auditoria.entity';
import { GetUser } from '../usuario/decorators/usuario.decorator';
import { Usuario } from '../usuario/usuario.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../rol/decorators/rol.decorator';
import { RolGuard } from '../rol/guards/rol.guard';

@UseGuards(AuthGuard())
@Controller('planta-proceso')
export class PlantaProcesoController {
  constructor(
    private readonly _plantaProcesoService: PlantaProcesoService,
    private readonly _plantaProcesoAuditoriaService: PlantaProcesoAuditoriaService,
  ) {}

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Get('auditoria/:plantaProcesoId')
  async getAuditoriasPlantaProceso(
    @Param('plantaProcesoId', ParseIntPipe) plantaProcesoId: number,
  ): Promise<PlantaProcesoAuditoria[]> {
    return await this._plantaProcesoAuditoriaService.get(plantaProcesoId);
  }

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Get('auditoria')
  async getAuditorias(): Promise<PlantaProcesoAuditoria[]> {
    return await this._plantaProcesoAuditoriaService.getAll();
  }

  @Get('por-generador/:id')
  async getPlantasProcesoPorGenerador(@Param('id', ParseIntPipe) id: number): Promise<PlantaProceso[]>{
    return await this._plantaProcesoService.getPorGenerador(id);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<PlantaProceso> {
    return await this._plantaProcesoService.get(id);
  }

  @Get()
  async getAll(): Promise<PlantaProceso[]> {
    return await this._plantaProcesoService.getAll();
  }

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Post(':generadorId')
  async create(
    @Param('generadorId', ParseIntPipe) generadorId: number,
    @Body() plantaProceso: PlantaProceso,
    @GetUser() usuario: Usuario,
  ): Promise<PlantaProceso> {
    return await this._plantaProcesoService.create(
      generadorId,
      plantaProceso,
      usuario,
    );
  }

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() plantaProceso: PlantaProceso,
    @GetUser() usuario: Usuario,
  ): Promise<void> {
    return await this._plantaProcesoService.update(id, plantaProceso, usuario);
  }

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() usuario: Usuario,
  ): Promise<void> {
    return await this._plantaProcesoService.delete(id, usuario);
  }
}
