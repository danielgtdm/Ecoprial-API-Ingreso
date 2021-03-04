import {
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { PlantaProceso } from '../planta-proceso.entity';
import { PlantaProcesoAuditoria } from './planta-proceso-auditoria.entity';

@EventSubscriber()
export class PlantaProcesoSubscriber
  implements EntitySubscriberInterface<PlantaProceso> {
  listenTo() {
    return PlantaProceso;
  }

  async beforeUpdate(event: UpdateEvent<PlantaProceso>) {
    const plantaProceso_antes = await event.manager.findOne(
      PlantaProceso,
      event.entity.id,
    );

    let plantaProceso_auditoria = new PlantaProcesoAuditoria();
    plantaProceso_auditoria.id_Planta_Proceso = plantaProceso_antes.id;
    plantaProceso_auditoria.id_Generador = plantaProceso_antes.Generador.id;
    plantaProceso_auditoria.nombre = plantaProceso_antes.nombre;
    plantaProceso_auditoria.status_Planta_Proceso = plantaProceso_antes.status;

    await event.manager.save(PlantaProcesoAuditoria, plantaProceso_auditoria);
  }
}
