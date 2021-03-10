import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IngresoRepository } from './ingreso.repository';
import { Ingreso } from './ingreso.entity';
import { status } from '../../shared/entity-status.enum';
import { PlantaProceso } from '../planta-proceso/planta-proceso.entity';
import { PlantaProcesoService } from '../planta-proceso/planta-proceso.service';
import { VehiculoService } from '../vehiculo/vehiculo.service';
import { Vehiculo } from '../vehiculo/vehiculo.entity';

import { ConductorService } from '../conductor/conductor.service';
import { Conductor } from '../conductor/conductor.entity';

import { ResiduoService } from '../residuo/residuo.service';
import { Residuo } from '../residuo/residuo.entity';
import { TipoResiduo } from '../tipo-residuo/tipo-residuo.entity';

@Injectable()
export class IngresoService {
  constructor(
    @InjectRepository(IngresoRepository)
    private readonly _ingresoRepository: IngresoRepository,
    private readonly _plantaProcesoService: PlantaProcesoService,
    private readonly _vehiculoService: VehiculoService,
    private readonly _conductorService: ConductorService,
    private readonly _residuoService: ResiduoService,
  ) {}

  async get(id: number): Promise<Ingreso> {
    if (!id) {
      throw new BadRequestException();
    }

    const ingreso: Ingreso = await this._ingresoRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!ingreso) {
      throw new NotFoundException();
    }

    return ingreso;
  }

  async getAll(): Promise<Ingreso[]> {
    const ingresos: Ingreso[] = await this._ingresoRepository.find({
      where: { status: status.ACTIVE },
    });

    return ingresos;
  }

  async create(
    plantaProcesoId: number,
    vehiculoId: number,
    conductorId: number,
    ingreso: Ingreso,
  ): Promise<Ingreso> {
    if (!ingreso.Residuo) {
      throw new BadRequestException();
    }

    const residuo: Residuo = ingreso.Residuo;
    const tipoResiduo: TipoResiduo = ingreso.Residuo.TipoResiduo;
    const savedResiduo: Residuo = await this._residuoService.create(
      tipoResiduo.id,
      residuo,
    );
    ingreso.Residuo = savedResiduo;

    const plantaProceso: PlantaProceso = await this._plantaProcesoService.get(
      plantaProcesoId,
    );
    ingreso.PlantaProceso = plantaProceso;

    const vehiculo: Vehiculo = await this._vehiculoService.get(vehiculoId);
    ingreso.Vehiculo = vehiculo;

    const conductor: Conductor = await this._conductorService.get(conductorId);
    ingreso.Conductor = conductor;

    const savedIngreso: Ingreso = await this._ingresoRepository.save(ingreso);

    return savedIngreso;
  }

  async update(id: number, ingreso: Ingreso): Promise<void> {
    let ingresoDB = await this._ingresoRepository.findOne(id);

    ingresoDB.nro_guia = ingreso.nro_guia;
    ingresoDB.entrada = ingreso.entrada;
    ingresoDB.salida = ingreso.salida;
    ingresoDB.Conductor = ingreso.Conductor;
    ingresoDB.PlantaProceso = ingreso.PlantaProceso;
    ingresoDB.Residuo = ingreso.Residuo;
    ingresoDB.Vehiculo = ingreso.Vehiculo;

    await ingresoDB.save();
  }

  async delete(id: number): Promise<void> {
    let ingresoDB = await this._ingresoRepository.findOne(id);

    ingresoDB.status = status.INACTIVE;

    await ingresoDB.save();
  }
}
