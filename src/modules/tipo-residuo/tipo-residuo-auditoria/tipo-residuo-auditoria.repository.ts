import { EntityRepository, Repository } from 'typeorm';
import { TipoResiduoAuditoria } from './tipo-residuo-auditoria.entity';

@EntityRepository(TipoResiduoAuditoria)
export class TipoResiduoAuditoriaRepository extends Repository<TipoResiduoAuditoria> {}
