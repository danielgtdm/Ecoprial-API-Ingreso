import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { status } from '../../shared/entity-status.enum';

import { TipoResiduoRepository } from './tipo-residuo.repository';
import { TipoResiduo } from './tipo-residuo.entity';
import { SaveOptions } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

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

  async create(
    tipoResiduo: TipoResiduo,
    usuario: Usuario,
  ): Promise<TipoResiduo> {
    const exist: TipoResiduo = await this._tipoResiduoRepository.findOne({where: {nombre: tipoResiduo.nombre, status: status.ACTIVE}});
    if(exist){
      throw new ConflictException();
    }
    const saveOptions: SaveOptions = {
      data: usuario,
    };

    const savedTipoResiduo: TipoResiduo = await this._tipoResiduoRepository.save(
      tipoResiduo,
      saveOptions,
    );

    return savedTipoResiduo;
  }

  async update(
    id: number,
    tipoResiduo: TipoResiduo,
    usuario: Usuario,
  ): Promise<void> {
    let tipoResiduoDB: TipoResiduo = await this._tipoResiduoRepository.findOne(
      id,
    );

    tipoResiduoDB.nombre = tipoResiduo.nombre;
    tipoResiduoDB.descripcion = tipoResiduo.descripcion;

    const saveOptions: SaveOptions = {
      data: usuario,
    };

    await tipoResiduoDB.save(saveOptions);
  }

  async delete(id: number, usuario: Usuario): Promise<void> {
    let tipoResiduoDB: TipoResiduo = await this._tipoResiduoRepository.findOne(
      id,
    );

    tipoResiduoDB.status = status.INACTIVE;

    const saveOptions: SaveOptions = {
      data: usuario,
    };

    await tipoResiduoDB.save(saveOptions);
  }
}
