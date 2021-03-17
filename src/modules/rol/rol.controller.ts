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
import { Rol } from './rol.entity';
import { RolService } from './rol.service';

@Controller('rol')
export class RolController {
  constructor(private readonly _rolService: RolService) {}

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Rol> {
    return await this._rolService.get(id);
  }

  @Get()
  async getAll(): Promise<Rol[]> {
    return await this._rolService.getAll();
  }

  @Post()
  async create(@Body() rol: Rol): Promise<Rol> {
    return await this._rolService.create(rol);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() rol: Rol,
  ): Promise<void> {
    return await this._rolService.update(id, rol);
  }

  @Delete(':id')
  async delete(id: number) {
    return await this._rolService.delete(id);
  }
}
