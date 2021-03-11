import {
  EntitySubscriberInterface,
  EventSubscriber,
  FindManyOptions,
  getConnection,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Vehiculo } from '../vehiculo.entity';
import { VehiculoAuditoria } from './vehiculo-auditoria.entity';
import { TransportistaAuditoria } from '../../transportista/transportista-auditoria/transportista-auditoria.entity';

@EventSubscriber()
export class VehiculoSubscriber implements EntitySubscriberInterface<Vehiculo> {
  listenTo() {
    return Vehiculo;
  }

  async afterInsert(event: InsertEvent<Vehiculo>) {
    this.saveStatus(event);
  }

  async afterUpdate(event: UpdateEvent<Vehiculo>) {
    this.saveStatus(event);
  }

  private async saveStatus(
    event: InsertEvent<Vehiculo> | UpdateEvent<Vehiculo>,
  ) {
    const auditoriaVehiculoRepository = getConnection().getRepository(
      VehiculoAuditoria,
    );

    const vehiculo: Vehiculo = event.entity;

    const options: FindManyOptions = {
      where: { id_Transportista: vehiculo.Transportista.id },
      order: {
        id: 'DESC',
      },
      take: 1,
    };

    const transportista_auditoria: TransportistaAuditoria = await event.manager.findOne(
      TransportistaAuditoria,
      options,
    );

    let vehiculo_auditoria = new VehiculoAuditoria();
    vehiculo_auditoria.id_Vehiculo = vehiculo.id;
    vehiculo_auditoria.patente = vehiculo.patente;
    vehiculo_auditoria.id_Auditoria_Transportista = transportista_auditoria.id; //reemplazar por la auditoria
    vehiculo_auditoria.status_Vehiculo = vehiculo.status;

    await auditoriaVehiculoRepository.save(vehiculo_auditoria);
  }
}
