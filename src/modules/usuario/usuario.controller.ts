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
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../rol/decorators/rol.decorator';
import { RolGuard } from '../rol/guards/rol.guard';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly _usuarioService: UsuarioService) {}

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return await this._usuarioService.get(id);
  }

  @Get()
  // @Roles('ADMINISTRADOR')
  // @UseGuards(AuthGuard(), RolGuard)
  async getAll(): Promise<Usuario[]> {
    return await this._usuarioService.getAll();
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() usuario: Usuario,
  ): Promise<void> {
    return await this._usuarioService.update(id, usuario);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this._usuarioService.delete(id);
  }

  @Post('setRol/:usuarioId/:rolId')
  async setRol(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,
    @Param('rolId', ParseIntPipe) rolId: number,
  ): Promise<void> {
    return await this._usuarioService.setRolToUser(usuarioId, rolId);
  }
}
