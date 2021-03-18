import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { TransportistaService } from './transportista.service';
import { Transportista } from './transportista.entity';
import { TransportistaAuditoriaService } from './transportista-auditoria/transportista-auditoria.service';
import { TransportistaAuditoria } from './transportista-auditoria/transportista-auditoria.entity';
import { GetUser } from '../usuario/decorators/usuario.decorator';
import { Usuario } from '../usuario/usuario.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../rol/decorators/rol.decorator';
import { RolGuard } from '../rol/guards/rol.guard';

@UseGuards(AuthGuard())
@Controller('transportista')
export class TransportistaController {
  constructor(
    private readonly _transportistaService: TransportistaService,
    private readonly _transportistaAuditoriaService: TransportistaAuditoriaService,
  ) {}

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Get('auditoria/:transportistaId')
  async getAuditoriasTransportista(
    @Param('transportistaId', ParseIntPipe) transportistaId: number,
  ): Promise<TransportistaAuditoria[]> {
    return await this._transportistaAuditoriaService.get(transportistaId);
  }

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
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

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() transportista: Transportista,
    @GetUser() usuario: Usuario,
  ): Promise<Transportista> {
    return await this._transportistaService.create(transportista, usuario);
  }

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() transportista: Transportista,
    @GetUser() usuario: Usuario,
  ): Promise<void> {
    return await this._transportistaService.update(id, transportista, usuario);
  }

  @Roles('ADMINISTRADOR')
  @UseGuards(RolGuard)
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() usuario: Usuario,
  ): Promise<void> {
    return await this._transportistaService.delete(id, usuario);
  }
}
