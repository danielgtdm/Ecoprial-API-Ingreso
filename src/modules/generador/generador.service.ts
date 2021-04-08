import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { status } from '../../shared/entity-status.enum';
import { GeneradorRepository } from './generador.repository';
import { Generador } from './generador.entity';
import { Usuario } from '../usuario/usuario.entity';
import { SaveOptions } from 'typeorm';

@Injectable()
export class GeneradorService {
  constructor(
    @InjectRepository(GeneradorRepository)
    private readonly _generadorRepository: GeneradorRepository,
  ) {}

  async get(id: number): Promise<Generador> {
    if (!id) {
      throw new BadRequestException();
    }

    const generador: Generador = await this._generadorRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!generador) {
      throw new NotFoundException();
    }

    return generador;
  }

  async getAll(): Promise<Generador[]> {
    const generadores: Generador[] = await this._generadorRepository.find({
      where: { status: status.ACTIVE },
    });
    return generadores;
  }

  async create(generador: Generador, usuario: Usuario): Promise<Generador> {
    const exist: Generador = await this._generadorRepository.findOne({where: {rut: generador.rut, status: status.ACTIVE}});
    if(exist){
      throw new ConflictException();
    }
    const saveOptions: SaveOptions = {
      data: usuario,
    };
    const savedGenerador: Generador = await this._generadorRepository.save(
      generador,
      saveOptions,
    );

    return savedGenerador;
  }

  async update(
    id: number,
    generador: Generador,
    usuario: Usuario,
  ): Promise<void> {
    let generadorDB: Generador = await this._generadorRepository.findOne(id);

    generadorDB.nombre = generador.nombre;
    generadorDB.rut = generador.rut;

    const saveOptions: SaveOptions = {
      data: usuario,
    };

    await generadorDB.save(saveOptions);
  }

  async delete(id: number, usuario: Usuario): Promise<void> {
    let generadorDB: Generador = await this._generadorRepository.findOne(id);

    generadorDB.status = status.INACTIVE;

    const saveOptions: SaveOptions = {
      data: usuario,
    };

    await generadorDB.save(saveOptions);
  }
}
