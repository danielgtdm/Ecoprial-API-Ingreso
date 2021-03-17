import {
  EntitySubscriberInterface,
  EventSubscriber,
  getConnection,
  InsertEvent,
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

  afterInsert(event: InsertEvent<Transportista>) {
    this.saveStatus(event);
  }

  afterUpdate(event: UpdateEvent<Transportista>) {
    this.saveStatus(event);
  }

  private async saveStatus(
    event: InsertEvent<Transportista> | UpdateEvent<Transportista>,
  ) {
    const auditoriaTransportistaRepository = getConnection().getRepository(
      TransportistaAuditoria,
    );
    const transportista: Transportista = event.entity;

    let transportista_auditoria = new TransportistaAuditoria();
    transportista_auditoria.id_Transportista = transportista.id;
    transportista_auditoria.nombre = transportista.nombre;
    transportista_auditoria.rut = transportista.rut;
    transportista_auditoria.descripcion = transportista.descripcion;
    transportista_auditoria.status_Transportista = transportista.status;
    transportista_auditoria.id_Usuario = event.queryRunner.data.id;

    await auditoriaTransportistaRepository.save(transportista_auditoria);
  }
}
