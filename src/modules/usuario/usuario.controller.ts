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
  async getAll(): Promise<Usuario[]> {
    return await this._usuarioService.getAll();
  }

  @Post()
  async create(@Body() usuario: Usuario): Promise<Usuario> {
    return await this._usuarioService.create(usuario);
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
}
