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
import { SaveOptions } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { TipoResiduoService } from '../tipo-residuo/tipo-residuo.service';

@Injectable()
export class IngresoService {
  constructor(
    @InjectRepository(IngresoRepository)
    private readonly _ingresoRepository: IngresoRepository,
    private readonly _plantaProcesoService: PlantaProcesoService,
    private readonly _vehiculoService: VehiculoService,
    private readonly _conductorService: ConductorService,
    private readonly _residuoService: ResiduoService,
    private readonly _tipoResiduoService: TipoResiduoService,
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
    usuario: Usuario,
  ): Promise<Ingreso> {
    if (!ingreso.Residuo) {
      throw new BadRequestException();
    }

    const residuo: Residuo = ingreso.Residuo;
    const tipoResiduo: TipoResiduo = ingreso.Residuo.TipoResiduo;
    const savedResiduo: Residuo = await this._residuoService.create(
      tipoResiduo.id,
      residuo,
      usuario,
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

    // GENERAR NRO DE REPORT AUTOINCREMENTABLE

    // const latestIngreso = await this._ingresoRepository.findOne({
    //   order: { id: 'DESC' },
    // });
    // ingreso.nro_report = latestIngreso.nro_report + 1;

    const saveOptions: SaveOptions = {
      data: usuario,
    };

    const savedIngreso: Ingreso = await this._ingresoRepository.save(
      ingreso,
      saveOptions,
    );

    return savedIngreso;
  }

  async update(id: number, ingreso: Ingreso, usuario: Usuario): Promise<void> {
    let ingresoDB = await this._ingresoRepository.findOne(id);

    ingresoDB.nro_guia = ingreso.nro_guia;
    ingresoDB.entrada = ingreso.entrada;
    ingresoDB.salida = ingreso.salida;
    ingresoDB.Conductor = ingreso.Conductor;
    ingresoDB.PlantaProceso = ingreso.PlantaProceso;

    const residuoDB: Residuo = await this._residuoService.get(
      ingreso.Residuo.id,
    );
    const tipoResiduoDB: TipoResiduo = await this._tipoResiduoService.get(
      ingreso.Residuo.TipoResiduo.id,
    );
    residuoDB.cantidad = ingreso.Residuo.cantidad;
    residuoDB.celda = ingreso.Residuo.celda;
    residuoDB.conductividad_electrica = ingreso.Residuo.conductividad_electrica;
    residuoDB.humedad = ingreso.Residuo.humedad;
    residuoDB.pH = ingreso.Residuo.pH;
    residuoDB.salinidad = ingreso.Residuo.salinidad;
    residuoDB.tds = ingreso.Residuo.tds;
    residuoDB.temperatura = ingreso.Residuo.temperatura;
    residuoDB.TipoResiduo = tipoResiduoDB;

    await residuoDB.save();

    ingresoDB.Vehiculo = ingreso.Vehiculo;

    const saveOptions: SaveOptions = {
      data: usuario,
    };

    await ingresoDB.save(saveOptions);
  }

  async delete(id: number, usuario: Usuario): Promise<void> {
    let ingresoDB = await this._ingresoRepository.findOne(id);

    ingresoDB.status = status.INACTIVE;

    const saveOptions: SaveOptions = {
      data: usuario,
    };

    await this._residuoService.delete(ingresoDB.Residuo.id, usuario);
    await ingresoDB.save(saveOptions);
  }
}
