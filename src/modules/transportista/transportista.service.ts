import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { status } from '../../shared/entity-status.enum';
import { TransportistaRepository } from './transportista.repository';
import { Transportista } from './transportista.entity';
import { Usuario } from '../usuario/usuario.entity';
import { SaveOptions } from 'typeorm';

@Injectable()
export class TransportistaService {
  constructor(
    @InjectRepository(TransportistaRepository)
    private readonly _transportistaRepository: TransportistaRepository,
  ) {}

  async get(id: number): Promise<Transportista> {
    if (!id) {
      throw new BadRequestException();
    }

    const transportista: Transportista = await this._transportistaRepository.findOne(
      id,
      { where: { status: status.ACTIVE } },
    );

    if (!transportista) {
      throw new NotFoundException();
    }

    return transportista;
  }

  async getAll(): Promise<Transportista[]> {
    const transportistas: Transportista[] = await this._transportistaRepository.find(
      { where: { status: status.ACTIVE } },
    );

    return transportistas;
  }

  async create(
    transportista: Transportista,
    usuario: Usuario,
  ): Promise<Transportista> {
    const exist: Transportista = await this._transportistaRepository.findOne({where: {rut: transportista.rut, status: status.ACTIVE}});
    if(exist){
      throw new ConflictException();
    }
    const saveOptions: SaveOptions = {
      data: usuario,
    };

    const savedTransportista: Transportista = await this._transportistaRepository.save(
      transportista,
      saveOptions,
    );
    return savedTransportista;
  }

  async update(
    id: number,
    transportista: Transportista,
    usuario: Usuario,
  ): Promise<void> {
    const exist: Transportista = await this._transportistaRepository.findOne({where: {rut: transportista.rut, status: status.ACTIVE}});
    if(exist){
      if(exist.id != id){
        throw new ConflictException();
      }
    }

    const saveOptions: SaveOptions = {
      data: usuario,
    };

    let transportistaDB: Transportista = await this._transportistaRepository.findOne(
      id,
    );

    transportistaDB.nombre = transportista.nombre;
    transportistaDB.rut = transportista.rut;
    transportistaDB.descripcion = transportista.descripcion;

    await transportistaDB.save(saveOptions);
  }

  async delete(id: number, usuario: Usuario): Promise<void> {
    let transportistaDB: Transportista = await this._transportistaRepository.findOne(
      id,
    );

    transportistaDB.status = status.INACTIVE;

    const saveOptions: SaveOptions = {
      data: usuario,
    };

    await transportistaDB.save(saveOptions);
  }
}
