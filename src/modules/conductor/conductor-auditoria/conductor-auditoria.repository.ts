import { EntityRepository, Repository } from 'typeorm';
import { ConductorAuditoria } from './conductor-auditoria.entity';

@EntityRepository(ConductorAuditoria)
export class ConductorAuditoriaRepository extends Repository<ConductorAuditoria> {}
