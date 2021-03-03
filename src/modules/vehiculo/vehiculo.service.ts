import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehiculoRepository } from './vehiculo.repository';
import { Vehiculo } from './vehiculo.entity';
import { status } from '../../shared/entity-status.enum';
import { TransportistaService } from '../transportista/transportista.service';
import { Transportista } from '../transportista/transportista.entity';

@Injectable()
export class VehiculoService {
  constructor(
    @InjectRepository(VehiculoRepository)
    private readonly _vehiculoRepository: VehiculoRepository,
    private readonly _transportistaService: TransportistaService,
  ) {}

  async get(id: number): Promise<Vehiculo> {
    if (!id) {
      throw new BadRequestException();
    }

    const vehiculo: Vehiculo = await this._vehiculoRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!vehiculo) {
      throw new NotFoundException();
    }

    return vehiculo;
  }

  async getAll(): Promise<Vehiculo[]> {
    const vehiculos: Vehiculo[] = await this._vehiculoRepository.find({
      where: { status: status.ACTIVE },
    });

    return vehiculos;
  }

  async create(transportistaId: number, vehiculo: Vehiculo): Promise<Vehiculo> {
    const transportista: Transportista = await this._transportistaService.get(
      transportistaId,
    );

    vehiculo.Transportista = transportista;

    const savedVehiculo: Vehiculo = await this._vehiculoRepository.save(
      vehiculo,
    );
    return savedVehiculo;
  }

  async update(id: number, vehiculo: Vehiculo): Promise<void> {
    await this._vehiculoRepository.update(id, vehiculo);
  }

  async delete(id: number): Promise<void> {
    await this._vehiculoRepository.update(id, { status: status.INACTIVE });
  }
}
