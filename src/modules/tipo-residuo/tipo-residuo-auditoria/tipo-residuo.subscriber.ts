import {
  EntitySubscriberInterface,
  EventSubscriber,
  getConnection,
  InsertEvent,
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

  afterInsert(event: InsertEvent<TipoResiduo>) {
    this.saveStatus(event);
  }

  afterUpdate(event: UpdateEvent<TipoResiduo>) {
    this.saveStatus(event);
  }

  private async saveStatus(
    event: InsertEvent<TipoResiduo> | UpdateEvent<TipoResiduo>,
  ) {
    const auditoriaTipoResiduoRepository = getConnection().getRepository(
      TipoResiduoAuditoria,
    );
    const tipoResiduo: TipoResiduo = event.entity;

    let tipoResiduo_aditoria = new TipoResiduoAuditoria();
    tipoResiduo_aditoria.id_Tipo_Residuo = tipoResiduo.id;
    tipoResiduo_aditoria.nombre = tipoResiduo.nombre;
    tipoResiduo_aditoria.descripcion = tipoResiduo.descripcion;
    tipoResiduo_aditoria.status_Residuo = tipoResiduo.status;
    tipoResiduo_aditoria.id_Usuario = event.queryRunner.data.id;

    await auditoriaTipoResiduoRepository.save(tipoResiduo_aditoria);
  }
}
