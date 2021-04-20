import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveOptions } from 'typeorm';
import { status } from '../../shared/entity-status.enum';
import { Rol } from '../rol/rol.entity';
import { RolService } from '../rol/rol.service';
import { Usuario } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { genSalt, hash } from 'bcryptjs';


@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioRepository)
    private readonly _usuarioRepository: UsuarioRepository,
    private readonly _rolService: RolService,
  ) {}

  async get(id: number): Promise<Usuario> {
    if (!id) {
      throw new BadRequestException();
    }

    const usuario: Usuario = await this._usuarioRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!usuario) {
      throw new NotFoundException();
    }

    return usuario;
  }

  async getAll(): Promise<Usuario[]> {
    const usuarios: Usuario[] = await this._usuarioRepository.find({
      where: { status: status.ACTIVE },
    });

    return usuarios;
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const savedUsuario: Usuario = await this._usuarioRepository.save(usuario);

    return savedUsuario;
  }

  async update(id: number, usuario: Usuario): Promise<void> {
    let usuarioDB: Usuario = await this._usuarioRepository.findOne(id);

    usuarioDB.nombre = usuario.nombre;
    usuarioDB.apellido = usuario.apellido;
    usuarioDB.email = usuario.email;

    const salt = await genSalt(10);
    usuarioDB.password = await hash(usuario.password, salt);

    await usuarioDB.save();
  }

  async delete(id: number): Promise<void> {
    let usuarioDB: Usuario = await this._usuarioRepository.findOne(id);

    usuarioDB.status = status.INACTIVE;

    await usuarioDB.save();
  }

  async setRolToUser(usuarioId: number, rolId: number): Promise<void> {
    const usuario = await this.get(usuarioId);
    if (!usuario) {
      throw new NotFoundException();
    }

    const rol = await this._rolService.get(rolId);
    if (!rol) {
      throw new NotFoundException();
    }

    let asignado = false;
    usuario.Roles.forEach((r) => {
      if (r.id == rol.id) {
        asignado = true;
      }
    });
    if (asignado) {
      const roles: Rol[] = usuario.Roles.filter((r) => {
        return r.id != rol.id;
      });
      usuario.Roles = roles;
    } else {
      usuario.Roles.push(rol);
    }

    const options: SaveOptions = {
      data: 'userOnSession',
    };

    await usuario.save();
  }
}
