import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehiculoRepository } from './vehiculo.repository';
import { Vehiculo } from './vehiculo.entity';
import { status } from '../../shared/entity-status.enum';
import { TransportistaService } from '../transportista/transportista.service';
import { Transportista } from '../transportista/transportista.entity';
import { Usuario } from '../usuario/usuario.entity';
import { SaveOptions } from 'typeorm';

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

  async create(
    transportistaId: number,
    vehiculo: Vehiculo,
    usuario: Usuario,
  ): Promise<Vehiculo> {
    const exist: Vehiculo = await this._vehiculoRepository.findOne({where: {patente: vehiculo.patente, status: status.ACTIVE}});
    if(exist){
      throw new ConflictException();
    }
    const transportista: Transportista = await this._transportistaService.get(
      transportistaId,
    );

    vehiculo.Transportista = transportista;

    const saveOptions: SaveOptions = {
      data: usuario,
    };

    const savedVehiculo: Vehiculo = await this._vehiculoRepository.save(
      vehiculo,
      saveOptions,
    );
    return savedVehiculo;
  }

  async update(
    id: number,
    vehiculo: Vehiculo,
    usuario: Usuario,
  ): Promise<void> {
    let vehiculoDB: Vehiculo = await this._vehiculoRepository.findOne(id);

    vehiculoDB.patente = vehiculo.patente;
    vehiculoDB.Transportista = vehiculo.Transportista;

    const saveOptions: SaveOptions = {
      data: usuario,
    };

    await vehiculoDB.save(saveOptions);
  }

  async delete(id: number, usuario: Usuario): Promise<void> {
    let vehiculoDB: Vehiculo = await this._vehiculoRepository.findOne(id);

    vehiculoDB.status = status.INACTIVE;

    const saveOptions: SaveOptions = {
      data: usuario,
    };

    await vehiculoDB.save(saveOptions);
  }
}
