import { ConductorAuditoria } from '../../conductor/conductor-auditoria/conductor-auditoria.entity';
import { PlantaProcesoAuditoria } from '../../planta-proceso/planta-proceso-auditoria/planta-proceso-auditoria.entity';
import { ResiduoAuditoria } from '../../residuo/residuo-auditoria/residuo-auditoria.entity';
import { VehiculoAuditoria } from '../../vehiculo/vehiculo-auditoria/vehiculo-auditoria.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  FindOneOptions,
  getConnection,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Ingreso } from '../ingreso.entity';
import { IngresoAuditoria } from './ingreso-auditoria.entity';

@EventSubscriber()
export class IngresoSubscriber implements EntitySubscriberInterface<Ingreso> {
  listenTo() {
    return Ingreso;
  }

  afterInsert(event: InsertEvent<Ingreso>) {
    this.saveStatus(event);
  }

  afterUpdate(event: UpdateEvent<Ingreso>) {
    this.saveStatus(event);
  }

  private async saveStatus(event: InsertEvent<Ingreso> | UpdateEvent<Ingreso>) {
    const auditoriaIngresoRepository = getConnection().getRepository(
      IngresoAuditoria,
    );
    const auditoriaConductorRepository = getConnection().getRepository(
      ConductorAuditoria,
    );
    const auditoriaPlantaProcesoRepository = getConnection().getRepository(
      PlantaProcesoAuditoria,
    );
    const auditoriaResiduoRepository = getConnection().getRepository(
      ResiduoAuditoria,
    );
    const auditoriaVehiculoRepository = getConnection().getRepository(
      VehiculoAuditoria,
    );

    const ingreso: Ingreso = event.entity;

    const optionsConductor: FindOneOptions = {
      where: { id_Conductor: ingreso.Conductor.id },
      order: {
        id: 'DESC',
      },
    };

    const conductor_auditoria: ConductorAuditoria = await auditoriaConductorRepository.findOne(
      optionsConductor,
    );

    const optionsPlantaProceso: FindOneOptions = {
      where: { id_Planta_Proceso: ingreso.PlantaProceso.id },
      order: {
        id: 'DESC',
      },
    };

    const plantaProceso_auditoria: PlantaProcesoAuditoria = await auditoriaPlantaProcesoRepository.findOne(
      optionsPlantaProceso,
    );

    const optionsResiduo: FindOneOptions = {
      where: { id_Residuo: ingreso.Residuo.id },
      order: {
        id: 'DESC',
      },
    };

    const residuo_auditoria: ResiduoAuditoria = await auditoriaResiduoRepository.findOne(
      optionsResiduo,
    );

    const optionsVehiculo: FindOneOptions = {
      where: { id_Vehiculo: ingreso.Vehiculo.id },
      order: {
        id: 'DESC',
      },
    };

    const vehiculo_auditoria: VehiculoAuditoria = await auditoriaVehiculoRepository.findOne(
      optionsVehiculo,
    );

    let ingreso_auditoria = new IngresoAuditoria();
    ingreso_auditoria.id_Ingreso = ingreso.id;
    ingreso_auditoria.id_Auditoria_Conductor = conductor_auditoria.id;
    ingreso_auditoria.id_Auditoria_Planta_Proceso = plantaProceso_auditoria.id;
    ingreso_auditoria.id_Auditoria_Residuo = residuo_auditoria.id;
    ingreso_auditoria.id_Auditoria_Vehiculo = vehiculo_auditoria.id;
    ingreso_auditoria.nro_guia = ingreso.nro_guia;
    ingreso_auditoria.nro_report = ingreso.nro_report;
    ingreso_auditoria.entrada = ingreso.entrada;
    ingreso_auditoria.salida = ingreso.salida;
    ingreso_auditoria.status_Ingreso = ingreso.status;
    ingreso_auditoria.id_Usuario = event.queryRunner.data.id;

    await auditoriaIngresoRepository.save(ingreso_auditoria);
  }
}
