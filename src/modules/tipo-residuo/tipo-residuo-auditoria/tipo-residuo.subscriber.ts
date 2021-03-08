import {
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { TipoResiduo } from '../tipo-residuo.entity';
import { TipoResiduoAuditoria } from './tipo-residuo-auditoria.entity';

@EventSubscriber()
export class TipoResiduoSubscriber
  implements EntitySubscriberInterface<TipoResiduo> {
  listenTo() {
    return TipoResiduo;
  }

  async beforeUpdate(event: UpdateEvent<TipoResiduo>) {
    const tipoResiduo_antes = await event.manager.findOne(
      TipoResiduo,
      event.entity.id,
    );

    let tipoResiduo_aditoria = new TipoResiduoAuditoria();
    tipoResiduo_aditoria.id_Tipo_Residuo = tipoResiduo_antes.id;
    tipoResiduo_aditoria.nombre = tipoResiduo_antes.nombre;
    tipoResiduo_aditoria.descripcion = tipoResiduo_antes.descripcion;
    tipoResiduo_aditoria.status_Residuo = tipoResiduo_antes.status;

    await event.manager.save(TipoResiduoAuditoria, tipoResiduo_aditoria);
  }
}
