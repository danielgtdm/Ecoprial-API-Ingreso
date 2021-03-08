import {
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { Conductor } from '../conductor.entity';
import { ConductorAuditoria } from './conductor-auditoria.entity';

@EventSubscriber()
export class ConductorSubscriber
  implements EntitySubscriberInterface<Conductor> {
  listenTo() {
    return Conductor;
  }

  async beforeUpdate(event: UpdateEvent<Conductor>) {
    const conductor_antes = await event.manager.findOne(
      Conductor,
      event.entity.id,
    );

    let conductor_auditoria = new ConductorAuditoria();
    conductor_auditoria.id_Conductor = conductor_antes.id;
    conductor_auditoria.nombre = conductor_antes.nombre;
    conductor_auditoria.apellido = conductor_antes.apellido;
    conductor_auditoria.id_Transportista = conductor_antes.Transportista.id;
    conductor_auditoria.status_Conductor = conductor_antes.status;

    await event.manager.save(ConductorAuditoria, conductor_auditoria);
  }
}
