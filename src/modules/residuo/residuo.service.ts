import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { status } from '../../shared/entity-status.enum';
import { ResiduoRepository } from './residuo.repository';
import { Residuo } from './residuo.entity';

import { TipoResiduoService } from '../tipo-residuo/tipo-residuo.service';
import { TipoResiduo } from '../tipo-residuo/tipo-residuo.entity';

@Injectable()
export class ResiduoService {
  constructor(
    @InjectRepository(ResiduoRepository)
    private readonly _residuoRepository: ResiduoRepository,
    private readonly _tipoResiduoService: TipoResiduoService,
  ) {}

  async get(id: number): Promise<Residuo> {
    if (!id) {
      throw new BadRequestException();
    }

    const residuo: Residuo = await this._residuoRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!residuo) {
      throw new NotFoundException();
    }

    return residuo;
  }

  async getAll(): Promise<Residuo[]> {
    const residuos: Residuo[] = await this._residuoRepository.find({
      where: { status: status.ACTIVE },
    });

    return residuos;
  }

  async create(tipoResiduoId: number, residuo: Residuo): Promise<Residuo> {
    const tipoResiduo: TipoResiduo = await this._tipoResiduoService.get(
      tipoResiduoId,
    );

    residuo.TipoResiduo = tipoResiduo;

    const savedResiduo: Residuo = await this._residuoRepository.save(residuo);

    return savedResiduo;
  }

  async update(id: number, residuo: Residuo): Promise<void> {
    await this._residuoRepository.update(id, residuo);
  }

  async delete(id: number): Promise<void> {
    await this._residuoRepository.update(id, { status: status.INACTIVE });
  }
}
