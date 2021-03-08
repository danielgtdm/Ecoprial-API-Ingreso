import { EntityRepository, Repository } from 'typeorm';
import { ResiduoAuditoria } from './residuo-auditoria.entity';

@EntityRepository(ResiduoAuditoria)
export class ResiduoAuditoriaRepository extends Repository<ResiduoAuditoria> {}
