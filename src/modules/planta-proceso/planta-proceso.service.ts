import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { status } from '../../shared/entity-status.enum';
import { PlantaProcesoRepository } from './planta-proceso.repository';
import { PlantaProceso } from './planta-proceso.entity';

import { GeneradorService } from '../generador/generador.service';
import { Generador } from '../generador/generador.entity';

@Injectable()
export class PlantaProcesoService {
  constructor(
    @InjectRepository(PlantaProcesoRepository)
    private readonly _plantaProcesoRepository: PlantaProcesoRepository,
    private readonly _generadorService: GeneradorService,
  ) {}

  async get(id: number): Promise<PlantaProceso> {
    if (!id) {
      throw new BadRequestException();
    }

    const plantaProceso: PlantaProceso = await this._plantaProcesoRepository.findOne(
      id,
      { where: { status: status.ACTIVE } },
    );

    if (!plantaProceso) {
      throw new NotFoundException();
    }

    return plantaProceso;
  }

  async getAll(): Promise<PlantaProceso[]> {
    const plantasProceso: PlantaProceso[] = await this._plantaProcesoRepository.find(
      { where: { status: status.ACTIVE } },
    );
    return plantasProceso;
  }

  async create(
    generadorId: number,
    plantaProceso: PlantaProceso,
  ): Promise<PlantaProceso> {
    const generador: Generador = await this._generadorService.get(generadorId);
    plantaProceso.Generador = generador;
    const savedPlantaProceso: PlantaProceso = await this._plantaProcesoRepository.save(
      plantaProceso,
    );
    return savedPlantaProceso;
  }

  async update(id: number, plantaProceso: PlantaProceso): Promise<void> {
    let plantaProcesoDB = await this._plantaProcesoRepository.findOne(id);

    plantaProcesoDB.nombre = plantaProceso.nombre;
    plantaProcesoDB.Generador = plantaProceso.Generador;

    await plantaProcesoDB.save();
  }

  async delete(id: number): Promise<void> {
    let plantaProcesoDB = await this._plantaProcesoRepository.findOne(id);

    plantaProcesoDB.status = status.INACTIVE;

    await plantaProcesoDB.save();
  }
}
