import {
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';

import { Vehiculo } from '../vehiculo.entity';
import { VehiculoAuditoria } from './auditoria.entity';

@EventSubscriber()
export class VehiculoSubscriber implements EntitySubscriberInterface<Vehiculo> {
  constructor() {}

  listenTo() {
    return Vehiculo;
  }

  async beforeUpdate(event: UpdateEvent<Vehiculo>) {
    let vehiculo_antes = await event.manager.findOne(Vehiculo, event.entity.id);

    let vehiculo_auditoria = new VehiculoAuditoria();
    vehiculo_auditoria.id_Vehiculo = vehiculo_antes.id;
    vehiculo_auditoria.id_Transportista = vehiculo_antes.Transportista.id;
    vehiculo_auditoria.patente = vehiculo_antes.patente;
    vehiculo_auditoria.status_Vehiculo = vehiculo_antes.status;

    await event.manager.save(VehiculoAuditoria, vehiculo_auditoria);
  }
}
