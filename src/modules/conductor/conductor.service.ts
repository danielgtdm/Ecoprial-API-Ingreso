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

  async getAll(): Promise<Conductor[]> {
    const conductores: Conductor[] = await this._conductorRepository.find({
      where: { status: status.ACTIVE },
    });

    return conductores;
  }

  async create(
    conductor: Conductor,
    transportistaId: number,
  ): Promise<Conductor> {
    const transportista: Transportista = await this._transportistaService.get(
      transportistaId,
    );

    conductor.Transportista = transportista;

    const createdConductor: Conductor = await this._conductorRepository.save(
      conductor,
    );
    return createdConductor;
  }

  async update(id: number, conductor: Conductor): Promise<void> {
    let conductorDB: Conductor = await this._conductorRepository.findOne(id);

    conductorDB.nombre = conductor.nombre;
    conductorDB.apellido = conductor.apellido;
    conductorDB.Transportista = conductor.Transportista;

    await conductorDB.save();
  }

  async delete(id: number): Promise<void> {
    let conductorDB: Conductor = await this._conductorRepository.findOne(id);

    conductorDB.status = status.INACTIVE;

    await conductorDB.save();
  }
}
