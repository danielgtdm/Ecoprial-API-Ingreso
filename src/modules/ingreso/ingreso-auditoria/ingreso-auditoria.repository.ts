import { EntityRepository, Repository } from 'typeorm';
import { IngresoAuditoria } from './ingreso-auditoria.entity';

@EntityRepository(IngresoAuditoria)
export class IngresoAuditoriaRepository extends Repository<IngresoAuditoria> {}
