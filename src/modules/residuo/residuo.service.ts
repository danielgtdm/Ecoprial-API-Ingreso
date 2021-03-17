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
import { Usuario } from '../usuario/usuario.entity';
import { SaveOptions } from 'typeorm';

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

  async create(
    tipoResiduoId: number,
    residuo: Residuo,
    usuario: Usuario,
  ): Promise<Residuo> {
    const tipoResiduo: TipoResiduo = await this._tipoResiduoService.get(
      tipoResiduoId,
    );

    residuo.TipoResiduo = tipoResiduo;

    const saveOptions: SaveOptions = {
      data: usuario,
    };

    const savedResiduo: Residuo = await this._residuoRepository.save(
      residuo,
      saveOptions,
    );

    return savedResiduo;
  }

  async update(id: number, residuo: Residuo, usuario: Usuario): Promise<void> {
    let residuoDB = await this._residuoRepository.findOne(id);

    residuoDB.TipoResiduo = residuo.TipoResiduo;
    residuoDB.cantidad = residuo.cantidad;
    residuoDB.celda = residuo.celda;
    residuoDB.conductividad_electrica = residuo.conductividad_electrica;
    residuoDB.humedad = residuo.humedad;
    residuoDB.pH = residuo.pH;
    residuoDB.salinidad = residuo.salinidad;
    residuoDB.temperatura = residuo.temperatura;
    residuoDB.tds = residuo.tds;

    const saveOptions: SaveOptions = {
      data: usuario,
    };

    await residuoDB.save(saveOptions);
  }

  async delete(id: number, usuario: Usuario): Promise<void> {
    let residuoDB: Residuo = await this._residuoRepository.findOne(id);

    residuoDB.status = status.INACTIVE;

    const saveOptions: SaveOptions = {
      data: usuario,
    };

    await residuoDB.save(saveOptions);
  }
}
