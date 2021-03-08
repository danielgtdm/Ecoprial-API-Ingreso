import {
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { Generador } from '../generador.entity';
import { GeneradorAuditoria } from './generador-auditoria.entity';

@EventSubscriber()
export class GeneradorSubscriber
  implements EntitySubscriberInterface<Generador> {
  listenTo() {
    return Generador;
  }

  async beforeUpdate(event: UpdateEvent<Generador>) {
    const generador_antes = await event.manager.findOne(
      Generador,
      event.entity.id,
    );

    let generador_auditoria = new GeneradorAuditoria();
    generador_auditoria.id_Generador = generador_antes.id;
    generador_auditoria.nombre = generador_antes.nombre;
    generador_auditoria.rut = generador_antes.rut;
    generador_auditoria.status_Generador = generador_antes.status;

    await event.manager.save(GeneradorAuditoria, generador_auditoria);
  }
}
