import {
  EntitySubscriberInterface,
  EventSubscriber,
  getConnection,
  InsertEvent,
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

  afterInsert(event: InsertEvent<Generador>) {
    this.saveStatus(event);
  }

  afterUpdate(event: UpdateEvent<Generador>) {
    this.saveStatus(event);
  }

  private async saveStatus(
    event: InsertEvent<Generador> | UpdateEvent<Generador>,
  ) {
    const auditoriaGeneradorRepository = getConnection().getRepository(
      GeneradorAuditoria,
    );
    const generador: Generador = event.entity;

    let generador_auditoria = new GeneradorAuditoria();
    generador_auditoria.id_Generador = generador.id;
    generador_auditoria.nombre = generador.nombre;
    generador_auditoria.rut = generador.rut;
    generador_auditoria.status_Generador = generador.status;
    generador_auditoria.id_Usuario = event.queryRunner.data.id;

    await auditoriaGeneradorRepository.save(generador_auditoria);
  }
}
