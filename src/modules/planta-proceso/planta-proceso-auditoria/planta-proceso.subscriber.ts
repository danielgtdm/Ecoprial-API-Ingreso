import { GeneradorAuditoria } from '../../generador/generador-auditoria/generador-auditoria.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  FindManyOptions,
  getConnection,
  InsertEvent,
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

  afterInsert(event: InsertEvent<PlantaProceso>) {
    this.saveStatus(event);
  }

  afterUpdate(event: UpdateEvent<PlantaProceso>) {
    this.saveStatus(event);
  }

  private async saveStatus(
    event: InsertEvent<PlantaProceso> | UpdateEvent<PlantaProceso>,
  ) {
    const auditoriaPlantaProceso = getConnection().getRepository(
      PlantaProcesoAuditoria,
    );

    const plantaProceso: PlantaProceso = event.entity;

    const options: FindManyOptions = {
      where: { id_Generador: plantaProceso.Generador.id },
      order: {
        id: 'DESC',
      },
      take: 1,
    };

    const generador_auditoria: GeneradorAuditoria = await event.manager.findOne(
      GeneradorAuditoria,
      options,
    );

    let plantaProceso_auditoria = new PlantaProcesoAuditoria();
    plantaProceso_auditoria.id_Planta_Proceso = plantaProceso.id;
    plantaProceso_auditoria.id_Auditoria_Generador = generador_auditoria.id;
    plantaProceso_auditoria.nombre = plantaProceso.nombre;
    plantaProceso_auditoria.status_Planta_Proceso = plantaProceso.status;

    await auditoriaPlantaProceso.save(plantaProceso_auditoria);
  }
}
