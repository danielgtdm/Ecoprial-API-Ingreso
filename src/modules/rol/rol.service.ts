import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { status } from '../../shared/entity-status.enum';
import { Rol } from './rol.entity';
import { RolRepository } from './rol.repository';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(RolRepository)
    private readonly _rolRepository: RolRepository,
  ) {}

  async get(id: number): Promise<Rol> {
    if (!id) {
      throw new BadRequestException();
    }

    const rol: Rol = await this._rolRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!rol) {
      throw new NotFoundException();
    }

    return rol;
  }

  async getAll(): Promise<Rol[]> {
    const roles: Rol[] = await this._rolRepository.find({
      where: { status: status.ACTIVE },
    });

    return roles;
  }

  async create(rol: Rol): Promise<Rol> {
    const savedRol: Rol = await this._rolRepository.save(rol);

    return savedRol;
  }

  async update(id: number, rol: Rol): Promise<void> {
    let rolDB: Rol = await this._rolRepository.findOne(id);

    rolDB.nombre = rol.nombre;
    rolDB.descripcion = rol.descripcion;

    await rolDB.save();
  }

  async delete(id: number): Promise<void> {
    let rolDB: Rol = await this._rolRepository.findOne(id);

    rolDB.status = status.INACTIVE;

    await rolDB.save();
  }
}
