import {
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { Residuo } from '../residuo.entity';
import { ResiduoAuditoria } from './residuo-auditoria.entity';

@EventSubscriber()
export class ResiduoSubscriber implements EntitySubscriberInterface<Residuo> {
  listenTo() {
    return Residuo;
  }

  async beforeUpdate(event: UpdateEvent<Residuo>) {
    const residuo_antes = await event.manager.findOne(Residuo, event.entity.id);

    let residuo_auditoria = new ResiduoAuditoria();
    residuo_auditoria.id_Residuo = residuo_antes.id;
    residuo_auditoria.id_Tipo_Residuo = residuo_antes.TipoResiduo.id;
    residuo_auditoria.cantidad = residuo_antes.cantidad;
    residuo_auditoria.celda = residuo_antes.celda;
    residuo_auditoria.conductividad_electrica =
      residuo_antes.conductividad_electrica;
    residuo_auditoria.humedad = residuo_antes.humedad;
    residuo_auditoria.pH = residuo_antes.pH;
    residuo_auditoria.salinidad = residuo_antes.salinidad;
    residuo_auditoria.temperatura = residuo_antes.temperatura;
    residuo_auditoria.tds = residuo_antes.tds;
    residuo_auditoria.status_Residuo = residuo_antes.status;

    await event.manager.save(ResiduoAuditoria, residuo_auditoria);
  }
}
