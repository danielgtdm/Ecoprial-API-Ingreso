import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { status } from '../../shared/entity-status.enum';
import { GeneradorRepository } from './generador.repository';
import { Generador } from './generador.entity';

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

  async create(generador: Generador): Promise<Generador> {
    const savedGenerador: Generador = await this._generadorRepository.save(
      generador,
    );

    return savedGenerador;
  }

  async update(id: number, generador: Generador): Promise<void> {
    await this._generadorRepository.update(id, generador);
  }

  async delete(id: number): Promise<void> {
    await this._generadorRepository.update(id, { status: status.INACTIVE });
  }
}
