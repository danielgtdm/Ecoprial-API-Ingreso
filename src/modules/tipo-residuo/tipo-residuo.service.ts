import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { status } from '../../shared/entity-status.enum';

import { TipoResiduoRepository } from './tipo-residuo.repository';
import { TipoResiduo } from './tipo-residuo.entity';

@Injectable()
export class TipoResiduoService {
  constructor(
    @InjectRepository(TipoResiduoRepository)
    private readonly _tipoResiduoRepository: TipoResiduoRepository,
  ) {}

  async get(id: number): Promise<TipoResiduo> {
    if (!id) {
      throw new BadRequestException();
    }

    const tipoResiduo: TipoResiduo = await this._tipoResiduoRepository.findOne(
      id,
      { where: { status: status.ACTIVE } },
    );

    if (!tipoResiduo) {
      throw new NotFoundException();
    }

    return tipoResiduo;
  }

  async getAll(): Promise<TipoResiduo[]> {
    const tiposResidio: TipoResiduo[] = await this._tipoResiduoRepository.find({
      where: { status: status.ACTIVE },
    });

    return tiposResidio;
  }

  async create(tipoResiduo: TipoResiduo): Promise<TipoResiduo> {
    const savedTipoResiduo: TipoResiduo = await this._tipoResiduoRepository.save(
      tipoResiduo,
    );

    return savedTipoResiduo;
  }

  async update(id: number, tipoResiduo: TipoResiduo): Promise<void> {
    await this._tipoResiduoRepository.update(id, tipoResiduo);
  }

  async delete(id: number): Promise<void> {
    await this._tipoResiduoRepository.update(id, { status: status.INACTIVE });
  }
}
