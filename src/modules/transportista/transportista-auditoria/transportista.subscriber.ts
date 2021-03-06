import {
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { Transportista } from '../transportista.entity';
import { TransportistaAuditoria } from './transportista-auditoria.entity';

@EventSubscriber()
export class TransportistaSubscriber
  implements EntitySubscriberInterface<Transportista> {
  listenTo() {
    return Transportista;
  }

  async beforeUpdate(event: UpdateEvent<Transportista>) {
    const transportista_antes = await event.manager.findOne(
      Transportista,
      event.entity.id,
    );

    let transportista_auditoria = new TransportistaAuditoria();
    transportista_auditoria.id_Transportista = transportista_antes.id;
    transportista_auditoria.nombre = transportista_antes.nombre;
    transportista_auditoria.descripcion = transportista_antes.descripcion;
    transportista_auditoria.rut = transportista_antes.rut;
    transportista_auditoria.status_Transportista = transportista_antes.status;

    await event.manager.save(TransportistaAuditoria, transportista_auditoria);
  }
}
