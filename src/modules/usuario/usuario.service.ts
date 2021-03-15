import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { status } from 'src/shared/entity-status.enum';
import { Usuario } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioRepository)
    private readonly _usuarioRepository: UsuarioRepository,
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
    usuarioDB.password = usuario.password;

    await usuarioDB.save();
  }

  async delete(id: number): Promise<void> {
    let usuarioDB: Usuario = await this._usuarioRepository.findOne(id);

    usuarioDB.status = status.INACTIVE;

    await usuarioDB.save();
  }
}
