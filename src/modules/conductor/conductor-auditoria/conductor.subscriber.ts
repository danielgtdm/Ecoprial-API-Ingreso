import {
  EntitySubscriberInterface,
  EventSubscriber,
  FindManyOptions,
  FindOneOptions,
  getConnection,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Conductor } from '../conductor.entity';
import { ConductorAuditoria } from './conductor-auditoria.entity';
import { TransportistaAuditoria } from '../../transportista/transportista-auditoria/transportista-auditoria.entity';

@EventSubscriber()
export class ConductorSubscriber
  implements EntitySubscriberInterface<Conductor> {
  listenTo() {
    return Conductor;
  }

  afterInsert(event: InsertEvent<Conductor>) {
    this.saveStatus(event);
  }

  afterUpdate(event: UpdateEvent<Conductor>) {
    this.saveStatus(event);
  }

  private async saveStatus(
    event: InsertEvent<Conductor> | UpdateEvent<Conductor>,
  ) {
    const auditoriaConductorRepository = getConnection().getRepository(
      ConductorAuditoria,
    );

    const conductor: Conductor = event.entity;

    const options: FindManyOptions = {
      where: { id_Transportista: conductor.Transportista.id },
      order: {
        id: 'DESC',
      },
      take: 1,
    };

    const transportista_auditoria: TransportistaAuditoria = await event.manager.findOne(
      TransportistaAuditoria,
      options,
    );

    let conductor_auditoria = new ConductorAuditoria();
    conductor_auditoria.id_Conductor = conductor.id;
    conductor_auditoria.nombre = conductor.nombre;
    conductor_auditoria.apellido = conductor.apellido;
    conductor_auditoria.id_Auditoria_Transportista = transportista_auditoria.id;
    conductor_auditoria.status_Conductor = conductor.status;

    await auditoriaConductorRepository.save(conductor_auditoria);
  }
}
