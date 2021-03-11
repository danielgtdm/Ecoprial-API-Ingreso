import { TipoResiduoAuditoria } from '../../tipo-residuo/tipo-residuo-auditoria/tipo-residuo-auditoria.entity';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  FindManyOptions,
  getConnection,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Residuo } from '../residuo.entity';
import { ResiduoAuditoria } from './residuo-auditoria.entity';

@EventSubscriber()
export class ResiduoSubscriber implements EntitySubscriberInterface<Residuo> {
  listenTo() {
    return Residuo;
  }

  afterInsert(event: InsertEvent<Residuo>) {
    this.saveStatus(event);
  }

  afterUpdate(event: UpdateEvent<Residuo>) {
    this.saveStatus(event);
  }

  private async saveStatus(event: InsertEvent<Residuo> | UpdateEvent<Residuo>) {
    const auditoriaResiduoRepository = getConnection().getRepository(
      ResiduoAuditoria,
    );

    const residuo: Residuo = event.entity;

    const options: FindManyOptions = {
      where: { id_Tipo_Residuo: residuo.TipoResiduo.id },
      order: {
        id: 'DESC',
      },
      take: 1,
    };

    const tipoResiduo_auditoria: TipoResiduoAuditoria = await event.manager.findOne(
      TipoResiduoAuditoria,
      options,
    );

    let residuo_auditoria = new ResiduoAuditoria();
    residuo_auditoria.id_Residuo = residuo.id;
    residuo_auditoria.id_Auditoria_Tipo_Residuo = tipoResiduo_auditoria.id;
    residuo_auditoria.cantidad = residuo.cantidad;
    residuo_auditoria.celda = residuo.celda;
    residuo_auditoria.conductividad_electrica = residuo.conductividad_electrica;
    residuo_auditoria.humedad = residuo.humedad;
    residuo_auditoria.pH = residuo.pH;
    residuo_auditoria.salinidad = residuo.salinidad;
    residuo_auditoria.temperatura = residuo.temperatura;
    residuo_auditoria.tds = residuo.tds;
    residuo_auditoria.status_Residuo = residuo.status;

    await auditoriaResiduoRepository.save(residuo_auditoria);
  }
}
