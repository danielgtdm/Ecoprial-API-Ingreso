import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conductor } from './conductor.entity';
import { ConductorRepository } from './conductor.repository';
import { status } from '../../shared/entity-status.enum';
import { TransportistaService } from '../transportista/transportista.service';
import { Transportista } from '../transportista/transportista.entity';
import { Usuario } from '../usuario/usuario.entity';
import { SaveOptions } from 'typeorm';

@Injectable()
export class ConductorService {
  constructor(
    @InjectRepository(ConductorRepository)
    private readonly _conductorRepository: ConductorRepository,
    private readonly _transportistaService: TransportistaService,
  ) {}

  async get(id: number): Promise<Conductor> {
    if (!id) {
      throw new BadRequestException();
    }

    const conductor: Conductor = await this._conductorRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!conductor) {
      throw new NotFoundException();
    }

    return conductor;
  }

  async getPorTransportista(transportistaId: number): Promise<Conductor[]> {
    if (!transportistaId) {
      throw new BadRequestException();
    }

    const conductores: Conductor[] = await this._conductorRepository.find({
      where: { Transportista: transportistaId, status: status.ACTIVE },
    });

    return conductores;
  }

  async getAll(): Promise<Conductor[]> {
    const conductores: Conductor[] = await this._conductorRepository.find({
      where: { status: status.ACTIVE },
    });

    return conductores;
  }

  async create(
    conductor: Conductor,
    transportistaId: number,
    usuario: Usuario,
  ): Promise<Conductor> {
    const transportista: Transportista = await this._transportistaService.get(
      transportistaId,
    );

    conductor.Transportista = transportista;

    const saveOptions: SaveOptions = {
      data: usuario,
    };

    const createdConductor: Conductor = await this._conductorRepository.save(
      conductor,
      saveOptions,
    );
    return createdConductor;
  }

  async update(
    id: number,
    conductor: Conductor,
    usuario: Usuario,
  ): Promise<void> {
    let conductorDB: Conductor = await this._conductorRepository.findOne(id);

    conductorDB.nombre = conductor.nombre;
    conductorDB.apellido = conductor.apellido;
    conductorDB.Transportista = conductor.Transportista;

    const saveOptions: SaveOptions = {
      data: usuario,
    };

    await conductorDB.save(saveOptions);
  }

  async delete(id: number, usuario: Usuario): Promise<void> {
    let conductorDB: Conductor = await this._conductorRepository.findOne(id);

    conductorDB.status = status.INACTIVE;

    const saveOptions: SaveOptions = {
      data: usuario,
    };

    await conductorDB.save(saveOptions);
  }
}
