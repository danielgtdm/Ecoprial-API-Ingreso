import {
  EntitySubscriberInterface,
  EventSubscriber,
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

  async beforeUpdate(event: UpdateEvent<Ingreso>) {
    const ingreso_antes = await event.manager.findOne(Ingreso, event.entity.id);

    let ingreso_auditoria = new IngresoAuditoria();
    ingreso_auditoria.id_Ingreso = ingreso_antes.id;
    ingreso_auditoria.id_Conductor = ingreso_antes.Conductor.id;
    ingreso_auditoria.id_Planta_Proceso = ingreso_antes.PlantaProceso.id;
    ingreso_auditoria.id_Residuo = ingreso_antes.Residuo.id;
    ingreso_auditoria.id_Vehiculo = ingreso_antes.Vehiculo.id;
    ingreso_auditoria.nro_guia = ingreso_antes.nro_guia;
    ingreso_auditoria.nro_report = ingreso_antes.nro_report;
    ingreso_auditoria.entrada = ingreso_antes.entrada;
    ingreso_auditoria.salida = ingreso_antes.salida;
    ingreso_auditoria.status_Ingreso = ingreso_antes.status;

    await event.manager.save(IngresoAuditoria, ingreso_auditoria);
  }

  async afterInsert(event: InsertEvent<Ingreso>) {}
}
